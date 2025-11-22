"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignInPage() {


  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Handle sign-in logic here
    // console log the form values

    const form = event.currentTarget;
    const formData = new FormData(form);
    console.log(Object.fromEntries(formData.entries()));
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center gap-10 px-6 py-12 sm:px-10">
        <div className="grid gap-12 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-blue-500/10 backdrop-blur lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.35em] text-slate-300">
              Welcome back
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Sign in to your account to continue
            </h1>
            <p className="text-base text-slate-300 sm:text-lg">
              Pick up exactly where you left off—manage branded links, track live campaigns, and ship new experiments in seconds.
            </p>
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 text-sm text-slate-200">
              <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Why teams choose Shortly</p>
              <ul className="mt-4 space-y-2">
                <li className="text-slate-200">⚡ Redis-level redirect speed under 30&nbsp;ms.</li>
                <li className="text-slate-200">📊 Real-time analytics with campaign tagging.</li>
                <li className="text-slate-200">🎯 Custom shortcodes that stay perfectly on-brand.</li>
              </ul>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-inner">
            <div className="flex flex-col space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-200">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@team.com"
                required
                className="bg-black/20 text-white placeholder:text-slate-500"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-slate-200">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                minLength={8}
                className="bg-black/20 text-white placeholder:text-slate-500"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-slate-300">
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  className="size-4 rounded border border-white/30 bg-transparent text-blue-400 accent-blue-500"
                />
                Remember me
              </label>
              <Link
                href="#"
                className="font-medium text-blue-300 transition hover:text-blue-200"
              >
                Forgot password?
              </Link>
            </div>
            <Button className="w-full bg-linear-to-r from-blue-500 to-rose-500 text-base text-white shadow-lg shadow-blue-500/30">
              Sign in
            </Button>
            <p className="text-center text-sm text-slate-300">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="font-semibold text-blue-300 transition hover:text-blue-200">
                Sign up here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
