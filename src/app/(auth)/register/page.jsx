/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";
import Loader from "@/components/Loader";
import { auth } from "../../../firebase/firebase";
import Link from "next/link";
import { useAuth } from "@/firebase/auth";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const { authUser, isLoading, setAuthUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && authUser) {
      router.push("/");
    }
  }, [authUser, isLoading]);

  //! Sign Up Handler 🫣
  const SignUpHandler = async () => {
    //+ Check if username, password and email is not null.
    if (!username || !password || !email) return;

    //! This will add email and password to firebase auth 🔥
    try {
      const {user} = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);

      //! This will add username to firebase auth 🔥
      await updateProfile(auth.currentUser, {
        displayName: username,
      });

      setAuthUser({
        uid: user.uid,
        email: user.email,
        username,
      });

      setUsername("");
      setPassword("");
      setEmail("");

      console.log(user);
    } catch (err) {
      console.error("An Error 🧐", err);
    }
  };

  //! Sign In with Google Handler 🫣
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const user = await signInWithPopup(auth, provider);
      console.log(user);
    } catch (err) {
      console.error("An Error 🧐", err);
    }
  };

  //! Sign In with GitHub Handler 🫣
  const signInWithGitHub = async () => {
    try {
      const provider = new GithubAuthProvider();
      const user = await signInWithPopup(auth, provider);
      console.log(user);
    } catch (err) {
      console.error("An Error 🧐", err);
    }
  };

  return isLoading || (!isLoading && authUser) ? (
    <Loader />
  ) : (
    <main className="flex lg:h-[100vh]">
      <div className="w-full lg:w-[60%] p-8 md:p-14 flex items-center justify-center lg:justify-start">
        <div className="p-8 w-[600px]">
          <h1 className="text-6xl font-semibold">Sign Up</h1>
          <p className="mt-6 ml-1">
            Already have an account ?{" "}
            <Link href="/login">
              <span className="underline hover:text-blue-400 cursor-pointer">
                Login
              </span>
            </Link>
          </p>

          {/* //! Button To Social Login */}
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
              onClick={signInWithGitHub}
            >
              <div className=" w-8 h-8 rounded-full flex items-center justify-center">
                <FaGithub size={22} color="black" />
              </div>
              <span className="font-medium text-black ">Login with GitHub</span>
            </div>
          </div>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mt-10 pl-1 flex flex-col">
              <label>Name</label>
              <input
                type="text"
                className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mt-10 pl-1 flex flex-col">
              <label>Email</label>
              <input
                type="email"
                className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-10 pl-1 flex flex-col">
              <label>Password</label>
              <input
                type="password"
                className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className="bg-black text-white w-44 py-4 mt-10 rounded-full transition-transform hover:bg-black/[0.8] active:scale-90"
              onClick={SignUpHandler}
            >
              Sign Up
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

export default RegisterForm;
