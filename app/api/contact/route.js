export async function POST(req) {
  try {
    const body = await req.json()
    // Debug: log whether the API key is present (won't print the key itself)
    console.log('Contact route called. WEB3FORMS_API_KEY present:', Boolean(process.env.WEB3FORMS_API_KEY))

    // Development-only bypass: return fake success when running locally
    // Web3Forms blocks localhost requests with bot challenges; this lets you test the form UI
    // On Vercel (production), this bypass is skipped and the real API is called
    if (process.env.NODE_ENV === 'development') {
      console.log('Development mode: returning mock success (Web3Forms blocks localhost)')
      console.log('Form data received:', { name: body.name, email: body.email, message: body.message?.slice(0, 50) })
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Development mode: Form submission received (not sent to Web3Forms)' 
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_API_KEY,
        ...body,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })

    // Safely handle upstream responses that may not be JSON (e.g. HTML error pages)
    const contentType = response.headers.get('content-type') || ''
    let data = null

    if (contentType.includes('application/json')) {
      try {
        data = await response.json()
      } catch (parseErr) {
        console.error('Failed to parse JSON from Web3Forms:', parseErr)
        const text = await response.text()
        console.error('Web3Forms non-JSON body (first 2000 chars):', text.slice(0, 2000))
        return new Response(JSON.stringify({ success: false, message: 'Upstream returned invalid JSON', details: text.slice(0, 2000) }), {
          status: 502,
          headers: { 'Content-Type': 'application/json' },
        })
      }
    } else {
      // Non-JSON response (likely an HTML error page). Capture text for debugging.
      const text = await response.text()
      console.error('Web3Forms returned non-JSON response. Content-Type:', contentType)
      console.error('Web3Forms body (first 2000 chars):', text.slice(0, 2000))

      // If this looks like a Cloudflare/bot challenge or 403, try a retry using
      // form-encoded body and typical browser headers (sometimes upstream blocks
      // JSON requests from local environments).
      const lower = text.toLowerCase()
      if (response.status === 403 || lower.includes('just a moment') || lower.includes('enable javascript and cookies')) {
        try {
          console.log('Attempting retry with form-encoded body and browser-like headers')
          const params = new URLSearchParams()
          params.append('access_key', process.env.WEB3FORMS_API_KEY || '')
          // Only append simple fields to avoid nested structures
          if (body.name) params.append('name', body.name)
          if (body.email) params.append('email', body.email)
          if (body.message) params.append('message', body.message)

          const retryRes = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: params.toString(),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json, text/plain, */*',
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            },
          })

          const retryContentType = retryRes.headers.get('content-type') || ''
          let retryData = null
          if (retryContentType.includes('application/json')) {
            retryData = await retryRes.json()
          } else {
            const retryText = await retryRes.text()
            console.error('Retry returned non-JSON (first 2000 chars):', retryText.slice(0, 2000))
            return new Response(JSON.stringify({ success: false, message: 'Upstream returned non-JSON on retry', details: retryText.slice(0, 2000) }), {
              status: retryRes.status || 502,
              headers: { 'Content-Type': 'application/json' },
            })
          }

          if (!retryRes.ok) {
            console.error('Retry responded with error status:', retryRes.status, retryData)
            return new Response(JSON.stringify({ success: false, message: 'Upstream error on retry', details: retryData }), {
              status: retryRes.status,
              headers: { 'Content-Type': 'application/json' },
            })
          }

          return new Response(JSON.stringify(retryData), {
            status: retryRes.status,
            headers: { 'Content-Type': 'application/json' },
          })
        } catch (retryErr) {
          console.error('Retry attempt failed:', retryErr)
          return new Response(JSON.stringify({ success: false, message: 'Retry failed - see server logs' }), {
            status: 502,
            headers: { 'Content-Type': 'application/json' },
          })
        }
      }

      return new Response(JSON.stringify({ success: false, message: 'Upstream returned non-JSON response', details: text.slice(0, 2000) }), {
        status: response.status || 502,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // If upstream responded with an error status, forward the details
    if (!response.ok) {
      console.error('Web3Forms responded with an error status:', response.status, data)
      return new Response(JSON.stringify({ success: false, message: 'Upstream error', details: data }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('Contact route exception:', err)
    return new Response(
      JSON.stringify({ success: false, message: 'Server error - check server logs' }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}
