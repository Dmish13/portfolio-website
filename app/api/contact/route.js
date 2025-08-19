export async function POST(req) {
  try {
    const body = await req.json()

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

    const data = await response.json()
    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    })
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, message: "Server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}
