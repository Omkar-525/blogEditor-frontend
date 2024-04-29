import Nav from "@/components/nav";
import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";
import FeedbackButton from "@/components/feedback";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    console.log("App.js useEffect");
  }, []);
  return (
    <ThemeProvider attribute="class">
      <Nav />
      <Component {...pageProps} />
      <FeedbackButton googleFormLink="https://forms.gle/anYg4UvAeT2q2sAw7" />
    </ThemeProvider>
  );
}

export default MyApp;
