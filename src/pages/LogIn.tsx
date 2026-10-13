import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { Link, Navigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { useAuth } from "../context/AuthContext";

const benefits = ["Organise tasks in one clear workspace", "Keep your progress synced", "Start instantly with a private demo"];

export default function LogIn() {
  const { user, loading } = useAuth();
  if (!loading && user) return <Navigate to="/tasks" replace />;

  return (
    <main className="min-h-screen bg-[url('/images/heroBg.png')] bg-cover bg-center px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto grid min-h-[calc(100vh-6rem)] w-full max-w-5xl overflow-hidden rounded-3xl border border-white/60 bg-white shadow-2xl shadow-primary/10 lg:grid-cols-[0.85fr_1.15fr]">
        <section className="hidden bg-gradient-to-br from-primary via-indigo-600 to-indigo-800 p-12 text-white lg:flex lg:flex-col lg:justify-between">
          <Link to="/" aria-label="Taskify home"><img src="/images/logoWhite.svg" alt="Taskify" className="h-12 w-40" /></Link>
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-indigo-200">Welcome back</p>
            <h1 className="mb-5 text-4xl font-bold leading-tight">Turn today’s plans into finished work.</h1>
            <p className="mb-8 text-lg leading-8 text-indigo-100">A focused workspace for planning, prioritising and completing what matters.</p>
            <ul className="space-y-4">{benefits.map((benefit) => <li key={benefit} className="flex items-center gap-3"><CheckCircleIcon className="h-5 w-5 text-amber-300" /><span>{benefit}</span></li>)}</ul>
          </div>
          <p className="text-sm text-indigo-200">Simple by design. Useful from the first click.</p>
        </section>

        <section className="flex items-center p-6 sm:p-12 lg:p-16">
          <div className="mx-auto w-full max-w-md">
            <Link to="/" className="mb-10 inline-block lg:hidden" aria-label="Taskify home"><img src="/images/logo.svg" alt="Taskify" className="h-11 w-36" /></Link>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">Account access</p>
            <h2 className="text-3xl font-bold text-primaryText sm:text-4xl">Sign in to Taskify</h2>
            <p className="mb-8 mt-3 text-secondaryText">Continue where you left off, or explore the full experience with a demo account.</p>
            <LoginForm />
            <p className="mt-8 text-center text-sm text-secondaryText">New to Taskify? <Link to="/signup" className="font-semibold text-primary hover:underline">Create an account</Link></p>
          </div>
        </section>
      </div>
    </main>
  );
}
