import AboutTab from "@/components/admin/AboutTab";
import CompanyFormDialog from "@/components/admin/CompanyFormDialog";
import ContactTab from "@/components/admin/ContactTab";
import HomeTab from "@/components/admin/HomeTab";
import ProfileTab from "@/components/admin/ProfileTab";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useIsAdmin } from "@/hooks/useAuth";
import {
  useAnalytics,
  useCompanies,
  useContactSubmissions,
  useDeleteCompany,
} from "@/hooks/useCompanies";
import {
  BarChart3,
  Building2,
  Home,
  Info,
  LogOut,
  Mail,
  MessageSquare,
  Shield,
  Trash2,
  User,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import type React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function AdminPage() {
  const navigate = useNavigate();
  const { isAuthenticated, isInitializing, signOut } = useAuth();
  const { data: isAdmin, isLoading: adminLoading } = useIsAdmin();
  const { data: companies = [], isLoading: companiesLoading } = useCompanies();
  const { data: analytics } = useAnalytics();
  const { data: contacts = [] } = useContactSubmissions();
  const deleteCompany = useDeleteCompany();
  const [activeTab, setActiveTab] = useState<
    "home" | "about" | "companies" | "contact" | "profile" | "messages"
  >("home");

  useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, isInitializing, navigate]);

  if (isInitializing || adminLoading) {
    return (
      <div
        className="flex items-center justify-center min-h-[60vh]"
        data-ocid="admin.loading_state"
      >
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground text-sm">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  if (!isAdmin && !adminLoading) {
    return (
      <div
        className="flex items-center justify-center min-h-[60vh]"
        data-ocid="admin.error_state"
      >
        <div className="text-center space-y-4 max-w-md mx-auto px-4">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
            <Shield size={28} className="text-destructive" />
          </div>
          <h2 className="text-xl font-bold font-display">Access Denied</h2>
          <p className="text-muted-foreground text-sm">
            You need admin privileges to access this dashboard. The first user
            to sign in becomes admin.
          </p>
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            data-ocid="admin.go_home_button"
          >
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  const handleDelete = async (id: bigint) => {
    try {
      await deleteCompany.mutateAsync(id);
      toast.success("Company deleted successfully");
    } catch {
      toast.error("Failed to delete company");
    }
  };

  const statCards = [
    {
      label: "Total Companies",
      value: analytics?.companyCount?.toString() ?? companies.length.toString(),
      icon: Building2,
      color: "text-primary",
    },
    {
      label: "Total Employees",
      value: analytics?.totalEmployees
        ? `${(Number(analytics.totalEmployees) / 1000).toFixed(1)}K+`
        : "—",
      icon: Users,
      color: "text-secondary",
    },
    {
      label: "Countries",
      value: analytics?.totalCountries?.toString() ?? "—",
      icon: BarChart3,
      color: "text-accent",
    },
    {
      label: "Messages",
      value: contacts.length.toString(),
      icon: MessageSquare,
      color: "text-primary",
    },
  ];

  const tabs: {
    id: typeof activeTab;
    label: string;
    icon: React.ElementType;
  }[] = [
    { id: "home", label: "Home", icon: Home },
    { id: "about", label: "About", icon: Info },
    { id: "companies", label: "Companies", icon: Building2 },
    { id: "contact", label: "Contact", icon: Mail },
    { id: "profile", label: "Profile", icon: User },
    { id: "messages", label: "Messages", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Admin header */}
      <div className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div>
            <h1
              className="text-2xl font-bold font-display"
              data-ocid="admin.page"
            >
              Admin Dashboard
            </h1>
            <p className="text-primary-foreground/70 text-sm mt-0.5">
              KCK Group Management Portal
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={signOut}
            data-ocid="admin.signout_button"
            className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
          >
            <LogOut size={14} className="mr-1.5" /> Sign Out
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Stat cards */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          data-ocid="admin.analytics.panel"
        >
          {statCards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-card rounded-xl border border-border p-5 shadow-xs"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-muted-foreground text-sm font-medium">
                  {card.label}
                </p>
                <card.icon size={18} className={card.color} />
              </div>
              <p className="text-3xl font-bold font-display text-foreground">
                {card.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Tabbed management panel */}
        <div className="bg-card rounded-xl border border-border shadow-xs overflow-hidden">
          {/* Tab navigation */}
          <div
            className="border-b border-border overflow-x-auto"
            data-ocid="admin.tabs.panel"
          >
            <div className="flex min-w-max">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    data-ocid={`admin.tab.${tab.id}`}
                    className={`flex items-center gap-2 px-4 py-3.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                      isActive
                        ? "border-primary text-primary bg-primary/5"
                        : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/40"
                    }`}
                  >
                    <Icon size={15} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab content */}
          <div className="p-6">
            {activeTab === "home" && <HomeTab />}
            {activeTab === "about" && <AboutTab />}
            {activeTab === "contact" && <ContactTab />}
            {activeTab === "profile" && <ProfileTab />}

            {activeTab === "companies" && (
              <div className="space-y-4" data-ocid="admin.companies_tab.panel">
                <div className="flex items-center gap-3 pb-2 border-b border-border">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Building2 size={18} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold font-display text-foreground">
                      Companies
                    </h3>
                    <p className="text-muted-foreground text-xs">
                      Manage portfolio company listings
                    </p>
                  </div>
                  <CompanyFormDialog
                    mode="add"
                    data-ocid="admin.add_company.open_modal_button"
                  />
                </div>

                {companiesLoading ? (
                  <div
                    className="space-y-3"
                    data-ocid="admin.companies.loading_state"
                  >
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-16 w-full" />
                    ))}
                  </div>
                ) : companies.length === 0 ? (
                  <div
                    className="py-12 text-center"
                    data-ocid="admin.companies.empty_state"
                  >
                    <Building2
                      size={36}
                      className="text-muted-foreground/40 mx-auto mb-3"
                    />
                    <p className="text-muted-foreground text-sm">
                      No companies yet. Add your first company above.
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-border border border-border rounded-lg overflow-hidden">
                    {companies.map((company, idx) => (
                      <motion.div
                        key={company.id.toString()}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: idx * 0.04 }}
                        className="p-4 flex items-center gap-4"
                        data-ocid={`admin.company.item.${idx + 1}`}
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                          <Building2 size={18} className="text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-foreground truncate">
                            {company.name}
                          </p>
                          <p className="text-muted-foreground text-xs mt-0.5">
                            {company.industry}
                          </p>
                        </div>
                        <Badge
                          variant="secondary"
                          className="hidden sm:inline-flex"
                        >
                          {company.isActive ? "Active" : "Inactive"}
                        </Badge>
                        <div className="flex items-center gap-2">
                          <CompanyFormDialog mode="edit" company={company} />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(company.id)}
                            disabled={deleteCompany.isPending}
                            data-ocid={`admin.company.delete_button.${idx + 1}`}
                            className="text-destructive hover:bg-destructive/10 h-8 w-8"
                          >
                            <Trash2 size={15} />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "messages" && (
              <div className="space-y-4" data-ocid="admin.messages_tab.panel">
                <div className="flex items-center gap-3 pb-2 border-b border-border">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MessageSquare size={18} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold font-display text-foreground">
                      Contact Messages
                    </h3>
                    <p className="text-muted-foreground text-xs">
                      {contacts.length} message
                      {contacts.length !== 1 ? "s" : ""} received
                    </p>
                  </div>
                </div>

                {contacts.length === 0 ? (
                  <div
                    className="py-12 text-center"
                    data-ocid="admin.contacts.empty_state"
                  >
                    <MessageSquare
                      size={36}
                      className="text-muted-foreground/40 mx-auto mb-3"
                    />
                    <p className="text-muted-foreground text-sm">
                      No messages yet.
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-border border border-border rounded-lg overflow-hidden">
                    {contacts.map((msg, idx) => (
                      <div
                        key={msg.id.toString()}
                        className="p-4"
                        data-ocid={`admin.contact.item.${idx + 1}`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <p className="font-semibold text-sm text-foreground">
                              {msg.name}
                            </p>
                            <p className="text-muted-foreground text-xs">
                              {msg.email} • {msg.phone}
                            </p>
                            <p className="text-foreground/80 text-sm mt-1.5 leading-relaxed">
                              {msg.message}
                            </p>
                          </div>
                          <p className="text-muted-foreground text-xs flex-shrink-0">
                            {new Date(
                              Number(msg.submittedAt) / 1_000_000,
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
