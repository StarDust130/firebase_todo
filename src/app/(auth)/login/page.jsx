"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";
import { useAuth } from "@/firebase/auth";

import { auth } from "@/firebase/firebase";
import Loader from "@/components/Loader";

const LoginForm = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { authUser, isLoading } = useAuth();
  const [isIncorrectPassword, setIsIncorrectPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && authUser) {
      router.push("/");
    }
  }, [authUser, isLoading]);

  //! Login with Google 😊
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };
  //! Login with Github 🫦
  const signInWithGithub = async () => {
    const provider = new GithubAuthProvider();
    await signInWithPopup(auth, provider);
  };
  //! Login with Email 🫠
  const signInWithEmail = async () => {
    if (!password || !email) return;

    //! This will add email and password to firebase auth 🔥
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      setEmail("");
      setPassword("");
      setIsIncorrectPassword(false);
    } catch (err) {
      console.error("An Error 🧐", err);
      setEmail("");
      setPassword("");
      setIsIncorrectPassword(true);
    }
  };

  //! Enter Handler
  const EnterHandler = (e) => {
    if (e.key === "Enter") {
      signInWithEmail();
    }
  };

  return isLoading || (!isLoading && authUser) ? (
    <Loader />
  ) : (
    <main className="flex lg:h-[100vh]">
      <div className="w-full lg:w-[60%] p-8 md:p-14 flex items-center justify-center lg:justify-start">
        <div className="p-8 w-[600px]">
          <h1 className="text-6xl font-semibold">Login</h1>
          <p className="mt-6 ml-1">
            Don&apos;t have an account ?{" "}
            <Link href="/register">
              <span className="underline hover:text-blue-400 cursor-pointer">
                Sign Up
              </span>
            </Link>
          </p>

          {/* //!Social Login */}
          <div className="flex items-center mt-3 gap-4">
            <div
              className="bg-black/[0.2] text-white py-2 px-4 rounded-full transition-transform hover:bg-black/[0.4] active:scale-90 flex items-center gap-2 cursor-pointer group"
              onClick={signInWithGoogle}
            >
              <div className="bg-black/[0.05] w-8 h-8 rounded-full flex items-center justify-center">
                <FcGoogle size={22} />
              </div>
              <span className="font-medium text-black ">Login with Google</span>
            </div>

            <div
              className="bg-black/[0.2] text-white py-2 px-4 rounded-full transition-transform hover:bg-black/[0.4] active:scale-90 flex items-center gap-2 cursor-pointer group"
              onClick={signInWithGithub}
            >
              <div className=" w-8 h-8 rounded-full flex items-center justify-center">
                <FaGithub size={22} color="black" />
              </div>
              <span className="font-medium text-black ">Login with GitHub</span>
            </div>
          </div>

          <form onSubmit={(e) => e.preventDefault()} onKeyDown={EnterHandler}>
            <div
              className={`mt-10 pl-1 flex flex-col ${
                isIncorrectPassword ? "animate-shake" : ""
              }`}
            >
              <label>Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
              />
            </div>
            <div
              className={`mt-10 pl-1 flex flex-col ${
                isIncorrectPassword ? "animate-shake" : ""
              }`}
            >
              <label>Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
              />
            </div>
            <button
              className="bg-black text-white w-44 py-4 mt-10 rounded-full transition-transform hover:bg-black/[0.8] active:scale-90"
              onClick={signInWithEmail}
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
      <div
        className="w-[40%] bg-slate-400 bg-cover bg-right-top hidden lg:block"
        style={{
          backgroundImage: "url('/login-banner.jpg')",
        }}
      ></div>
    </main>
  );
};

export default LoginForm;
