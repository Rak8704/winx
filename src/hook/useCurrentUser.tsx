"use client";

import { useSession } from "next-auth/react";

// Define User type with optional properties
interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;           // <-- add phone
  playerId?: string;        // <-- add playerId
  gameXAPlayerId?: string;  // <-- add GameXA player ID
}

const useCurrentUser = (): User | undefined => {
  const session = useSession();

  // Type assertion to tell TS that session.data.user conforms to User
  return session.data?.user as User | undefined;
};

export default useCurrentUser;
