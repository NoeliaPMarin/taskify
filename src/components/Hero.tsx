import Button from "./Button";

export default function Hero() {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between px-[112px] bg-[url('/images/heroBg.png')] bg-cover bg-center">
            <div className="flex flex-col justify-center w-[655px]">
                <h1 className="h1 mb-10 text-primaryText">
                    Organize your tasks, achieve your goals
                </h1>
                <p className="text-lg text-primaryText mb-8 leading-relaxed">
                    Organize tasks, collaborate with your team, and achieve your goals without wasting time.
                </p>
                <div className="hidden md:flex items-center gap-4 mr-[112px]">
                    <Button variant="primary">Sign Up</Button>
                </div>
            </div>
            <div className="flex justify-center items-center">
                <img
                    src="/images/hero.png"
                    alt="Image of a womanIllustration of a woman managing tasks on a digital board."
                    className="w-[618px] h-[618px] object-contain"
                />
            </div>
        </div>
    );
}