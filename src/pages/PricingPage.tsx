import { CheckIcon } from "@heroicons/react/24/solid";
import { Link, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import { useAuth } from "../context/AuthContext";

export default function PricingPage() {
  const { user, loading } = useAuth();
  if (!loading && user) return <Navigate to="/tasks" replace />;

  return (
    <>
      <Navbar />
      <PageHero title="Simple, transparent pricing" subtitle="Taskify is free to explore and use for this portfolio release." />
      <main className="bg-secondaryBackground px-6 py-16">
        <section className="mx-auto max-w-xl rounded-3xl border border-gray-200 bg-white p-8 shadow-xl shadow-primary/10 sm:p-12">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Personal</p>
            <h2 className="mt-3 text-3xl font-bold text-primaryText">Everything you need</h2>
            <p className="mt-4 text-5xl font-bold text-primaryText">£0 <span className="text-base font-normal text-secondaryText">forever</span></p>
          </div>
          <ul className="mb-9 space-y-4 text-secondaryText">
            {["Unlimited personal tasks", "Lists, search, filters and sorting", "Progress overview and due dates", "Private account and demo access"].map((feature) => <li key={feature} className="flex items-center gap-3"><CheckIcon className="h-5 w-5 text-emerald-600" /><span>{feature}</span></li>)}
          </ul>
          <Link to="/signup" className="block rounded-xl bg-primary px-6 py-4 text-center text-lg font-semibold text-white shadow-primaryShadow transition hover:bg-indigo-700">Create your free account</Link>
          <p className="mt-5 text-center text-sm text-secondaryText">No card required. You can also explore with a demo account.</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
