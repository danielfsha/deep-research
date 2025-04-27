To setup auth
Worked with a specific version of prisma and next-auth

```bash
yarn add next-auth@beta @auth/prisma-adapter

@prisma@5.15.1 @prisma/client@5.15.1

```

```typescript
// @/app/page.tsx
"use client";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();

  if (session?.user?.role === "admin") {
    return <p>You are an admin, welcome!</p>;
  }

  return <p>You are not authorized to view this page!</p>;
}
```

```typescript
// @/app/layout.tsx
import { SessionProvider } from "next-auth/react"

export default function Layout() {
  ...
  return (
    <SessionProvider>
    {...}
    </SessionProvider>
  )
}
```

```typescript
// ./prisma.ts

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

```typescript
// ./auth.ts

import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [GitHub, Google],
});
```

```typescript
// app/api/auth/[...nextauth]/route.ts

import { handlers } from "@/auth";
export const { GET, POST } = handlers;
```

```typescript
// ./middleware.ts
export { auth as middleware } from "@/auth";
```
