"use client";
import React from "react";
import Google from "@/components/Logos/Google";
import { ProjectsContext } from "@/libs/Firebase";
import { useForm, SubmitHandler } from "react-hook-form";
import { useUpdateProfile } from "react-firebase-hooks/auth";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { AiOutlineLoading } from "react-icons/ai";
import Link from "next/link";
type Inputs = {
  name: string;
  email: string;
  password: string;
};
const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();
  const { auth } = React.useContext(ProjectsContext);
  const [updateProfile, updating] = useUpdateProfile(auth);
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(loading);
    await createUserWithEmailAndPassword(data.email, data.password);
    console.log(loading);

    updateProfile({ displayName: data.name })
      .then((res) => {
        // Profile updated!
        console.log("Profile updated!");
        console.log(res);
        // ...
      })
      .catch((error) => {
        // An error occurred
        // ...
        console.log(error);
      });
    reset({
      name: "",
      email: "",
      password: "",
    });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" flex gap-3 flex-col mx-auto text-center px-6 md:w-2/3"
    >
      <section className="space-y-3 mt-24 mb-3">
        <h2 className="text-3xl font-bold">Sign Up</h2>
        <h2 className="text-lg">Or sign up with</h2>
        <button className="flex gap-2 items-center justify-center mx-auto bg-white px-2 py-1 rounded-md w-32 text-gray-800 font-bold capitalize">
          <Google /> google
        </button>
      </section>
      <section className="space-y-4 w-full">
        <div className="flex flex-col gap-3">
          <label htmlFor="name" className="font-semibold">
            Full Name
          </label>
          <input
            {...register("name", { required: true })}
            type="text"
            id="name"
            className="caret-purple-900 text-gray-800 font-semibold px-2 py-1"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="email" className="font-semibold">
            Email
          </label>
          <input
            {...register("email", { required: true })}
            type="email"
            id="email"
            className="caret-purple-900 text-gray-800 font-semibold px-2 py-1"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="password" className="font-semibold">
            Password
          </label>
          <input
            {...register("password", { required: true })}
            type="password"
            id="password"
            className="caret-purple-900 text-gray-800 font-semibold px-2 py-1 rounded-sm"
          />
        </div>
      </section>
      <button
        type="submit"
        className="bg-purple-800 flex justify-center hover:bg-purple-900 transition duration-300 mt-3 p-2 w-full rounded-sm"
      >
        {loading === true ? (
          <span className="text-xl">
            <AiOutlineLoading className="animate-spin text-white" />
          </span>
        ) : (
          <span>Sign Up</span>
        )}
      </button>
      <p>
        Already have an account?{" "}
        <Link href="/auth/signin">
          <span className="underline text-purple-800 font-bold">Sign in</span>
        </Link>
      </p>
    </form>
  );
};

export default SignUp;
