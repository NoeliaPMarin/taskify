import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "./Button";
import PasswordInput from "./PasswordInput";
import { API_URL } from "../lib/api";
import { useAuth } from "../context/AuthContext";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState<"login" | "demo" | null>(null);
  const { authenticate } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const destination = (location.state as { from?: string } | null)?.from || "/tasks";

  const readResponse = async (response: Response) => {
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || "We couldn't sign you in. Please try again.");
    return data;
  };

  const enterDemo = async () => {
    setError("");
    setSubmitting("demo");
    try {
      const data = await readResponse(await fetch(`${API_URL}/auth/demo`, { method: "POST" }));
      authenticate(data.token, data.user, false);
      navigate("/tasks", { replace: true });
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Unable to start the demo.");
    } finally {
      setSubmitting(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setSubmitting("login");
    try {
      const data = await readResponse(await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      }));
      authenticate(data.token, data.user, remember);
      navigate(destination, { replace: true });
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Unable to sign in.");
    } finally {
      setSubmitting(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-5">
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-semibold text-primaryText">Email address</label>
        <input id="email" name="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required placeholder="you@example.com" className="h-14 w-full rounded-xl border border-gray-300 bg-white px-4 text-primaryText outline-none transition placeholder:text-gray-400 focus:border-primary focus:ring-4 focus:ring-primary/10" />
      </div>

      <PasswordInput id="password" label="Password" value={password} onChange={setPassword} autoComplete="current-password" />

      <label className="flex cursor-pointer items-center gap-3 text-sm text-secondaryText">
        <input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
        Keep me signed in on this device
      </label>

      {error && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">{error}</div>}

      <Button variant="primary" className="w-full" type="submit" disabled={submitting !== null}>{submitting === "login" ? "Signing in…" : "Sign in"}</Button>

      <div className="flex items-center gap-3" aria-hidden="true"><span className="h-px flex-1 bg-gray-200" /><span className="text-xs font-semibold uppercase tracking-widest text-gray-400">or</span><span className="h-px flex-1 bg-gray-200" /></div>

      <Button variant="secondary" className="w-full" type="button" onClick={enterDemo} disabled={submitting !== null}>{submitting === "demo" ? "Preparing your workspace…" : "Explore with a demo account"}</Button>
      <p className="text-center text-sm text-secondaryText">Instant access. No account or personal details required.</p>
    </form>
  );
}
