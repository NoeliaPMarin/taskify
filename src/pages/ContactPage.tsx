import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import PageHero from "../components/PageHero";


export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        //TODO: add form submission logic here
        alert("Message sent! ✨ (Aquí puedes conectar tu backend después)");
    };

    return (
        <>
            <Navbar />

            {/* Hero Section */}
            <PageHero
                title="Powerful features for productive work"
                subtitle="Taskify helps you stay organized, collaborate seamlessly, and focus on what matters most."
            />

            {/* Form */}
            <section className="px-6 py-16">
                <div className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-8 border-accent border-2">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                        <div>
                            <label className="block text-sm text-primaryText mb-2">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-primary"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-primaryText mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-primary"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-primaryText mb-2">Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                className="w-full border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:border-primary"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="bg-accent text-white font-medium py-3 rounded-lg hover:opacity-90 transition"
                        >
                            Send Message
                        </button>

                    </form>
                </div>
            </section>

            <Footer />
        </>
    );
}
