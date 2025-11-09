import Button from "./Button";

export default function Hero() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-6 sm:px-12 lg:px-[112px] py-12 bg-[url('/images/heroBg.png')] bg-cover bg-center">
      
      {/* Left Content */}
      <div className="flex flex-col justify-center max-w-[655px] text-center md:text-left mb-10 md:mb-0">
        <h1 className="h1 mb-6 text-primaryText">
          Organize your tasks, achieve your goals
        </h1>

        <p className="text-lg text-primaryText mb-8 leading-relaxed max-w-[520px] mx-auto md:mx-0">
          Organize tasks, collaborate with your team, and achieve your goals without wasting time.
        </p>

        {/* CTA Button - visible in all screen sizes */}
        <div className="flex justify-center md:justify-start">
          <Button variant="primary">Sign Up</Button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="flex justify-center items-center w-full md:w-auto">
        <img
          src="/images/hero.png"
          alt="Woman managing tasks on a board"
          className="w-[260px] sm:w-[380px] md:w-[480px] lg:w-[618px] h-auto object-contain"
        />
      </div>

    </div>
  );
}
