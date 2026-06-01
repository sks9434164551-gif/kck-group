import type { TimelineItem } from "@/backend";
import { Skeleton } from "@/components/ui/skeleton";
import { useAboutContent, useHomeContent } from "@/hooks/useContent";
import { Building2, Globe, TrendingUp, Users } from "lucide-react";
import { motion } from "motion/react";

function AboutSkeleton() {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 space-y-3">
          <Skeleton className="h-4 w-24 mx-auto" />
          <Skeleton className="h-10 w-64 mx-auto" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-40 rounded-2xl" />
          ))}
        </div>
        <div className="space-y-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-28 rounded-2xl" />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function AboutSection() {
  const { data: aboutContent, isLoading } = useAboutContent();
  const { data: homeContent } = useHomeContent();

  if (isLoading || !aboutContent) return <AboutSkeleton />;

  return (
    <section
      id="about"
      className="py-24 bg-background"
      data-ocid="about.section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-primary/60 mb-3">
            Our Story
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold font-display text-foreground mb-4">
            About KCK Group
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Three decades of building exceptional businesses, empowering
            communities, and creating lasting value.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card border border-border rounded-2xl p-8"
            data-ocid="about.mission.card"
          >
            <h3 className="text-lg font-bold font-display text-primary mb-3">
              Our Mission
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {aboutContent.missionText}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-card border border-border rounded-2xl p-8"
            data-ocid="about.vision.card"
          >
            <h3 className="text-lg font-bold font-display text-primary mb-3">
              Our Vision
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {aboutContent.visionText}
            </p>
          </motion.div>
        </div>

        {/* Core Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {aboutContent.values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group relative bg-card border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-elevated transition-all duration-300"
              data-ocid={`about.value.item.${i + 1}`}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:border-primary transition-all duration-300 text-2xl overflow-hidden">
                {v.imageUrl && v.imageUrl.trim() !== "" ? (
                  <img
                    src={v.imageUrl}
                    alt={v.title}
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  v.icon
                )}
              </div>
              <h3 className="font-bold font-display text-foreground mb-2">
                {v.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {v.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold font-display text-center mb-12 text-foreground">
            Our Journey
          </h3>
          <div className="relative">
            {/* Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border" />

            <div className="space-y-8">
              {(aboutContent.timeline as TimelineItem[]).map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className={`md:flex items-center gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                  data-ocid={`about.timeline.item.${i + 1}`}
                >
                  <div
                    className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}
                  >
                    <div className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/20 hover:shadow-xs transition-all duration-300">
                      {item.imageUrl && item.imageUrl.trim() !== "" && (
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-40 object-cover"
                        />
                      )}
                      <div className="p-5">
                        <span className="text-primary font-bold text-sm font-display">
                          {item.year}
                        </span>
                        <h4 className="font-bold font-display text-foreground mt-1 mb-2">
                          {item.title}
                        </h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:flex w-4 h-4 rounded-full bg-primary border-4 border-background shadow-glow flex-shrink-0 z-10" />
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            {
              icon: TrendingUp,
              value: homeContent?.stat1Value ?? "30+",
              label: homeContent?.stat1Label ?? "Years of Excellence",
            },
            {
              icon: Users,
              value: homeContent?.stat2Value ?? "5,000+",
              label: homeContent?.stat2Label ?? "Team Members",
            },
            {
              icon: Globe,
              value: homeContent?.stat3Value ?? "25+",
              label: homeContent?.stat3Label ?? "Countries",
            },
            {
              icon: Building2,
              value: homeContent?.stat4Value ?? "12+",
              label: homeContent?.stat4Label ?? "Companies",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-primary/5 border border-primary/15 rounded-2xl p-6 text-center"
            >
              <stat.icon size={24} className="text-primary mx-auto mb-3" />
              <p className="text-3xl font-bold font-display text-foreground mb-1">
                {stat.value}
              </p>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
