import { createActor } from "@/backend";
import type {
  Analytics,
  Company,
  CompanyId,
  CompanyInput,
  ContactSubmission,
} from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useCompanies() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<Company[]>({
    queryKey: ["companies"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCompanies();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useAnalytics() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<Analytics>({
    queryKey: ["analytics"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getAnalytics();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useAddCompany() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CompanyInput) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addCompany(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
    },
  });
}

export function useUpdateCompany() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      input,
    }: { id: CompanyId; input: CompanyInput }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateCompany(id, input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
  });
}

export function useDeleteCompany() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: CompanyId) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteCompany(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
    },
  });
}

export function useSubmitContact() {
  const { actor } = useActor(createActor);

  return useMutation({
    mutationFn: async ({
      name,
      email,
      phone,
      message,
    }: { name: string; email: string; phone: string; message: string }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.submitContact(name, email, phone, message);
    },
  });
}

export function useContactSubmissions() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<ContactSubmission[]>({
    queryKey: ["contactSubmissions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getContactSubmissions();
    },
    enabled: !!actor && !actorFetching,
  });
}
