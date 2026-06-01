import { createActor } from "@/backend";
import type {
  AboutContent,
  AdminProfile,
  ContactInfo,
  HomeContent,
} from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useHomeContent() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<HomeContent>({
    queryKey: ["homeContent"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getHomeContent();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useUpdateHomeContent() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: HomeContent) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateHomeContent(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["homeContent"] });
    },
  });
}

export function useAboutContent() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<AboutContent>({
    queryKey: ["aboutContent"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getAboutContent();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useUpdateAboutContent() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: AboutContent) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateAboutContent(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["aboutContent"] });
    },
  });
}

export function useContactInfo() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<ContactInfo>({
    queryKey: ["contactInfo"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getContactInfo();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useUpdateContactInfo() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: ContactInfo) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateContactInfo(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contactInfo"] });
    },
  });
}

export function useAdminProfile() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<AdminProfile | null>({
    queryKey: ["adminProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getAdminProfile();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useUpsertAdminProfile() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: AdminProfile) => {
      if (!actor) throw new Error("Actor not available");
      return actor.upsertAdminProfile(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminProfile"] });
    },
  });
}
