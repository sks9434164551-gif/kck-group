import { Linkedin } from "lucide-react";
import { SiFacebook, SiInstagram, SiX } from "react-icons/si";
import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();
  const sections = [
    {
      title: "Company",
      links: [
        { label: "Home", href: "/" },
        { label: "About", href: "/#about" },
        { label: "Companies", href: "/#companies" },
        { label: "Contact", href: "/#contact" },
      ],
    },
    {
      title: "Group",
      links: [
        { label: "KCK Industries", href: "/#companies" },
        { label: "KCK Tech", href: "/#companies" },
        { label: "KCK Finance", href: "/#companies" },
        { label: "KCK Healthcare", href: "/#companies" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Cookie Policy", href: "#" },
        { label: "Compliance", href: "#" },
      ],
    },
  ];

  const socials = [
    { icon: Linkedin, href: "#", label: "LinkedIn", ocid: "footer.linkedin" },
    { icon: SiX, href: "#", label: "X (Twitter)", ocid: "footer.twitter" },
    { icon: SiFacebook, href: "#", label: "Facebook", ocid: "footer.facebook" },
    {
      icon: SiInstagram,
      href: "#",
      label: "Instagram",
      ocid: "footer.instagram",
    },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="mb-4">
              <img
                src="/assets/kck-logo.png"
                alt="KCK Group"
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6">
              A diversified conglomerate driving innovation, creating
              opportunities, and building lasting value across multiple sectors
              worldwide.
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label, ocid }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  data-ocid={ocid}
                  className="w-9 h-9 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/20 transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-primary-foreground/90 font-display">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-primary-foreground/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col items-center gap-2">
          <p className="text-primary-foreground/80 text-sm font-medium tracking-wide font-display">
            Built with love using{" "}
            <span className="text-accent font-bold">KCK GROUP</span>
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 text-primary-foreground/50 text-xs">
            <p>&copy; {year} KCK Group. All rights reserved.</p>
            <span className="hidden sm:inline text-primary-foreground/30">
              ·
            </span>
            <span>Powered by KCK GROUP</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
