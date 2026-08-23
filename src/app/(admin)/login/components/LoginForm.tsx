"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import { ArrowLeft } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(8, "At least 8 characters"),
});

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Only ever an in-app path: proxy.ts sets it from request.nextUrl.pathname,
  // but re-check so a hand-crafted ?redirect=https://evil.example can't be
  // used to bounce someone off-site after a successful login.
  const rawRedirect = searchParams.get("redirect");
  const redirectTo =
    rawRedirect && rawRedirect.startsWith("/") && !rawRedirect.startsWith("//")
      ? rawRedirect
      : "/admin";

  const isForbidden = searchParams.get("error") === "forbidden";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    const { error } = await authClient.signIn.email({
      email: values.email,
      password: values.password,
    });

    if (error) {
      // Deliberately vague: never reveal whether the address exists.
      toast.error(error.message ?? "Could not sign you in");
      setIsSubmitting(false);
      return;
    }

    toast.success("Signed in");
    router.push(redirectTo);
    router.refresh();
  };

  const signInWithGoogle = async () => {
    setIsGoogleLoading(true);
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: redirectTo,
    });
    if (error) {
      toast.error(error.message ?? "Could not sign you in with Google");
      setIsGoogleLoading(false);
    }
  };

  const busy = isSubmitting || isGoogleLoading;

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl tracking-wider">Sign in</CardTitle>
        <CardDescription>
          {isForbidden
            ? "That account does not have admin access."
            : "This area is private."}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      autoComplete="username"
                      placeholder="you@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="current-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={busy}
              className="w-full bg-my-primary py-4 text-black font-bold tracking-wider hover:bg-my-secondary"
            >
              {isSubmitting && <Spinner />}
              Sign in
            </Button>
          </form>
        </Form>

        <div className="flex items-center gap-x-3">
          <Separator className="flex-1" />
          <span className="text-muted-foreground text-xs">OR</span>
          <Separator className="flex-1" />
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full cursor-pointer"
          disabled={busy}
          onClick={signInWithGoogle}
        >
          {isGoogleLoading ? <Spinner /> : <FcGoogle />}
          Continue with Google
        </Button>

        <Button asChild variant="link" className="w-full text-muted-foreground">
          <Link href="/">
            <ArrowLeft />
            Back to the site
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
