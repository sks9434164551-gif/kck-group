import type { HomeContent } from "@/backend";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useHomeContent, useUpdateHomeContent } from "@/hooks/useContent";
import { Home, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const defaultHomeContent: HomeContent = {
  heroTitle: "KCK Group",
  heroSubtitle:
    "A diversified conglomerate driving innovation, creating opportunities, and building lasting value across multiple sectors.",
  heroBadge: "EMPOWERING GROWTH ACROSS INDUSTRIES",
  button1Label: "Explore Our Companies",
  button2Label: "About KCK",
  stat1Label: "Group Companies",
  stat1Value: "12+",
  stat2Label: "Employees",
  stat2Value: "5,000+",
  stat3Label: "Countries",
  stat3Value: "25+",
  stat4Label: "Years of Excellence",
  stat4Value: "30+",
};

export default function HomeTab() {
  const { data, isLoading } = useHomeContent();
  const update = useUpdateHomeContent();
  const [form, setForm] = useState<HomeContent>(defaultHomeContent);

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  const set = (key: keyof HomeContent, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    try {
      await update.mutateAsync(form);
      toast.success("Home content updated successfully!");
    } catch {
      toast.error("Failed to update home content.");
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-3" data-ocid="admin.home_tab.loading_state">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6" data-ocid="admin.home_tab.panel">
      <div className="flex items-center gap-3 pb-2 border-b border-border">
        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
          <Home size={18} className="text-primary" />
        </div>
        <div>
          <h3 className="font-semibold font-display text-foreground">
            Home Section
          </h3>
          <p className="text-muted-foreground text-xs">
            Edit hero content and statistics shown on the homepage
          </p>
        </div>
      </div>

      <div className="grid gap-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="heroTitle">Hero Title</Label>
            <Input
              id="heroTitle"
              value={form.heroTitle}
              onChange={(e) => set("heroTitle", e.target.value)}
              data-ocid="admin.home.hero_title.input"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="heroBadge">Badge Text</Label>
            <Input
              id="heroBadge"
              value={form.heroBadge}
              onChange={(e) => set("heroBadge", e.target.value)}
              data-ocid="admin.home.hero_badge.input"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
          <Textarea
            id="heroSubtitle"
            value={form.heroSubtitle}
            onChange={(e) => set("heroSubtitle", e.target.value)}
            rows={3}
            data-ocid="admin.home.hero_subtitle.textarea"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="button1Label">Primary Button Label</Label>
            <Input
              id="button1Label"
              value={form.button1Label}
              onChange={(e) => set("button1Label", e.target.value)}
              data-ocid="admin.home.button1.input"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="button2Label">Secondary Button Label</Label>
            <Input
              id="button2Label"
              value={form.button2Label}
              onChange={(e) => set("button2Label", e.target.value)}
              data-ocid="admin.home.button2.input"
            />
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-foreground mb-3">
            Statistics Cards
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {([1, 2, 3, 4] as const).map((n) => {
              const labelKey = `stat${n}Label` as keyof HomeContent;
              const valueKey = `stat${n}Value` as keyof HomeContent;
              return (
                <div key={n} className="bg-muted/30 rounded-lg p-3 space-y-2">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Stat {n}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label htmlFor={`stat${n}value`} className="text-xs">
                        Value
                      </Label>
                      <Input
                        id={`stat${n}value`}
                        value={form[valueKey]}
                        onChange={(e) => set(valueKey, e.target.value)}
                        className="h-8 text-sm"
                        data-ocid={`admin.home.stat${n}_value.input`}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor={`stat${n}label`} className="text-xs">
                        Label
                      </Label>
                      <Input
                        id={`stat${n}label`}
                        value={form[labelKey]}
                        onChange={(e) => set(labelKey, e.target.value)}
                        className="h-8 text-sm"
                        data-ocid={`admin.home.stat${n}_label.input`}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <Button
          onClick={handleSave}
          disabled={update.isPending}
          data-ocid="admin.home.save_button"
        >
          <Save size={15} className="mr-1.5" />
          {update.isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
