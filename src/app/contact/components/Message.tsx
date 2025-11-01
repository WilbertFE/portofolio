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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import supabase from "@/lib/db";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.email(),
  message: z.string().min(3).max(256),
});

export default function Message() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

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
      toast.error("Something wrong");
    } else {
      form.reset({
        name: "",
        email: "",
        message: "",
      });
      toast.success("Message has been sent");
    }
    setIsSubmitting(false);
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
