import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { messageSchema, type MessageInput } from "@/lib/schemas";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

export default function Message() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const form = useForm<MessageInput>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      name: "",
      message: "",
      website: "",
    },
  });

  const onSubmit = async (values: MessageInput) => {
    setIsSubmitting(true);

    try {
      // Goes through the API route rather than straight to Supabase, so the
      // same schema is enforced on the server and the anon key is not trusted
      // to write.
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        toast.error(body.error ?? "Could not send your message");
        return;
      }

      form.reset({ name: "", message: "", website: "" });
      toast.success("Message has been sent");
    } catch {
      toast.error("Could not reach the server. Check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
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
                <FormItem className="col-span-2 lg:col-span-1">
                  <FormControl>
                    <Input placeholder="Name" {...field} />
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
            {/* Honeypot: hidden from people and from screen readers, but a
                bot filling every field will trip it. aria-hidden + tabIndex
                keep it out of keyboard and assistive-tech order. */}
            <div className="hidden" aria-hidden="true">
              <Input
                {...form.register("website")}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            <div className="col-span-2">
              <Button
                disabled={isSubmitting}
                className="w-full bg-my-primary py-4 text-black cursor-pointer font-bold tracking-widest"
                type="submit"
              >
                {isSubmitting ? (
                  <div className="flex gap-x-2">
                    <Spinner className="size-4 text-blue-500" />
                    Processing…
                  </div>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
