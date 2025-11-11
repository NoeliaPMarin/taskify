import { ViewColumnsIcon, AdjustmentsVerticalIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";

export default function FeaturesPage() {
    return (
        <>
            <Navbar />

            {/* Hero Section */}
            <PageHero
                title="Powerful features for productive work"
                subtitle="Taskify helps you stay organized, collaborate seamlessly, and focus on what matters most."
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
                        <h3 className="h3 text-primaryText">Best Time Collaboration</h3>
                        <p className="caption text-secondaryText">
                            Work with your team in real time and keep communication flowing.
                        </p>
                    </div>

                    {/* Feature Card */}
                    <div className="flex flex-col items-center text-center gap-6 max-w-[322px] mx-auto">
                        <div className="flex items-center justify-center rounded-full bg-accent w-[108px] h-[108px]">
                            <UserGroupIcon className="h-[55px] w-[55px] text-white" />
                        </div>
                        <h3 className="h3 text-primaryText">Smart Prioritization</h3>
                        <p className="caption text-secondaryText">
                            Set priorities intelligently to focus on what matters most.
                        </p>
                    </div>

                </div>
            </section>

            {/* Call to action */}
            <section className="bg-tertiary py-16 text-center px-6">
                <h2 className="text-3xl font-semibold text-primaryText mb-6">
                    Ready to get more done?
                </h2>
                <a
                    href="/signup"
                    className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:opacity-90 transition"
                >
                    Get Started
                </a>
            </section>

            <Footer />
        </>
    );
}
