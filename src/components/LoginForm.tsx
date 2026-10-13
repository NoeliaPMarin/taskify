import Button from "./Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../lib/api";
import { useAuth } from "../context/AuthContext";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const { authenticate } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const enterDemo = async () => {
        setError(""); setSubmitting(true);
        try {
            const response = await fetch(`${API_URL}/auth/demo`, { method: "POST" });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Unable to start demo");
            authenticate(data.token, data.user); navigate("/tasks", { replace: true });
        } catch (caughtError) { setError(caughtError instanceof Error ? caughtError.message : "Unable to start demo"); }
        finally { setSubmitting(false); }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); setError(""); setSubmitting(true);
        try {
            const response = await fetch(`${API_URL}/auth/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Unable to log in");
            authenticate(data.token, data.user);
            navigate((location.state as { from?: string } | null)?.from || "/tasks", { replace: true });
        } catch (caughtError) { setError(caughtError instanceof Error ? caughtError.message : "Unable to log in"); }
        finally { setSubmitting(false); }
    };
    return (
        <form onSubmit={handleSubmit} className="w-full max-w-[507px] mx-auto flex flex-col gap-4 px-6 sm:px-0">
            <input
                type="email"
                value={email} onChange={(event) => setEmail(event.target.value)} required
                placeholder="Email"
                className="border h-[78px] sm:h-[78px] border-secondaryBackground rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
                type="password"
                value={password} onChange={(event) => setPassword(event.target.value)} required
                placeholder="Password"
                className="border h-[78px] sm:h-[78px] border-secondaryBackground rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Link
                to="/forgot-password"
                className="body underline text-accent hover:text-primary/80 justify-end self-end mb-6"
            >
                Forgot password?
            </Link>
            <div className="mb-16 flex flex-col gap-3">
                {error && <p className="text-red-600 mb-4" role="alert">{error}</p>}
                <Button variant="primary" className="w-full" type="submit">
                    {submitting ? "Logging in…" : "Log In"}
                </Button>
                <Button variant="secondary" className="w-full" type="button" onClick={enterDemo}>Try Demo</Button>
                <p className="text-sm text-center text-secondaryText">No account or personal details required.</p>
            </div>
        </form>
    );
}
