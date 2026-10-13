import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import PasswordInput from "./PasswordInput";
import { API_URL } from "../lib/api";
import { useAuth } from "../context/AuthContext";

export default function SignUpForm() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "", agree: false });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { authenticate } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    if (form.name.trim().length < 2) { setError("Please enter your full name."); return; }
    if (form.password !== form.confirmPassword) { setError("The passwords do not match."); return; }
    if (!form.agree) { setError("Please accept the Terms and Privacy Policy."); return; }
    setSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name.trim(), email: form.email.trim(), password: form.password }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "We couldn't create your account. Please try again.");
      authenticate(data.token, data.user, true);
      navigate("/tasks", { replace: true });
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Unable to create your account.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-5">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-semibold text-primaryText">Full name</label>
        <input id="name" name="name" type="text" autoComplete="name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required placeholder="Your name" className="h-14 w-full rounded-xl border border-gray-300 bg-white px-4 text-primaryText outline-none transition placeholder:text-gray-400 focus:border-primary focus:ring-4 focus:ring-primary/10" />
      </div>
      <div>
        <label htmlFor="signup-email" className="mb-2 block text-sm font-semibold text-primaryText">Email address</label>
        <input id="signup-email" name="email" type="email" autoComplete="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required placeholder="you@example.com" className="h-14 w-full rounded-xl border border-gray-300 bg-white px-4 text-primaryText outline-none transition placeholder:text-gray-400 focus:border-primary focus:ring-4 focus:ring-primary/10" />
      </div>
      <PasswordInput id="new-password" label="Password" value={form.password} onChange={(password) => setForm({ ...form, password })} autoComplete="new-password" minLength={8} hint="Use at least 8 characters." />
      <PasswordInput id="confirm-password" label="Confirm password" value={form.confirmPassword} onChange={(confirmPassword) => setForm({ ...form, confirmPassword })} autoComplete="new-password" minLength={8} placeholder="Enter it again" />

      <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-secondaryText">
        <input type="checkbox" checked={form.agree} onChange={(event) => setForm({ ...form, agree: event.target.checked })} required className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
        <span>I agree to the <Link to="/terms" className="font-semibold text-primary hover:underline">Terms of Service</Link> and <Link to="/privacy" className="font-semibold text-primary hover:underline">Privacy Policy</Link>.</span>
      </label>

      {error && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">{error}</div>}
      <Button className="w-full" variant="primary" type="submit" disabled={submitting}>{submitting ? "Creating your account…" : "Create account"}</Button>
      <p className="text-center text-sm text-secondaryText">Already have an account? <Link to="/login" className="font-semibold text-primary hover:underline">Sign in</Link></p>
    </form>
  );
}
