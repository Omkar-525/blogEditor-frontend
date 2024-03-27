import React from "react";
import { FaSun, FaRegMoon } from "react-icons/fa";
import { useTheme } from "next-themes";
import Image from "next/image";
function Nav() {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <nav className="flex justify-between bg-black text-white p-4">
        <a href="/" className="text-white font-bold text-lg mx-4">
          <Image src={"/assets/images/Slide1.png"} height={30} width={30} />
        </a>
        <div className="flex items-center">
          <a href="/explore" className="text-white font-bold text-lg mx-4">
            explore
          </a>
          <a href="/profile" className="text-white font-bold text-lg mx-4">
            profile
          </a>
          <a href="/login" className="text-white font-bold text-lg mx-4">
            login
          </a>
          <button
            className="block py-2 pl-3 pr-4 rounded bg-black dark:bg-white dark:hover:bg-gray-600 transition duration-300 ease-in-out md:p-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <FaSun className="text-yellow-500 text-xl" />
            ) : (
              <FaRegMoon className="text-xl text-gray-500 dark:text-white" />
            )}
          </button>
        </div>
      </nav>
    </>
  );
}

export default Nav;
