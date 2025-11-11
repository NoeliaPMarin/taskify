import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import PageHero from "../components/PageHero";

export default function Profile() {
    const user = {
        name: "Jane Doe",
        email: "jane.doe@example.com",
        joined: "January 2024",
    };

    return (
        <>
            <Navbar isLoggedIn={true} />
            {/* Profile Card */}
            <section className="bg-[url('/images/heroBg.png')] bg-cover bg-center py-10 sm:py-16 px-6 flex justify-center">
                <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full flex flex-col items-center gap-6">
                    <UserCircleIcon className="h-24 w-24 text-accent" />
                    <h2 className="text-2xl font-semibold text-primaryText">{user.name}</h2>
                    <p className="text-secondaryText">{user.email}</p>
                    <p className="text-secondaryText">Member since {user.joined}</p>

                    <div className="flex gap-4 mt-4 w-full">
                        <button className="flex-1 bg-primary text-white py-2 rounded-lg hover:opacity-90 transition">
                            Edit Profile
                        </button>
                        <button className="flex-1 bg-secondary text-tertiary py-2 rounded-lg hover:opacity-90 transition">
                            Log Out
                        </button>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
