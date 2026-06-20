import { useRegister } from "@/hooks/useRegister";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z
  .object({
    name: z.string().min(1, { message: "Nome é obrigatório" }),
    email: z.string().min(1, "E-mail é obrigatório").check(z.email("E-mail inválido")),
    password: z.string().min(6, { message: "Senha deve ter ao menos 6 caracteres" }),
    confirmPassword: z.string().min(1, { message: "Confirme sua senha" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas não conferem",
  });

type FormData = z.infer<typeof schema>;

export function useRegisterController() {
  const registerMutation = useRegister();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    const { name, email, password } = data;
    await registerMutation.mutateAsync({ name, email, password });
  };

  return {
    form,
    isPending: registerMutation.isPending,
    onSubmit,
  };
}