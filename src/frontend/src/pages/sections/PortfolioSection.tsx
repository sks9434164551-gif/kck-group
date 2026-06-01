import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCompanies } from "@/hooks/useCompanies";
import { Building2, ExternalLink } from "lucide-react";
import { motion } from "motion/react";

const fallbackCompanies = [
  {
    id: 1,
    name: "KCK Industries",
    industry: "Manufacturing",
    description:
      "Leading industrial manufacturing solutions with operations spanning 15 countries and 3 continents.",
    websiteUrl: "#",
    isActive: true,
  },
  {
    id: 2,
    name: "KCK Technology",
    industry: "Technology",
    description:
      "Pioneering digital transformation through enterprise software, AI solutions, and cloud infrastructure.",
    websiteUrl: "#",
    isActive: true,
  },
  {
    id: 3,
    name: "KCK Finance",
    industry: "Financial Services",
    description:
      "Comprehensive banking and investment services empowering businesses and individuals globally.",
    websiteUrl: "#",
    isActive: true,
  },
  {
    id: 4,
    name: "KCK Healthcare",
    industry: "Healthcare",
    description:
      "Innovative healthcare solutions delivering premium medical services and pharmaceutical products.",
    websiteUrl: "#",
    isActive: true,
  },
  {
    id: 5,
    name: "KCK Real Estate",
    industry: "Real Estate",
    description:
      "Premium commercial and residential developments transforming urban landscapes worldwide.",
    websiteUrl: "#",
    isActive: true,
  },
  {
    id: 6,
    name: "KCK Energy",
    industry: "Energy & Resources",
    description:
      "Sustainable energy solutions and resource management driving the global green transition.",
    websiteUrl: "#",
    isActive: true,
  },
];

export default function PortfolioSection() {
  const { data: backendCompanies, isLoading } = useCompanies();
  const companies =
    backendCompanies && backendCompanies.length > 0
      ? backendCompanies
      : fallbackCompanies;

  return (
    <section
      id="companies"
      className="py-24 bg-muted/30"
      data-ocid="portfolio.section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-primary/60 mb-3">
            Our Portfolio
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold font-display text-foreground mb-4">
            Group Companies
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our diverse portfolio of industry-leading companies driving
            growth and innovation.
          </p>
        </motion.div>

        {/* Grid */}
        {isLoading ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            data-ocid="portfolio.loading_state"
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-64 w-full rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((company, i) => (
              <motion.div
                key={company.id.toString()}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group bg-card rounded-2xl border border-border p-6 shadow-xs hover:shadow-elevated transition-all duration-300 flex flex-col"
                data-ocid={`portfolio.company.item.${i + 1}`}
              >
                {/* Logo */}
                <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors overflow-hidden flex-shrink-0">
                  {"logoUrl" in company && company.logoUrl ? (
                    <img
                      src={(
                        company.logoUrl as { getDirectURL: () => string }
                      ).getDirectURL()}
                      alt={company.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Building2 size={24} className="text-primary" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold font-display text-foreground text-lg leading-tight">
                      {company.name}
                    </h3>
                    <Badge
                      variant="secondary"
                      className="text-xs flex-shrink-0 mt-0.5"
                    >
                      {company.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <p className="text-primary text-xs font-semibold uppercase tracking-wide mb-3">
                    {company.industry}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {company.description}
                  </p>
                </div>

                {/* Action */}
                <div className="mt-5 pt-4 border-t border-border">
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="w-full justify-between text-primary hover:text-primary hover:bg-primary/5 rounded-lg font-medium"
                    data-ocid={`portfolio.company.visit_button.${i + 1}`}
                  >
                    <a
                      href={company.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit Website
                      <ExternalLink size={14} />
                    </a>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
