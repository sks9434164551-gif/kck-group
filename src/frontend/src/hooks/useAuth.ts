import { createActor } from "@/backend";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

export function useAuth() {
  const {
    login,
    clear,
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    identity,
  } = useInternetIdentity();
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  const registeredRef = useRef(false);

  // Auto-register user on first successful login — fire-and-forget
  useEffect(() => {
    if (isAuthenticated && actor && !registeredRef.current) {
      registeredRef.current = true;
      actor.registerUser().catch(() => {
        // silent: registration errors must not interrupt the login flow
      });
    }
    if (!isAuthenticated) {
      registeredRef.current = false;
    }
  }, [isAuthenticated, actor]);

  const signIn = () => {
    login();
  };

  const signOut = () => {
    clear();
    queryClient.clear();
  };

  return {
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    identity,
    principal: identity?.getPrincipal(),
    signIn,
    signOut,
  };
}

export function useIsAdmin() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const { isAuthenticated } = useInternetIdentity();

  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !actorFetching && isAuthenticated,
    staleTime: 5 * 60 * 1000,
  });
}
