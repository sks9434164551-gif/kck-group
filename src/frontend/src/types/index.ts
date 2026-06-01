export type {
  Company,
  CompanyId,
  CompanyInput,
  Analytics,
  ContactSubmission,
  ContactId,
  ExternalBlob,
  HomeContent,
  AboutContent,
  ContactInfo,
  ValueItem,
  TimelineItem,
} from "@/backend";
export { UserRole } from "@/backend";

export interface NavItem {
  label: string;
  href: string;
  id?: string;
}

export interface StatCard {
  value: string;
  label: string;
}
