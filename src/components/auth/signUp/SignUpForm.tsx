import { useState } from "react";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Checkbox from "@/components/form/input/Checkbox";
import Button from "@/components/ui/button/Button";
import { Eye, EyeOff } from "lucide-react";

import { useRegisterController } from "./ControllerForm";

export default function SignUpForm() {
  const { form, isPending, onSubmit } = useRegisterController();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <div>
          <Label>
            Nome <span className="text-error-500">*</span>
          </Label>

          <Input
            placeholder="Digite seu nome"
            {...register("name")}
          />

          {errors.name && (
            <p className="mt-1 text-xs text-error-500">
              {errors.name.message as string}
            </p>
          )}
        </div>

        <div>
          <Label>
            E-mail <span className="text-error-500">*</span>
          </Label>

          <Input
            type="email"
            placeholder="Digite seu e-mail"
            {...register("email")}
          />

          {errors.email && (
            <p className="mt-1 text-xs text-error-500">
              {errors.email.message as string}
            </p>
          )}
        </div>

        <div>
          <Label>
            Senha <span className="text-error-500">*</span>
          </Label>

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Digite sua senha"
              className="pr-10"
              {...register("password")}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute z-30 -translate-y-1/2 right-4 top-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {errors.password && (
            <p className="mt-1 text-xs text-error-500">
              {errors.password.message as string}
            </p>
          )}
        </div>

        <div>
          <Label>
            Confirmar senha <span className="text-error-500">*</span>
          </Label>

          <Input
            type="password"
            placeholder="Confirme sua senha"
            {...register("confirmPassword")}
          />

          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-error-500">
              {errors.confirmPassword.message as string}
            </p>
          )}
        </div>

        <div className="flex items-start gap-3">
          <Checkbox
            className="w-5 h-5"
            checked={isChecked}
            onChange={setIsChecked}
          />

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Ao criar uma conta você concorda com os{" "}
            <span className="text-gray-800 dark:text-white/90">
              Termos de Uso
            </span>{" "}
            e com a{" "}
            <span className="text-gray-800 dark:text-white">
              Política de Privacidade
            </span>
            .
          </p>
        </div>

        <Button
          className="w-full"
          size="sm"
          disabled={isPending}
        >
          {isPending ? "Criando conta..." : "Criar conta"}
        </Button>
      </div>
    </form>
  );
}