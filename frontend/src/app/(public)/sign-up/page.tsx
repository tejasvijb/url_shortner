"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignUpPage() {



  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle sign-up logic here
    // console log the form values
    const form = event.currentTarget;
    const formData = new FormData(form);

    const formValues = Object.fromEntries(formData.entries());
    console.log(formValues);

  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center gap-10 px-6 py-12 sm:px-10">
        <div className="grid gap-12 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-rose-500/10 backdrop-blur lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.35em] text-slate-300">
              Welcome to Shortly
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Create an account
            </h1>
            <p className="text-base text-slate-300 sm:text-lg">
              Spin up branded short links, automate tracking, and collaborate with your entire team in one high-velocity workspace.
            </p>
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
              <p className="text-xs uppercase tracking-[0.4em] text-slate-400">What&apos;s included</p>
              <div className="mt-4 grid gap-3 text-sm text-slate-200">
                <p>• Unlimited branded domains with custom shortcodes.</p>
                <p>• Real-time analytics dashboard and export-ready reports.</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-inner">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col space-y-2">
                <label htmlFor="first-name" className="text-sm font-medium text-slate-200">
                  First name
                </label>
                <Input
                  id="first-name"
                  name="firstName"
                  placeholder="Alex"
                  required
                  className="bg-black/20 text-white placeholder:text-slate-500"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="last-name" className="text-sm font-medium text-slate-200">
                  Last name
                </label>
                <Input
                  id="last-name"
                  name="lastName"
                  placeholder="Rivera"
                  required
                  className="bg-black/20 text-white placeholder:text-slate-500"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="signup-email" className="text-sm font-medium text-slate-200">
                Email address
              </label>
              <Input
                id="signup-email"
                name="email"
                type="email"
                placeholder="you@company.com"
                required
                className="bg-black/20 text-white placeholder:text-slate-500"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="signup-password" className="text-sm font-medium text-slate-200">
                Password
              </label>
              <Input
                id="signup-password"
                name="password"
                type="password"
                placeholder="Create a strong password"
                required
                minLength={8}
                className="bg-black/20 text-white placeholder:text-slate-500"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="confirm-password" className="text-sm font-medium text-slate-200">
                Confirm password
              </label>
              <Input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                placeholder="Re-enter password"
                required
                minLength={8}
                className="bg-black/20 text-white placeholder:text-slate-500"
              />
            </div>
            <label className="flex items-start gap-3 text-sm text-slate-300">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                required
                className="mt-1 size-4 rounded border border-white/30 bg-transparent text-rose-300 accent-rose-400"
              />
              <span>
                I agree to the{" "}
                <Link href="#" className="font-medium text-rose-200 transition hover:text-rose-100">
                  Terms &amp; Conditions
                </Link>
                , including the privacy policy.
              </span>
            </label>
            <Button type="submit" className="w-full bg-linear-to-r from-blue-500 to-rose-500 text-base text-white shadow-lg shadow-rose-500/30">
              Create account
            </Button>
            <p className="text-center text-sm text-slate-300">
              Already have an account?{" "}
              <Link href="/sign-in" className="font-semibold text-blue-300 transition hover:text-blue-200">
                Sign in here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
