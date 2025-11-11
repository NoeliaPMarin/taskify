interface PageHeroProps {
  title: string;
  subtitle: string;
}

export default function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="relative bg-[url('/images/heroBg.png')] bg-cover bg-center h-[340px] sm:h-[420px] flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-4xl sm:text-5xl font-bold text-primaryText mb-4">
        {title}
      </h1>
      <p className="text-secondaryText max-w-2xl mx-auto text-lg">
        {subtitle}
      </p>
    </section>
  );
}
