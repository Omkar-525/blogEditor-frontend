import "@/styles/globals.css";
import {ThemeProvider} from "next-themes";
import { useEffect, useState } from "react";

function MyApp({Component, pageProps}){
  useEffect(()=> {
    console.log("App.js useEffect");
  },[]);
  return(
    <ThemeProvider attribute="class">
    <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp;