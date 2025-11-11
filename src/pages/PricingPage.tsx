import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";

export default function PricingPage() {
    return (
        <>
            <Navbar />

            {/* Hero Section */}
            <PageHero
                title="Simple and flexible pricing"
                subtitle="Choose the plan that fits your workflow. No hidden fees."
            />

            {/* Pricing Cards */}
            <section className="px-6 py-16 bg-tertiary">
                <div className="max-w-6xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-3">

                    {/* Free Plan */}
                    <div className="bg-white rounded-xl shadow-md p-8 text-center flex flex-col gap-6">
                        <h3 className="text-2xl font-semibold text-primaryText">Free</h3>
                        <p className="text-secondaryText text-sm">Good for personal use</p>
                        <p className="text-4xl font-bold text-primaryText">$0</p>
                        <ul className="text-secondaryText text-sm flex flex-col gap-2">
                            <li>✔ Create unlimited tasks</li>
                            <li>✔ Basic task organization</li>
                            <li>✖ No team collaboration</li>
                        </ul>
                        <a href="/signup" className="bg-accent text-white py-2 rounded-lg hover:opacity-90 transition">
                            Get Started
                        </a>
                    </div>

                    {/* Pro Plan */}
                    <div className="bg-white rounded-xl shadow-md p-8 text-center flex flex-col gap-6 border-2 border-accent">
                        <h3 className="text-2xl font-semibold text-primaryText">Pro</h3>
                        <p className="text-secondaryText text-sm">Perfect for freelancers</p>
                        <p className="text-4xl font-bold text-primaryText">$8<span className="text-base text-secondaryText">/mo</span></p>
                        <ul className="text-secondaryText text-sm flex flex-col gap-2">
                            <li>✔ Everything in Free</li>
                            <li>✔ Priority organization</li>
                            <li>✔ Real-time collaboration</li>
                        </ul>
                        <a href="/signup" className="bg-accent text-white py-2 rounded-lg hover:opacity-90 transition">
                            Start Free Trial
                        </a>
                    </div>

                    {/* Team Plan */}
                    <div className="bg-white rounded-xl shadow-md p-8 text-center flex flex-col gap-6">
                        <h3 className="text-2xl font-semibold text-primaryText">Team</h3>
                        <p className="text-secondaryText text-sm">Ideal for teams and orgs</p>
                        <p className="text-4xl font-bold text-primaryText">$19<span className="text-base text-secondaryText">/mo</span></p>
                        <ul className="text-secondaryText text-sm flex flex-col gap-2">
                            <li>✔ Everything in Pro</li>
                            <li>✔ Shared Boards and Lists</li>
                            <li>✔ Advanced team roles</li>
                        </ul>
                        <a href="/signup" className="bg-accent text-white py-2 rounded-lg hover:opacity-90 transition">
                            Try for Free
                        </a>
                    </div>

                </div>
            </section>

            <Footer />
        </>
    );
}
