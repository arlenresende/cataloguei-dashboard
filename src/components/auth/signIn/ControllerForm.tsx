import { useLogin } from "@/hooks/useLogin";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().min(1, "E-mail é obrigatório").check(z.email("E-mail inválido")),
  password: z.string().min(1, { message: "Senha é obrigatória" }),
});

type FormData = z.infer<typeof schema>;

export function useSignInController() {
  const loginMutation = useLogin();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    await loginMutation.mutateAsync(data);
  };

  return {
    form,
    isPending: loginMutation.isPending,
    onSubmit,
  };
}