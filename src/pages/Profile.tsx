import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../context/AuthContext";
import { API_URL, authHeaders } from "../lib/api";

export default function Profile() {
  const { user, logout, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  if (!user) return null;

  const saveProfile = async () => {
    const response = await fetch(`${API_URL}/auth/me`, { method: "PUT", headers: { "Content-Type": "application/json", ...authHeaders() }, body: JSON.stringify({ name }) });
    const data = await response.json();
    if (response.ok) { updateUser(data.user); setEditing(false); setMessage("Profile updated"); }
    else setMessage(data.error || "Unable to update profile");
  };

  const handleLogout = () => { logout(); navigate("/"); };

  return <>
    <Navbar isLoggedIn />
    <section className="bg-[url('/images/heroBg.png')] bg-cover bg-center py-10 sm:py-16 px-6 flex justify-center min-h-[65vh]">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full flex flex-col items-center gap-6 self-start">
        <UserCircleIcon className="h-24 w-24 text-accent" />
        {editing ? <input className="border rounded-lg p-3 w-full" value={name} onChange={(event) => setName(event.target.value)} /> : <h2 className="text-2xl font-semibold text-primaryText">{user.name}</h2>}
        <p className="text-secondaryText">{user.email}</p>
        <p className="text-secondaryText">Member since {new Date(user.joined).toLocaleDateString()}</p>
        {message && <p role="status" className="text-primary">{message}</p>}
        <div className="flex gap-4 mt-4 w-full">
          <button onClick={editing ? saveProfile : () => setEditing(true)} className="flex-1 bg-primary text-white py-2 rounded-lg hover:opacity-90">{editing ? "Save" : "Edit Profile"}</button>
          <button onClick={handleLogout} className="flex-1 bg-secondary text-tertiary py-2 rounded-lg hover:opacity-90">Log Out</button>
        </div>
      </div>
    </section>
    <Footer />
  </>;
}
