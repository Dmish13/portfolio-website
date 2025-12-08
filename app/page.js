'use client'
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import About from "./components/About";
import Qualities from "./components/Qualities";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Projects from "./components/Projects";
import ChatBot from "./components/ChatBot";
import { ThemeProvider } from "./context/ThemeContext";

export default function Home() {
  return (
    <ThemeProvider>
      <Navbar></Navbar>
      <Header></Header>
      <About/>
      <Qualities/>
      <Projects/>
      <Contact/>
      <Footer/>
      <ChatBot/>
    </ThemeProvider>
  );
}
