// Re-export all hooks from the canonical useCompanies module.
// This file is kept only to avoid breaking any legacy imports.
export {
  useCompanies as useGetCompanies,
  useAnalytics as useGetAnalytics,
  useAddCompany,
  useUpdateCompany,
  useDeleteCompany,
  useSubmitContact,
  useContactSubmissions as useGetContactSubmissions,
} from "@/hooks/useCompanies";
