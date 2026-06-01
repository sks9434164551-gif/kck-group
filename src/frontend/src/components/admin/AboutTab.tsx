import type { AboutContent, TimelineItem, ValueItem } from "@/backend";
import { ExternalBlob } from "@/backend";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useAboutContent, useUpdateAboutContent } from "@/hooks/useContent";
import { ImagePlus, Info, Plus, Save, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const defaultAbout: AboutContent = {
  missionText: "",
  visionText: "",
  values: [],
  timeline: [],
};

export default function AboutTab() {
  const { data, isLoading } = useAboutContent();
  const update = useUpdateAboutContent();
  const [form, setForm] = useState<AboutContent>(defaultAbout);

  useEffect(() => {
    if (data)
      setForm({
        ...data,
        timeline: data.timeline.map((t) => ({
          ...t,
          imageUrl: t.imageUrl ?? "",
        })),
      });
  }, [data]);

  const handleSave = async () => {
    try {
      await update.mutateAsync(form);
      toast.success("About content updated successfully!");
    } catch {
      toast.error("Failed to update about content.");
    }
  };

  const addValue = () =>
    setForm((p) => ({
      ...p,
      values: [
        ...p.values,
        {
          title: "",
          description: "",
          icon: "",
          imageUrl: "",
        } satisfies ValueItem,
      ],
    }));

  const updateValue = (i: number, field: keyof ValueItem, val: string) =>
    setForm((p) => {
      const updated = [...p.values];
      updated[i] = { ...updated[i], [field]: val };
      return { ...p, values: updated };
    });

  const removeValue = (i: number) =>
    setForm((p) => ({ ...p, values: p.values.filter((_, idx) => idx !== i) }));

  const [timelineUploadProgress, setTimelineUploadProgress] = useState<
    Record<number, number | null>
  >({});
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [valueUploadProgress, setValueUploadProgress] = useState<
    Record<number, number | null>
  >({});
  const valueFileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleCoreValueImageUpload = async (
    i: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setValueUploadProgress((prev) => ({ ...prev, [i]: 0 }));
    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const blob = await ExternalBlob.fromBytes(bytes).withUploadProgress(
        (pct) => {
          setValueUploadProgress((prev) => ({ ...prev, [i]: pct }));
        },
      );
      const url = blob.getDirectURL();
      setForm((p) => {
        const updated = [...p.values];
        updated[i] = { ...updated[i], imageUrl: url };
        const newForm = { ...p, values: updated };
        // Persist to backend immediately after upload
        update
          .mutateAsync(newForm)
          .catch(() => toast.error("Failed to save image to backend."));
        return newForm;
      });
    } catch {
      toast.error("Failed to upload image.");
    } finally {
      setValueUploadProgress((prev) => ({ ...prev, [i]: null }));
    }
  };

  const handleTimelinePhotoUpload = async (
    i: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setTimelineUploadProgress((prev) => ({ ...prev, [i]: 0 }));
    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const blob = await ExternalBlob.fromBytes(bytes).withUploadProgress(
        (pct) => {
          setTimelineUploadProgress((prev) => ({ ...prev, [i]: pct }));
        },
      );
      const url = blob.getDirectURL();
      setForm((p) => {
        const updated = [...p.timeline];
        updated[i] = { ...updated[i], imageUrl: url };
        const newForm = { ...p, timeline: updated };
        // Persist to backend immediately after upload
        update
          .mutateAsync(newForm)
          .catch(() => toast.error("Failed to save image to backend."));
        return newForm;
      });
    } catch {
      toast.error("Failed to upload photo.");
    } finally {
      setTimelineUploadProgress((prev) => ({ ...prev, [i]: null }));
    }
  };

  const addTimeline = () =>
    setForm((p) => ({
      ...p,
      timeline: [
        ...p.timeline,
        {
          year: "",
          title: "",
          description: "",
          imageUrl: "",
        } satisfies TimelineItem,
      ],
    }));

  const updateTimeline = (i: number, field: keyof TimelineItem, val: string) =>
    setForm((p) => {
      const updated = [...p.timeline];
      updated[i] = { ...updated[i], [field]: val };
      return { ...p, timeline: updated };
    });

  const removeTimeline = (i: number) =>
    setForm((p) => ({
      ...p,
      timeline: p.timeline.filter((_, idx) => idx !== i),
    }));

  if (isLoading) {
    return (
      <div className="space-y-3" data-ocid="admin.about_tab.loading_state">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8" data-ocid="admin.about_tab.panel">
      <div className="flex items-center gap-3 pb-2 border-b border-border">
        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
          <Info size={18} className="text-primary" />
        </div>
        <div>
          <h3 className="font-semibold font-display text-foreground">
            About Section
          </h3>
          <p className="text-muted-foreground text-xs">
            Edit mission, vision, core values and company timeline
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="missionText">Mission Statement</Label>
          <Textarea
            id="missionText"
            rows={4}
            value={form.missionText}
            onChange={(e) =>
              setForm((p) => ({ ...p, missionText: e.target.value }))
            }
            data-ocid="admin.about.mission.textarea"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="visionText">Vision Statement</Label>
          <Textarea
            id="visionText"
            rows={4}
            value={form.visionText}
            onChange={(e) =>
              setForm((p) => ({ ...p, visionText: e.target.value }))
            }
            data-ocid="admin.about.vision.textarea"
          />
        </div>
      </div>

      {/* Core Values */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-foreground">Core Values</p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addValue}
            data-ocid="admin.about.add_value.button"
          >
            <Plus size={14} className="mr-1" /> Add Value
          </Button>
        </div>
        <div className="space-y-3">
          {form.values.map((v, i) => (
            <div
              key={`value-${v.title || i}`}
              className="bg-muted/30 rounded-lg p-3 space-y-3"
              data-ocid={`admin.about.value.item.${i + 1}`}
            >
              <div className="grid sm:grid-cols-3 gap-2 items-end">
                <div className="space-y-1">
                  <Label className="text-xs">Title</Label>
                  <Input
                    value={v.title}
                    onChange={(e) => updateValue(i, "title", e.target.value)}
                    className="h-8 text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Description</Label>
                  <Input
                    value={v.description}
                    onChange={(e) =>
                      updateValue(i, "description", e.target.value)
                    }
                    className="h-8 text-sm"
                  />
                </div>
                <div className="flex gap-2 items-end justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeValue(i)}
                    className="h-8 w-8 text-destructive hover:bg-destructive/10 flex-shrink-0"
                    data-ocid={`admin.about.value.delete_button.${i + 1}`}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>

              {/* Photo upload */}
              <div className="flex items-center gap-3 pt-1 border-t border-border/50">
                {v.imageUrl && v.imageUrl.trim() !== "" && (
                  <img
                    src={v.imageUrl}
                    alt={v.title || "Value icon"}
                    className="w-10 h-10 rounded-lg object-cover border border-border flex-shrink-0"
                  />
                )}
                <div className="flex-1">
                  <input
                    ref={(el) => {
                      valueFileInputRefs.current[i] = el;
                    }}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleCoreValueImageUpload(i, e)}
                    data-ocid={`admin.about.value.upload_button.${i + 1}`}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs gap-1.5"
                    onClick={() => valueFileInputRefs.current[i]?.click()}
                  >
                    <ImagePlus size={13} />
                    {v.imageUrl && v.imageUrl.trim() !== ""
                      ? "Change Photo"
                      : "Upload Photo"}
                  </Button>
                  {valueUploadProgress[i] !== undefined &&
                    valueUploadProgress[i] !== null && (
                      <div className="mt-1.5">
                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all duration-200 rounded-full"
                            style={{ width: `${valueUploadProgress[i]}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Uploading… {valueUploadProgress[i]}%
                        </p>
                      </div>
                    )}
                  {v.imageUrl && v.imageUrl.trim() !== "" && (
                    <button
                      type="button"
                      onClick={() => updateValue(i, "imageUrl", "")}
                      className="text-xs text-destructive/70 hover:text-destructive mt-1 ml-2 underline"
                    >
                      Remove photo
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          {form.values.length === 0 && (
            <p
              className="text-muted-foreground text-sm text-center py-4 bg-muted/20 rounded-lg"
              data-ocid="admin.about.values.empty_state"
            >
              No core values yet. Click "Add Value" to add one.
            </p>
          )}
        </div>
      </div>

      {/* Timeline */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-foreground">
            Company Timeline
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addTimeline}
            data-ocid="admin.about.add_timeline.button"
          >
            <Plus size={14} className="mr-1" /> Add Event
          </Button>
        </div>
        <div className="space-y-3">
          {form.timeline.map((t, i) => (
            <div
              key={`timeline-${t.year || i}`}
              className="bg-muted/30 rounded-lg p-3 space-y-3"
              data-ocid={`admin.about.timeline.item.${i + 1}`}
            >
              <div className="grid sm:grid-cols-3 gap-2 items-end">
                <div className="space-y-1">
                  <Label className="text-xs">Year</Label>
                  <Input
                    value={t.year}
                    onChange={(e) => updateTimeline(i, "year", e.target.value)}
                    className="h-8 text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Title</Label>
                  <Input
                    value={t.title}
                    onChange={(e) => updateTimeline(i, "title", e.target.value)}
                    className="h-8 text-sm"
                  />
                </div>
                <div className="flex gap-2 items-end">
                  <div className="space-y-1 flex-1">
                    <Label className="text-xs">Description</Label>
                    <Input
                      value={t.description}
                      onChange={(e) =>
                        updateTimeline(i, "description", e.target.value)
                      }
                      className="h-8 text-sm"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeTimeline(i)}
                    className="h-8 w-8 text-destructive hover:bg-destructive/10 flex-shrink-0"
                    data-ocid={`admin.about.timeline.delete_button.${i + 1}`}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>

              {/* Photo upload */}
              <div className="flex items-center gap-3 pt-1 border-t border-border/50">
                {t.imageUrl && t.imageUrl.trim() !== "" && (
                  <img
                    src={t.imageUrl}
                    alt={t.title || "Timeline photo"}
                    className="w-14 h-14 rounded-lg object-cover border border-border flex-shrink-0"
                  />
                )}
                <div className="flex-1">
                  <input
                    ref={(el) => {
                      fileInputRefs.current[i] = el;
                    }}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleTimelinePhotoUpload(i, e)}
                    data-ocid={`admin.about.timeline.upload_button.${i + 1}`}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs gap-1.5"
                    onClick={() => fileInputRefs.current[i]?.click()}
                  >
                    <ImagePlus size={13} />
                    {t.imageUrl && t.imageUrl.trim() !== ""
                      ? "Change Photo"
                      : "Upload Photo"}
                  </Button>
                  {timelineUploadProgress[i] !== undefined &&
                    timelineUploadProgress[i] !== null && (
                      <div className="mt-1.5">
                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all duration-200 rounded-full"
                            style={{
                              width: `${timelineUploadProgress[i]}%`,
                            }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Uploading… {timelineUploadProgress[i]}%
                        </p>
                      </div>
                    )}
                  {t.imageUrl && t.imageUrl.trim() !== "" && (
                    <button
                      type="button"
                      onClick={() => updateTimeline(i, "imageUrl", "")}
                      className="text-xs text-destructive/70 hover:text-destructive mt-1 ml-2 underline"
                    >
                      Remove photo
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          {form.timeline.length === 0 && (
            <p
              className="text-muted-foreground text-sm text-center py-4 bg-muted/20 rounded-lg"
              data-ocid="admin.about.timeline.empty_state"
            >
              No timeline events yet. Click "Add Event" to add one.
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <Button
          onClick={handleSave}
          disabled={update.isPending}
          data-ocid="admin.about.save_button"
        >
          <Save size={15} className="mr-1.5" />
          {update.isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
