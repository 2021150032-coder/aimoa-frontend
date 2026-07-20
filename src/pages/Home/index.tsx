import Hero from "../../components/home/Hero";
import PopularAI from "../../components/home/PopularAI";
import FeaturedWorkflow from "../../components/home/FeaturedWorkflow";

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
      <Hero />

      <div className="mx-auto max-w-6xl px-8 pb-28">
        <FeaturedWorkflow />

        <div className="mt-28">
          <PopularAI />
        </div>
      </div>
    </main>
  );
}