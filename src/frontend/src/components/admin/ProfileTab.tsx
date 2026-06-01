import { ExternalBlob } from "@/backend";
import type { AdminProfile } from "@/backend";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { useAdminProfile, useUpsertAdminProfile } from "@/hooks/useContent";
import { ImagePlus, Save, Shield, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const emptyProfile: AdminProfile = {
  principalId: "",
  name: "",
  bio: "",
  photoUrl: "",
  role: "Administrator",
  joinedAt: BigInt(0),
};

export default function ProfileTab() {
  const { data, isLoading } = useAdminProfile();
  const upsert = useUpsertAdminProfile();
  const { identity } = useAuth();
  const principalId = identity?.getPrincipal().toText() ?? "";
  const [form, setForm] = useState<AdminProfile>(emptyProfile);
  const [photoUploadProgress, setPhotoUploadProgress] = useState<number | null>(
    null,
  );
  const photoFileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (data) {
      setForm(data);
    } else if (principalId) {
      setForm((p) => ({ ...p, principalId }));
    }
  }, [data, principalId]);

  const set = (key: keyof AdminProfile, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoUploadProgress(0);
    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const blob = await ExternalBlob.fromBytes(bytes).withUploadProgress(
        (pct) => {
          setPhotoUploadProgress(pct);
        },
      );
      const url = blob.getDirectURL();
      set("photoUrl", url);
      upsert.mutateAsync({ ...form, photoUrl: url }).catch(console.error);
    } catch {
      toast.error("Failed to upload photo.");
    } finally {
      setPhotoUploadProgress(null);
    }
  };

  const handleSave = async () => {
    try {
      await upsert.mutateAsync({ ...form, principalId });
      toast.success("Profile updated successfully!");
    } catch {
      toast.error("Failed to update profile.");
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-3" data-ocid="admin.profile_tab.loading_state">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6" data-ocid="admin.profile_tab.panel">
      <div className="flex items-center gap-3 pb-2 border-b border-border">
        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
          <User size={18} className="text-primary" />
        </div>
        <div>
          <h3 className="font-semibold font-display text-foreground">
            Admin Profile
          </h3>
          <p className="text-muted-foreground text-xs">
            Manage your administrator profile information
          </p>
        </div>
      </div>

      {/* Principal ID - read only */}
      <div className="bg-muted/30 rounded-lg p-4 flex items-start gap-3">
        <Shield size={16} className="text-primary mt-0.5 flex-shrink-0" />
        <div className="min-w-0">
          <p className="text-xs font-medium text-muted-foreground mb-0.5">
            Your Principal ID (read-only)
          </p>
          <p
            className="text-sm text-foreground font-mono break-all"
            data-ocid="admin.profile.principal_id"
          >
            {principalId || "Not authenticated"}
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="profileName">Display Name</Label>
          <Input
            id="profileName"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="KCK Admin"
            data-ocid="admin.profile.name.input"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="profileRole">Role Title</Label>
          <Input
            id="profileRole"
            value={form.role}
            onChange={(e) => set("role", e.target.value)}
            placeholder="Administrator"
            data-ocid="admin.profile.role.input"
          />
        </div>
      </div>

      {/* Profile Photo Upload */}
      <div className="space-y-2">
        <Label>Profile Photo</Label>
        <div className="flex items-center gap-4">
          {form.photoUrl && form.photoUrl.trim() !== "" ? (
            <img
              src={form.photoUrl}
              alt="Profile preview"
              className="w-16 h-16 rounded-full object-cover border-2 border-border flex-shrink-0"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center border-2 border-dashed border-border flex-shrink-0">
              <User size={24} className="text-muted-foreground" />
            </div>
          )}
          <div className="flex-1">
            <input
              ref={photoFileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
              data-ocid="admin.profile.photo.upload_button"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-1.5"
              disabled={photoUploadProgress !== null}
              onClick={() => photoFileRef.current?.click()}
              data-ocid="admin.profile.photo.upload_button"
            >
              <ImagePlus size={15} />
              {photoUploadProgress !== null
                ? `Uploading… ${photoUploadProgress}%`
                : form.photoUrl && form.photoUrl.trim() !== ""
                  ? "Change Photo"
                  : "Upload Photo"}
            </Button>
            {photoUploadProgress !== null && (
              <div className="mt-2">
                <div className="h-1.5 w-full max-w-xs bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-200 rounded-full"
                    style={{ width: `${photoUploadProgress}%` }}
                  />
                </div>
              </div>
            )}
            {form.photoUrl && form.photoUrl.trim() !== "" && (
              <button
                type="button"
                onClick={() => set("photoUrl", "")}
                className="text-xs text-destructive/70 hover:text-destructive mt-1.5 underline block"
              >
                Remove photo
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="profileBio">Bio</Label>
        <Textarea
          id="profileBio"
          value={form.bio}
          onChange={(e) => set("bio", e.target.value)}
          rows={4}
          placeholder="Brief description about the administrator..."
          data-ocid="admin.profile.bio.textarea"
        />
      </div>

      <div className="flex justify-end pt-2">
        <Button
          onClick={handleSave}
          disabled={upsert.isPending || photoUploadProgress !== null}
          data-ocid="admin.profile.save_button"
        >
          <Save size={15} className="mr-1.5" />
          {upsert.isPending ? "Saving..." : "Save Profile"}
        </Button>
      </div>
    </div>
  );
}
