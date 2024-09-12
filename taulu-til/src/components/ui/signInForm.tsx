"use client";

import { signin } from "@/actions/signIn";
import Link from "next/link";
import { useFormState } from "react-dom";

export function SignInForm() {
  const initialState = {
    message:''
  }
  const [formState, formAction] = useFormState(signin, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
        <input
          type="text"
          className="grow"
          placeholder="Username"
          id="username"
          name="username"
        />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="password"
          className="grow"
          placeholder="Password"
          id="password"
          name="password"
        />
      </label>
      {formState?.message && (
        <p className="text-red-600 text-center">{formState.message}</p>
      )}
      <button className="btn btn-primary bg-green-600 hover:bg-green-700 text-white border-0 ">Log In</button>
      <p>Don't have an account? <Link href={'/signup'} className="text-green-600 font-medium underline">Sign up here</Link></p>
    </form>
  );
}
