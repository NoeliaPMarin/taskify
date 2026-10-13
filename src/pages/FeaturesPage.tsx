import { ViewColumnsIcon, AdjustmentsVerticalIcon, ShieldCheckIcon } from "@heroicons/react/24/solid";
import { Link, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import { useAuth } from "../context/AuthContext";

export default function FeaturesPage() {
    const { user, loading } = useAuth();
    if (!loading && user) return <Navigate to="/tasks" replace />;
    return (
        <>
            <Navbar />

            {/* Hero Section */}
            <PageHero
                title="Powerful features for productive work"
                subtitle="Taskify helps you organise your personal workload and focus on what matters most."
            />

            {/* Feature Cards */}
            <section className="bg-Background py-16 px-6">
                <div className="max-w-6xl mx-auto grid gap-12 sm:grid-cols-2 lg:grid-cols-3">

                    {/* Feature Card */}
                    <div className="flex flex-col items-center text-center gap-6 max-w-[322px] mx-auto">
                        <div className="flex items-center justify-center rounded-full bg-accent w-[108px] h-[108px]">
                            <ViewColumnsIcon className="h-[55px] w-[55px] text-white" />
                        </div>
                        <h3 className="h3 text-primaryText">Easily Organize</h3>
                        <p className="caption text-secondaryText">
                            Organize all your tasks in visual boards and simple lists.
                        </p>
                    </div>

                    {/* Feature Card */}
                    <div className="flex flex-col items-center text-center gap-6 max-w-[322px] mx-auto">
                        <div className="flex items-center justify-center rounded-full bg-accent w-[108px] h-[108px]">
                            <AdjustmentsVerticalIcon className="h-[55px] w-[55px] text-white" />
                        </div>
                        <h3 className="h3 text-primaryText">Flexible Workflows</h3>
                        <p className="caption text-secondaryText">
                            Group tasks into lists, track status and organise work around due dates.
                        </p>
                    </div>

                    {/* Feature Card */}
                    <div className="flex flex-col items-center text-center gap-6 max-w-[322px] mx-auto">
                        <div className="flex items-center justify-center rounded-full bg-accent w-[108px] h-[108px]">
                            <ShieldCheckIcon className="h-[55px] w-[55px] text-white" />
                        </div>
                        <h3 className="h3 text-primaryText">Private Workspace</h3>
                        <p className="caption text-secondaryText">
                            Keep every account and its tasks securely separated from other users.
                        </p>
                    </div>

                </div>
            </section>

            {/* Call to action */}
            <section className="bg-tertiary py-16 text-center px-6">
                <h2 className="text-3xl font-semibold text-primaryText mb-6">
                    Ready to get more done?
                </h2>
                <Link
                    to="/signup"
                    className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:opacity-90 transition"
                >
                    Get Started
                </Link>
            </section>

            <Footer />
        </>
    );
}
