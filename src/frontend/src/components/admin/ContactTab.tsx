import type { ContactInfo } from "@/backend";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useContactInfo, useUpdateContactInfo } from "@/hooks/useContent";
import { Mail, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const defaultContact: ContactInfo = {
  address: "",
  phone: "",
  email: "",
  mapUrl: "",
  linkedinUrl: "",
  twitterUrl: "",
  facebookUrl: "",
};

const fields: {
  key: keyof ContactInfo;
  label: string;
  placeholder: string;
}[] = [
  {
    key: "address",
    label: "Office Address",
    placeholder: "123 Business Tower, City",
  },
  {
    key: "phone",
    label: "Phone Number",
    placeholder: "+1 (555) 000-0000",
  },
  {
    key: "email",
    label: "Email Address",
    placeholder: "contact@kckgroup.com",
  },
  {
    key: "mapUrl",
    label: "Google Maps URL",
    placeholder: "https://maps.google.com/...",
  },
  {
    key: "linkedinUrl",
    label: "LinkedIn URL",
    placeholder: "https://linkedin.com/company/kckgroup",
  },
  {
    key: "twitterUrl",
    label: "Twitter / X URL",
    placeholder: "https://twitter.com/kckgroup",
  },
  {
    key: "facebookUrl",
    label: "Facebook URL",
    placeholder: "https://facebook.com/kckgroup",
  },
];

export default function ContactTab() {
  const { data, isLoading } = useContactInfo();
  const update = useUpdateContactInfo();
  const [form, setForm] = useState<ContactInfo>(defaultContact);

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  const set = (key: keyof ContactInfo, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    try {
      await update.mutateAsync(form);
      toast.success("Contact info updated successfully!");
    } catch {
      toast.error("Failed to update contact info.");
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-3" data-ocid="admin.contact_tab.loading_state">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6" data-ocid="admin.contact_tab.panel">
      <div className="flex items-center gap-3 pb-2 border-b border-border">
        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
          <Mail size={18} className="text-primary" />
        </div>
        <div>
          <h3 className="font-semibold font-display text-foreground">
            Contact Information
          </h3>
          <p className="text-muted-foreground text-xs">
            Update company contact details and social media links
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {fields.map(({ key, label, placeholder }) => (
          <div key={key} className="space-y-1.5">
            <Label htmlFor={key}>{label}</Label>
            <Input
              id={key}
              value={form[key]}
              onChange={(e) => set(key, e.target.value)}
              placeholder={placeholder}
              data-ocid={`admin.contact.${key}.input`}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-2">
        <Button
          onClick={handleSave}
          disabled={update.isPending}
          data-ocid="admin.contact.save_button"
        >
          <Save size={15} className="mr-1.5" />
          {update.isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
