import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, Menu, Shield, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", href: "/", id: "home" },
  { label: "About", href: "/#about", id: "about" },
  { label: "Companies", href: "/#companies", id: "companies" },
  { label: "Contact", href: "/#contact", id: "contact" },
  { label: "Admin", href: "/admin", id: "admin" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, signIn, signOut, isInitializing, isLoggingIn } =
    useAuth();
  const isMobile = useIsMobile();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("/#")) {
      const id = href.replace("/#", "");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "shadow-elevated bg-card/95 backdrop-blur-md"
          : "bg-card shadow-xs"
      } border-b border-border`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            data-ocid="header.link"
          >
            <img
              src="/assets/kck-logo.png"
              alt="KCK Group"
              className="h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-200"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(
                      item.href.split("#")[0] || "/",
                    );
              return (
                <Link
                  key={item.id}
                  to={item.href}
                  onClick={() => handleNavClick(item.href)}
                  data-ocid={`nav.${item.id}.link`}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive && item.href !== "/"
                      ? "text-primary bg-primary/8 font-semibold"
                      : item.href === "/" && location.pathname === "/"
                        ? "text-primary bg-primary/8 font-semibold"
                        : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Auth Actions */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                <Shield size={13} className="text-primary" />
                <span className="text-xs font-semibold text-primary">
                  Signed In
                </span>
              </div>
            )}
            <Button
              variant={isAuthenticated ? "outline" : "default"}
              size="sm"
              onClick={isAuthenticated ? signOut : signIn}
              disabled={isInitializing || isLoggingIn}
              data-ocid="header.auth_button"
              className="rounded-full font-medium"
            >
              {isInitializing ? (
                "Loading..."
              ) : isLoggingIn ? (
                "Signing in..."
              ) : isAuthenticated ? (
                <>
                  <LogOut size={14} className="mr-1.5" />
                  Sign Out
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-foreground/70 hover:text-primary hover:bg-primary/5 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            data-ocid="header.mobile_menu_toggle"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-t border-border bg-card overflow-hidden"
          >
            <div className="px-4 pt-3 pb-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.href}
                  onClick={() => handleNavClick(item.href)}
                  data-ocid={`mobile_nav.${item.id}.link`}
                  className="block px-3 py-2.5 rounded-md text-sm font-medium text-foreground/70 hover:text-primary hover:bg-primary/5 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-border flex flex-col gap-2">
                {isAuthenticated && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 self-start">
                    <Shield size={13} className="text-primary" />
                    <span className="text-xs font-semibold text-primary">
                      Signed In
                    </span>
                  </div>
                )}
                <Button
                  variant={isAuthenticated ? "outline" : "default"}
                  size="sm"
                  onClick={isAuthenticated ? signOut : signIn}
                  disabled={isInitializing || isLoggingIn}
                  data-ocid="mobile_header.auth_button"
                  className="w-full rounded-full"
                >
                  {isInitializing ? (
                    "Loading..."
                  ) : isAuthenticated ? (
                    <>
                      <LogOut size={14} className="mr-1.5" />
                      Sign Out
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
