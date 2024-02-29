import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return ( 
    
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Tailwind CSS + Next.js Starter</h1>
        <p className="text-gray-600">
          Welcome to your Tailwind CSS and Next.js starter template.
        </p>
      </div>
    </div>
)
}
