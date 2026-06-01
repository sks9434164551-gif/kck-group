import { createActor } from "@/backend";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { HomeContent } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

function HeroSkeleton() {
  return (
    <section
      id="home"
      className="relative overflow-hidden min-h-[88vh] flex items-center"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.18 0.12 264) 0%, oklch(0.28 0.20 264) 40%, oklch(0.22 0.15 257) 100%)",
      }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <Skeleton className="h-6 w-64 rounded-full opacity-30" />
            <Skeleton className="h-24 w-72 opacity-30" />
            <Skeleton className="h-16 w-full max-w-lg opacity-30" />
            <div className="flex gap-4">
              <Skeleton className="h-12 w-44 rounded-full opacity-30" />
              <Skeleton className="h-12 w-36 rounded-full opacity-30" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-36 rounded-2xl opacity-20" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HeroSection() {
  const { actor, isFetching } = useActor(createActor);
  const { data: homeContent, isLoading } = useQuery<HomeContent>({
    queryKey: ["homeContent"],
    queryFn: async () => {
      if (!actor) return {} as HomeContent;
      return actor.getHomeContent();
    },
    enabled: !!actor && !isFetching,
  });

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  if (isLoading || !homeContent) return <HeroSkeleton />;

  const stats = [
    { value: homeContent.stat1Value, label: homeContent.stat1Label },
    { value: homeContent.stat2Value, label: homeContent.stat2Label },
    { value: homeContent.stat3Value, label: homeContent.stat3Label },
    { value: homeContent.stat4Value, label: homeContent.stat4Label },
  ];

  return (
    <section
      id="home"
      className="relative overflow-hidden min-h-[88vh] flex items-center"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.18 0.12 264) 0%, oklch(0.28 0.20 264) 40%, oklch(0.22 0.15 257) 100%)",
      }}
      data-ocid="hero.section"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 opacity-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(/assets/generated/hero-corporate.dim_1600x900.jpg)",
        }}
      />

      {/* Network grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, oklch(0.80 0.10 264) 1px, transparent 0)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Animated glow blobs */}
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-20 animate-pulse-glow"
        style={{
          background:
            "radial-gradient(circle, oklch(0.55 0.22 264) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full opacity-15"
        style={{
          background:
            "radial-gradient(circle, oklch(0.75 0.18 71) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-semibold tracking-wider uppercase"
              style={{
                background: "oklch(0.55 0.22 264 / 0.25)",
                border: "1px solid oklch(0.65 0.15 264 / 0.4)",
                color: "oklch(0.85 0.08 264)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              {homeContent.heroBadge}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-6xl sm:text-7xl lg:text-8xl font-bold font-display leading-[1.05] mb-6"
              style={{ color: "oklch(0.98 0 0)" }}
            >
              {homeContent.heroTitle}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="text-lg leading-relaxed mb-10 max-w-lg"
              style={{ color: "oklch(0.80 0.06 264)" }}
            >
              {homeContent.heroSubtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                onClick={() => scrollToSection("companies")}
                data-ocid="hero.explore_button"
                className="rounded-full px-8 font-semibold shadow-glow hover:shadow-glow-orange transition-all duration-300 group"
              >
                {homeContent.button1Label}
                <ArrowRight
                  size={16}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("about")}
                data-ocid="hero.about_button"
                className="rounded-full px-8 font-semibold border-2 transition-all duration-300"
                style={{
                  borderColor: "oklch(0.70 0.10 264 / 0.5)",
                  color: "oklch(0.95 0 0)",
                  background: "oklch(0.55 0.20 264 / 0.15)",
                }}
              >
                {homeContent.button2Label}
                <ChevronRight size={16} className="ml-1" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Right — stat cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.4 + i * 0.1,
                  type: "spring",
                  stiffness: 200,
                }}
                whileHover={{ scale: 1.04, y: -4 }}
                className="relative rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-default"
                style={{
                  background: "oklch(0.45 0.18 264 / 0.25)",
                  border: "1px solid oklch(0.70 0.15 264 / 0.35)",
                  backdropFilter: "blur(12px)",
                  boxShadow:
                    "0 8px 32px oklch(0.18 0.12 264 / 0.5), inset 0 1px 0 oklch(0.80 0.10 264 / 0.15)",
                }}
                data-ocid={`hero.stat.item.${i + 1}`}
              >
                {/* Glow border effect */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300"
                  style={{
                    boxShadow:
                      "0 0 20px oklch(0.55 0.22 264 / 0.4), 0 0 40px oklch(0.55 0.22 264 / 0.2)",
                    border: "1px solid oklch(0.65 0.20 264 / 0.6)",
                  }}
                />
                <p
                  className="text-4xl sm:text-5xl font-bold font-display mb-2"
                  style={{ color: "oklch(0.95 0.05 264)" }}
                >
                  {stat.value}
                </p>
                <p
                  className="text-sm font-medium"
                  style={{ color: "oklch(0.75 0.08 264)" }}
                >
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          role="img"
          aria-label="Wave divider"
        >
          <path
            d="M0 60 L0 30 Q360 0 720 30 Q1080 60 1440 30 L1440 60 Z"
            fill="oklch(0.99 0 0)"
          />
        </svg>
      </div>
    </section>
  );
}
