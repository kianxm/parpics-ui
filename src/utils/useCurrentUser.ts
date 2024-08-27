import { useContext, useMemo } from "react";
import { User } from "../types/user";
import { AuthContext } from "../context/context";

export function useCurrentUser(): User | null {
  const { user } = useContext(AuthContext);

  return useMemo(() => user, [user]);
}
