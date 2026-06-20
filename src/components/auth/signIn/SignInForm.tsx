import { useState } from "react";
import { Link } from "react-router-dom";
import { EyeCloseIcon, EyeIcon } from "../../../icons";

import Label from "../../form/Label";
import Input from "../../form/input/InputField";
import Checkbox from "../../form/input/Checkbox";
import Button from "../../ui/button/Button";
import { useSignInController } from "./ControllerForm";


export default function SignInForm() {
  const { form, isPending, onSubmit } = useSignInController();

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

        {/* EMAIL */}
        <div>
          <Label>
            Email <span className="text-error-500">*</span>
          </Label>

          <Input
            placeholder="info@gmail.com"
            type="email"
            {...register("email")}
          />

          {errors.email && (
            <p className="text-xs text-error-500 mt-1">
              {errors.email.message as string}
            </p>
          )}
        </div>

       
        <div>
          <Label>
            Password <span className="text-error-500">*</span>
          </Label>

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password")}
              className="pr-10"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
            >
              {showPassword ? (
                <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
              ) : (
                <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
              )}
            </span>
          </div>

          {errors.password && (
            <p className="text-xs text-error-500 mt-1">
              {errors.password.message as string}
            </p>
          )}
        </div>

       
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Checkbox
              checked={isChecked}
              onChange={setIsChecked}
            />
            <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
              Quero permanecer logado
            </span>
          </div>

          <Link
            to="/forgot-password"
            className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
          >
            Esqueci minha senha
          </Link>
        </div>

       
        <div>
          <Button
            className="w-full"
            size="sm"
            disabled={isPending}
          >
            {isPending ? "Logando..." : "Fazer Login"}
          </Button>
        </div>

      </div>
    </form>
  );
}