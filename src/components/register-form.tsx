"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import apiInstance from "@/services/http-service";
import { useFormStatus } from "react-dom";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Nome completo deve ter pelo menos 3 letras.",
  }),
  email: z.string().email({ message: "Por favor, insira um e-mail válido." }),
});

export function RegisterForm() {
  const [message, setMessage] = useState("");
  const { pending } = useFormStatus();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { data, status } = await apiInstance.eventMembers.register(
      values.name,
      values.email,
      new URLSearchParams(window.location.search).get("ref") || ""
    );

    if (!data || status !== 200) {
      setMessage("Erro ao registrar. Tente novamente mais tarde.");
      return;
    }

    const ref = data.referralId;
    const url = new URL(window.location.origin);
    url.searchParams.set("ref", ref);

    setMessage(
      `Parabéns, ${data.name}! Seu cadastro foi realizado com sucesso.<br/>
      Você iniciou sua jornada com ${data.points} pontos iniciais.<br/>
      Compartilhe o link de indicação:
      <a class="text-primary" href="${url.href}" target="_blank">
        <code>${url.href}</code>
      </a>`
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome completo</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
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
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="john@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" aria-disabled={pending}>
          Participar!
        </Button>
        <p
          aria-live="polite"
          className="text-xs"
          role="status"
          dangerouslySetInnerHTML={{ __html: message }}
        />
      </form>
    </Form>
  );
}
