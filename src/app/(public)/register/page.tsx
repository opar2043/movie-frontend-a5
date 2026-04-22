'use client'
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/src/lib/auth-client";

export default function RegisterPage() {
  
  // async function registerAction(formData: FormData) {
  //   "use server";
  //   const name = formData.get("name") as string;
  //   const email = formData.get("email") as string;
  //   const password = formData.get("password") as string;
    
  //   try {
  //     // Direct pass-through to custom backend logic
  //     await api.post("/users", { name, email, password });
  //   } catch (error) {
  //      console.error("Failed to register", error);
  //      // In a production app you'd return the error to the form state
  //   }
    
  //   // Redirect to login upon successful creation
  //   redirect("/login");
  // }

  const router = useRouter();

  async function registerAction(e : any){
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const users ={
      name,
      email,
      password
    }
     console.log(users)

     try {
      // const res = await api.post("/users", users);
      // console.log(res.data);

      const { data, error } = await authClient.signUp.email({
        email: users.email,
        password: users.password,
        name: users.name,
        callbackURL: "/login"
      });

      if (error) {
        toast.error(error.message || "Failed to register");
        return;
      }

      toast.success("User registered successfully");
      router.push("/login");
     } catch (error : any) {
      console.error("Register error:", error);
      toast.error(error.response?.data?.message || error.message || "Something went wrong");
     } 
  }

  return (
    <div className="min-h-screen bg-[#000000] text-white flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-[#141414] border border-[#2B2B2B] rounded-sm p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">Create an account</h1>
          <p className="text-gray-400">Enter your info to join the CineVerse.</p>
        </div>

        <form onSubmit={registerAction} className="space-y-5">
          {/* Name Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Name</label>
            <input 
              name="name"
              required
              placeholder="John Doe" 
              className="w-full px-3 py-2 bg-[#000000] border border-[#2B2B2B] text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:border-transparent rounded-sm"
            />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Email Address</label>
            <input 
              name="email"
              type="email" 
              required
              placeholder="name@example.com" 
              className="w-full px-3 py-2 bg-[#000000] border border-[#2B2B2B] text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:border-transparent rounded-sm"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Password</label>
            <input 
              name="password"
              type="password" 
              required
              placeholder="••••••••" 
              className="w-full px-3 py-2 bg-[#000000] border border-[#2B2B2B] text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:border-transparent rounded-sm"
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-[#E50914] hover:bg-red-700 text-white font-medium py-2.5 rounded-sm transition-colors flex justify-center items-center mt-6"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-[#E50914] hover:text-red-400 font-bold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

