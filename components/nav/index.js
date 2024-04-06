import React, { useState, useEffect, Suspense } from "react";
import { FaSun, FaRegMoon, FaBars, FaSignOutAlt } from "react-icons/fa";
import { useTheme } from "next-themes";
import { useRouter } from "next/router"; // Import useRouter hook to handle routing

const Image = React.lazy(() => import("next/image")); // Lazy load Image component

const Nav = () => {
  const { theme, setTheme } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter(); // Router instance

  // Example useEffect to check login status on component mount
  useEffect(() => {
    setIsLoaded(false)
    setInterval(()=>{}, 1000)
    let userJwt = localStorage.getItem("jwt") 
    let userStored =  localStorage.getItem("user");
    console.log('!userJwt >> ', !userJwt );
    if(!userJwt ){
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
    setIsLoaded(true);
  }, [isLoggedIn]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user")
    setIsLoggedIn(false);
    let a = document.createElement("a")
    a.href= "/login"
    a.click()
  };

  const handleLogin = () => {

    let user = localStorage.getItem("user")
    let jwt = localStorage.getItem("jwt")
    if(!user || !jwt){
      setIsLoggedIn(false);
      router.push("/login");
    } else{
    setIsLoggedIn(true);
    router.push("/profile");
    }
  };

  return (
    <>
    {isLoaded ? (
      <nav className="flex justify-between bg-black text-white p-4">
        <a href="/" className="text-white font-bold text-lg mx-4">
          <Suspense fallback={<div>Loading...</div>}>
            <Image src={"/assets/images/Slide1.png"} height={30} width={30} />
          </Suspense>
        </a>
        <div className="flex items-center">
          <button
            className="py-2 pl-3 pr-4 rounded bg-black dark:bg-white dark:hover:bg-gray-600 transition duration-300 ease-in-out p-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <FaSun className="text-yellow-500 text-xl" />
            ) : (
              <FaRegMoon className="text-xl text-gray-500 dark:text-white" />
            )}
          </button>
          <button
            onClick={toggleMenu}
            className="block md:hidden text-white focus:outline-none"
          >
            <FaBars className="text-xl" />
          </button>
          <div
            className={`md:flex ${isMenuOpen ? "" : "hidden"} md:items-center`}
          >
            {/* Render menu items based on login status */}
            {isLoggedIn ? (
              <>
                <a
                  href="/explore"
                  className="text-white font-bold text-lg mx-4"
                >
                  explore
                </a>
                <a
                  href="/profile"
                  className="text-white font-bold text-lg mx-4"
                >
                  profile
                </a>
                <button
                  onClick={handleLogout}
                  className="text-white focus:outline-none"
                >
                  <FaSignOutAlt className="text-xl" />
                </button>
              </>
            ) : (
              <button
                onClick={handleLogin}
                className="text-white font-bold text-lg mx-4"
              >
                login
              </button>
            )}
          </div>
        </div>
      </nav>
      ):(<></>)}
    </>
  );
}

export default Nav;
