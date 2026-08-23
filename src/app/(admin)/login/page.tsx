import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "./components";

export const metadata: Metadata = {
  title: "Sign in - Wilbert Bernardi",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  );
}
