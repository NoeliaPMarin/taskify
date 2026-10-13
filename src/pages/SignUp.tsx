import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { Link, Navigate } from "react-router-dom";
import SignUpForm from "../components/SignUpForm";
import { useAuth } from "../context/AuthContext";

export default function SignUp() {
  const { user, loading } = useAuth();
  if (!loading && user) return <Navigate to="/tasks" replace />;

  return (
    <main className="min-h-screen bg-[url('/images/heroBg.png')] bg-cover bg-center px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/60 bg-white shadow-2xl shadow-primary/10 lg:grid-cols-[0.85fr_1.15fr]">
        <section className="hidden bg-gradient-to-br from-primary via-indigo-600 to-indigo-800 p-12 text-white lg:flex lg:flex-col lg:justify-between">
          <Link to="/" aria-label="Taskify home"><img src="/images/logoWhite.svg" alt="Taskify" className="h-12 w-40" /></Link>
          <div className="my-20">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-indigo-200">Get organised</p>
            <h1 className="mb-5 text-4xl font-bold leading-tight">One calm place for all your tasks.</h1>
            <p className="mb-8 text-lg leading-8 text-indigo-100">Create your workspace in seconds and keep every next step visible.</p>
            <ul className="space-y-4">
              {["Free to get started", "Your tasks stay private", "No payment details required"].map((item) => <li key={item} className="flex items-center gap-3"><CheckCircleIcon className="h-5 w-5 text-amber-300" /><span>{item}</span></li>)}
            </ul>
          </div>
          <p className="text-sm text-indigo-200">Already curious? The demo is available from the sign-in page.</p>
        </section>

        <section className="p-6 sm:p-12 lg:p-16">
          <div className="mx-auto w-full max-w-md">
            <Link to="/" className="mb-10 inline-block lg:hidden" aria-label="Taskify home"><img src="/images/logo.svg" alt="Taskify" className="h-11 w-36" /></Link>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">Your workspace</p>
            <h2 className="text-3xl font-bold text-primaryText sm:text-4xl">Create your account</h2>
            <p className="mb-8 mt-3 text-secondaryText">Start planning in less than a minute.</p>
            <SignUpForm />
          </div>
        </section>
      </div>
    </main>
  );
}
