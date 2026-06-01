import type { Company, CompanyInput } from "@/backend";
import { ExternalBlob } from "@/backend";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAddCompany, useUpdateCompany } from "@/hooks/useCompanies";
import { Pencil, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  mode: "add" | "edit";
  company?: Company;
  "data-ocid"?: string;
}

export default function CompanyFormDialog({
  mode,
  company,
  "data-ocid": ocid,
}: Props) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: company?.name ?? "",
    industry: company?.industry ?? "",
    description: company?.description ?? "",
    websiteUrl: company?.websiteUrl ?? "",
    employees: company?.employees?.toString() ?? "0",
    countries: company?.countries?.toString() ?? "0",
    yearsActive: company?.yearsActive?.toString() ?? "0",
    isActive: company?.isActive ?? true,
  });
  const [logoBlob, setLogoBlob] = useState<ExternalBlob | null>(
    company?.logoUrl ?? null,
  );
  const [logoFileName, setLogoFileName] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const addCompany = useAddCompany();
  const updateCompany = useUpdateCompany();
  const isPending = addCompany.isPending || updateCompany.isPending;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoFileName(file.name);
    setUploadProgress(0);
    const bytes = new Uint8Array(await file.arrayBuffer());
    const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
      setUploadProgress(pct);
    });
    setLogoBlob(blob);
    setUploadProgress(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const input: CompanyInput = {
      name: form.name,
      industry: form.industry,
      description: form.description,
      websiteUrl: form.websiteUrl,
      employees: BigInt(Number(form.employees) || 0),
      countries: BigInt(Number(form.countries) || 0),
      yearsActive: BigInt(Number(form.yearsActive) || 0),
      isActive: form.isActive,
      logoUrl: logoBlob ?? ExternalBlob.fromURL("https://placehold.co/100x100"),
    };
    try {
      if (mode === "add") {
        await addCompany.mutateAsync(input);
        toast.success("Company added successfully");
      } else if (company) {
        await updateCompany.mutateAsync({ id: company.id, input });
        toast.success("Company updated successfully");
      }
      setOpen(false);
    } catch {
      toast.error(`Failed to ${mode === "add" ? "add" : "update"} company`);
    }
  };

  const update =
    (key: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={mode === "add" ? "default" : "ghost"}
          size={mode === "add" ? "sm" : "icon"}
          data-ocid={
            ocid ??
            (mode === "edit"
              ? "admin.company.edit_button"
              : "admin.add_company.open_modal_button")
          }
          className={
            mode === "add"
              ? "rounded-lg"
              : "h-8 w-8 text-muted-foreground hover:text-primary"
          }
        >
          {mode === "add" ? (
            <>
              <Plus size={16} className="mr-1.5" />
              Add Company
            </>
          ) : (
            <Pencil size={15} />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg" data-ocid="admin.company_form.dialog">
        <DialogHeader>
          <DialogTitle className="font-display">
            {mode === "add" ? "Add New Company" : `Edit ${company?.name}`}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Company Name</Label>
              <Input
                id="name"
                value={form.name}
                onChange={update("name")}
                required
                data-ocid="admin.company_form.name.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                value={form.industry}
                onChange={update("industry")}
                required
                data-ocid="admin.company_form.industry.input"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={form.description}
              onChange={update("description")}
              rows={3}
              data-ocid="admin.company_form.description.textarea"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="websiteUrl">Website URL</Label>
            <Input
              id="websiteUrl"
              value={form.websiteUrl}
              onChange={update("websiteUrl")}
              placeholder="https://"
              data-ocid="admin.company_form.website.input"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="logoFile">Company Logo</Label>
            <div className="flex items-center gap-3">
              {logoBlob && (
                <img
                  src={logoBlob.getDirectURL()}
                  alt="Logo preview"
                  className="w-10 h-10 rounded-lg object-cover border border-border flex-shrink-0"
                />
              )}
              <div className="flex-1">
                <input
                  id="logoFile"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  data-ocid="admin.company_form.logo.upload_button"
                  className="block w-full text-sm text-muted-foreground file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                />
                {logoFileName && uploadProgress === null && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {logoFileName} — ready to upload
                  </p>
                )}
                {uploadProgress !== null && (
                  <div className="mt-1.5">
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-200 rounded-full"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Uploading… {uploadProgress}%
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="employees">Employees</Label>
              <Input
                id="employees"
                type="number"
                value={form.employees}
                onChange={update("employees")}
                data-ocid="admin.company_form.employees.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="countries">Countries</Label>
              <Input
                id="countries"
                type="number"
                value={form.countries}
                onChange={update("countries")}
                data-ocid="admin.company_form.countries.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="yearsActive">Years Active</Label>
              <Input
                id="yearsActive"
                type="number"
                value={form.yearsActive}
                onChange={update("yearsActive")}
                data-ocid="admin.company_form.years.input"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              disabled={isPending}
              data-ocid="admin.company_form.submit_button"
              className="flex-1"
            >
              {isPending
                ? "Saving..."
                : mode === "add"
                  ? "Add Company"
                  : "Save Changes"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              data-ocid="admin.company_form.cancel_button"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
