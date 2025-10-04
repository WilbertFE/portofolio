"use client";

import { Separator } from "@/components/ui/separator";
import { Header, Info } from "./components";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import supabase from "@/lib/db";

const formSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.email(),
  message: z.string().min(3).max(256),
});

export default function ContacePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    const { error } = await supabase.from("messages").insert({ ...values });
    if (error) {
      console.error(error);
    } else {
      form.reset({
        name: "",
        email: "",
        message: "",
      });
    }
    setIsSubmitting(false);
  };

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="p-6 space-y-4 mx-auto h-full container">
      <Header />
      <Separator className="my-4" />
      <Info />
      <Separator className="my-4" />
      <div>
        <div className="space-y-2 h-max">
          <p
            className="font-extralight leading-loose mb-4
        "
          >
            Or send a message
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormControl>
                      <Textarea placeholder="Message" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="col-span-2">
                <Button
                  disabled={isSubmitting}
                  className="w-full cursor-pointer"
                  type="submit"
                >
                  Send
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
