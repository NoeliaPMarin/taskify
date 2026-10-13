import Button from "./Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../lib/api";
import { useAuth } from "../context/AuthContext";

export default function SignUpForm() {
    const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "", agree: false });
    const [error, setError] = useState("");
    const { authenticate } = useAuth();
    const navigate = useNavigate();
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); setError("");
        if (form.password !== form.confirmPassword) { setError("Passwords do not match"); return; }
        try {
            const response = await fetch(`${API_URL}/auth/signup`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: form.name, email: form.email, password: form.password }) });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Unable to create account");
            authenticate(data.token, data.user); navigate("/tasks");
        } catch (caughtError) { setError(caughtError instanceof Error ? caughtError.message : "Unable to create account"); }
    };
    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto flex flex-col gap-4 px-4 sm:px-0">
            <label htmlFor="text" className="mb-2 font-medium text-primaryText">
                Full name
            </label>
            <input
                type="text"
                value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required
                placeholder="Your name"
                className="border h-[78px] w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <label htmlFor="email" className="mb-2 font-medium text-primaryText">
                Email
            </label>
            <input
                type="email"
                value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required
                placeholder="Your email"
                className="border h-[78px] w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <label htmlFor="password" className="mb-2 font-medium text-primaryText">
                Password
            </label>
            <input
                type="password"
                minLength={8} value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required
                placeholder="Password"
                className="border h-[78px] w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <label htmlFor="confirmPassword" className="mb-2 font-medium text-primaryText">
                Confirm Password
            </label>
            <input
                type="password"
                minLength={8} value={form.confirmPassword} onChange={(event) => setForm({ ...form, confirmPassword: event.target.value })} required
                placeholder="Confirm Password"
                className="border h-[78px] w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <div className="flex justify-start">
                <div className="flex items-start gap-2">
                    <input
                        type="checkbox"
                        id="agree"
                        checked={form.agree} onChange={(event) => setForm({ ...form, agree: event.target.checked })} required
                        className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary mt-1"
                    />
                    <label htmlFor="agree" className="body text-left">
                        I agree to the{" "}
                        <Link
                            to="/terms"
                            className="underline text-accent hover:text-accent/80"
                        >
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                            to="/privacy"
                            className="underline text-accent hover:text-accent/80"
                        >
                            Privacy Policy
                        </Link>
                    </label>
                </div>
            </div>

            <div className="mt-6 mb-4 w-full">
                {error && <p className="text-red-600 mb-4" role="alert">{error}</p>}
                <Button className="w-full" variant="primary" type="submit">
                    Sign Up
                </Button>
            </div>

            <p className="body text-center mb-16">
                Already have an account?{" "}
                <Link
                    to="/login"
                    className="underline text-accent hover:text-accent/80"
                >
                    Log In
                </Link>
            </p>
        </form>
    );
}
