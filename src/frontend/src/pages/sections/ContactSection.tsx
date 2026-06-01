import { createActor } from "@/backend";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitContact } from "@/hooks/useCompanies";
import type { ContactInfo } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import {
  CheckCircle2,
  Facebook,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitter,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

function ContactInfoSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-52 rounded-2xl" />
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-16 rounded-xl" />
      ))}
    </div>
  );
}

export default function ContactSection() {
  const { actor, isFetching } = useActor(createActor);
  const { data: contactInfo, isLoading } = useQuery<ContactInfo>({
    queryKey: ["contactInfo"],
    queryFn: async () => {
      if (!actor) return {} as ContactInfo;
      return actor.getContactInfo();
    },
    enabled: !!actor && !isFetching,
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const submitContact = useSubmitContact();

  const update =
    (k: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitContact.mutateAsync(form);
      setSubmitted(true);
    } catch {
      // Still show success per spec
      setSubmitted(true);
    }
  };

  return (
    <section
      id="contact"
      className="py-24 bg-muted/30"
      data-ocid="contact.section"
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
            Get In Touch
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold font-display text-foreground mb-4">
            Contact Us
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Have a business enquiry? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            {isLoading || !contactInfo ? (
              <ContactInfoSkeleton />
            ) : (
              <>
                {/* Map placeholder / iframe */}
                <div
                  className="rounded-2xl overflow-hidden border border-border h-52 flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.28 0.20 264) 0%, oklch(0.18 0.12 264) 100%)",
                  }}
                  data-ocid="contact.map"
                >
                  {contactInfo.mapUrl ? (
                    <iframe
                      src={contactInfo.mapUrl}
                      title="Map"
                      className="w-full h-full border-0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  ) : (
                    <div className="text-center">
                      <MapPin size={32} className="text-accent mx-auto mb-2" />
                      <p
                        className="text-sm font-medium"
                        style={{ color: "oklch(0.85 0.08 264)" }}
                      >
                        {contactInfo.address.split("\n")[0] ?? "Our Location"}
                      </p>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="space-y-4">
                  {[
                    {
                      icon: MapPin,
                      label: "Address",
                      value: contactInfo.address,
                    },
                    { icon: Phone, label: "Phone", value: contactInfo.phone },
                    { icon: Mail, label: "Email", value: contactInfo.email },
                  ].map(({ icon: Icon, label, value }) => (
                    <div
                      key={label}
                      className="flex items-start gap-4 bg-card border border-border rounded-xl p-4"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">
                          {label}
                        </p>
                        <p className="text-sm text-foreground font-medium whitespace-pre-line">
                          {value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social links */}
                {(contactInfo.linkedinUrl ||
                  contactInfo.twitterUrl ||
                  contactInfo.facebookUrl) && (
                  <div className="flex gap-3">
                    {contactInfo.linkedinUrl && (
                      <a
                        href={contactInfo.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-200"
                        data-ocid="contact.linkedin_link"
                      >
                        <Linkedin size={18} />
                      </a>
                    )}
                    {contactInfo.twitterUrl && (
                      <a
                        href={contactInfo.twitterUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Twitter / X"
                        className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-200"
                        data-ocid="contact.twitter_link"
                      >
                        <Twitter size={18} />
                      </a>
                    )}
                    {contactInfo.facebookUrl && (
                      <a
                        href={contactInfo.facebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                        className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-200"
                        data-ocid="contact.facebook_link"
                      >
                        <Facebook size={18} />
                      </a>
                    )}
                  </div>
                )}
              </>
            )}
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="bg-card border border-border rounded-2xl p-8 shadow-xs">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                  data-ocid="contact.form.success_state"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-bold font-display text-foreground mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-muted-foreground">
                    Thank you for reaching out. Our team will get back to you
                    within 24 hours.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-6"
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: "", email: "", phone: "", message: "" });
                    }}
                    data-ocid="contact.form.send_another_button"
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  data-ocid="contact.form"
                >
                  <h3 className="text-lg font-bold font-display text-foreground mb-2">
                    Send a Message
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <Label htmlFor="contact-name">Full Name</Label>
                      <Input
                        id="contact-name"
                        placeholder="John Smith"
                        value={form.name}
                        onChange={update("name")}
                        required
                        data-ocid="contact.form.name.input"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="contact-email">Email Address</Label>
                      <Input
                        id="contact-email"
                        type="email"
                        placeholder="john@company.com"
                        value={form.email}
                        onChange={update("email")}
                        required
                        data-ocid="contact.form.email.input"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="contact-phone">Phone Number</Label>
                    <div className="flex items-center">
                      <span className="inline-flex items-center gap-1 h-10 px-3 rounded-l-md border border-r-0 border-input bg-muted text-sm font-medium text-foreground select-none flex-shrink-0">
                        🇮🇳 +91
                      </span>
                      <Input
                        id="contact-phone"
                        type="tel"
                        placeholder="98765 43210"
                        value={form.phone}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            phone: e.target.value
                              ? `+91 ${e.target.value.replace(/^\+91\s*/, "")}`
                              : "",
                          }))
                        }
                        className="rounded-l-none"
                        data-ocid="contact.form.phone.input"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="contact-message">Message</Label>
                    <Textarea
                      id="contact-message"
                      placeholder="Tell us about your business enquiry..."
                      value={form.message}
                      onChange={update("message")}
                      required
                      rows={5}
                      data-ocid="contact.form.message.textarea"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={submitContact.isPending}
                    data-ocid="contact.form.submit_button"
                    className="w-full rounded-xl font-semibold"
                  >
                    {submitContact.isPending ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send size={16} className="mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
