import React, { useState, useEffect } from "react";
import Image from "next/image";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { Formik, Field, Form, ErrorMessage } from "formik";

const AuthenticationForm = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);

  const initialValuesLogin = {
    email: "",
    password: "",
  };

  const initialValuesRegister = {
    name: "",
    username: "",
    email: "",
    password: "",
  };

  const validationSchemaLogin = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  const validationSchemaRegister = Yup.object({
    name: Yup.string().required("Required"),
    username: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleLogin = async (values) => {
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
  
      const responseData = await response.json();
      if (response.ok) {
        if (responseData.jwt) {
          localStorage.setItem("jwt", responseData.jwt);
          localStorage.setItem("user", JSON.stringify(responseData.user));
        }
        router.push("/profile");
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials and try again.");
      router.push("/");
    }
  };
  
  const handleRegister = async (values) => {
    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
  
      const responseData = await response.json();
      if (response.ok) {
        console.log("Registration successful!");
        alert("User registered successfully!");
        router.push("/");
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again later.");
      router.push("/");
    }
  };0

  useEffect(()=>{
    let jwt = localStorage.getItem("jwt")
    let user = localStorage.getItem("user");
    if(!jwt || !user){
      localStorage.removeItem("jwt")
      localStorage.removeItem("user")
    } else {
      router.push("/profile")
    }
  }, [])
  

 

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row w-full max-w-4xl shadow-md">
        {/* Left section for login */}
        <div className="w-full md:w-1/2 bg-black text-white rounded-l-lg flex flex-col justify-center items-center">
          <div className="p-12">
            <Image src="/assets/images/Slide1.PNG" alt="Logo" width={64} height={64} />
            <h2 className="text-3xl font-bold mt-2">Sign in to your account</h2>
            <p className="mt-2">Welcome back.</p>
            {isLogin ? (
              <Formik
                initialValues={initialValuesLogin}
                validationSchema={validationSchemaLogin}
                onSubmit={handleLogin}
              >
                <Form className="space-y-4 mt-4 w-full">
                  <Field
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 rounded-md text-black"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-400"
                  />
                  <Field
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 rounded-md text-black"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-400"
                  />
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                  >
                    Log In
                  </button>
                </Form>
              </Formik>
            ) : (
              <button
                onClick={() => setIsLogin(true)}
                className="mt-4 p-2 w-full bg-white text-black rounded-md hover:bg-gray-200"
              >
                Sign in
              </button>
            )}
          </div>
        </div>

        {/* Right section for sign up */}
        <div className="w-full md:w-1/2 bg-blue-500 text-white rounded-r-lg flex flex-col justify-center items-center">
          <div className="p-12">
            <Image src="/assets/images/Slide1.PNG" alt="Logo" width={64} height={64} />
            <h2 className="text-3xl font-bold mt-2">Join CodeBlog</h2>
            <p className="mt-2">Create an account.</p>
            {!isLogin ? (
              <>
                <Formik
                  initialValues={initialValuesRegister}
                  validationSchema={validationSchemaRegister}
                  onSubmit={handleRegister}
                >
                  <Form className="space-y-4 mt-4 w-full">
                    <Field
                      name="name"
                      type="text"
                      placeholder="Name"
                      className="w-full p-2 rounded-md text-black"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-400"
                    />
                    <Field
                      name="username"
                      type="text"
                      placeholder="Username"
                      className="w-full p-2 rounded-md text-black"
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="text-red-400"
                    />
                    <Field
                      name="email"
                      type="email"
                      placeholder="Email"
                      className="w-full p-2 rounded-md text-black"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-400"
                    />
                    <Field
                      name="password"
                      type="password"
                      placeholder="Password"
                      className="w-full p-2 rounded-md text-black"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-400"
                    />
                    <button
                      type="submit"
                      className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-700"
                    >
                      Sign Up
                    </button>
                  </Form>
                </Formik>
              </>
            ) : (
              <button
                onClick={() => setIsLogin(false)}
                className="mt-4 p-2 w-full bg-white text-black rounded-md hover:bg-gray-200"
              >
                Sign up
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationForm;
