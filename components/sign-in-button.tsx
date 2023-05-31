"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const SigninButton = () => {
  const { data: session } = useSession();
  
  console.log(session?.user);

  if (session && session.user) {
    return (
      <div className="flex gap-4 ml-auto align-baseline">
        <p className=" text-white hover:text-purple-700 ml-3">{session.user.name}</p>
        <button onClick={() => signOut()} className="btn-sm text-white bg-purple-600 hover:bg-purple-700 ml-3">
          Sign Out
        </button>
      </div>
    );
  }
  return (
    <button onClick={() => signIn()} className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out">
      Sign In
    </button>
  );
};

export default SigninButton;