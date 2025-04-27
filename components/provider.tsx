"use client";

import { SessionProvider } from "next-auth/react";

const Provider: typeof SessionProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Provider;
