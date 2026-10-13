import { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../lib/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await fetch(`${API_URL}/auth/forgot-password`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
    const data = await response.json(); setMessage(data.message || "Request received");
  };
  return <main className="min-h-screen bg-secondaryBackground grid place-items-center px-6">
    <form onSubmit={submit} className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full flex flex-col gap-5">
      <h1 className="text-3xl text-primaryText">Reset password</h1>
      <p>Enter your email address. If an account exists, you will receive reset instructions.</p>
      <input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="border rounded-lg p-3" placeholder="Email" />
      <button className="bg-primary text-white rounded-lg p-3">Send instructions</button>
      {message && <p role="status">{message}</p>}
      <Link className="underline text-primary" to="/login">Back to login</Link>
    </form>
  </main>;
}
