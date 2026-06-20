import { useModal } from "@/hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { useProfileFormController } from "./controller";
import { Controller } from "react-hook-form";

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length > 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  } else if (digits.length > 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  } else if (digits.length > 2) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  } else if (digits.length > 0) {
    return `(${digits}`;
  }
  return "";
}

function formatDocument(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 14);
  if (digits.length <= 11) {
    // CPF: 000.000.000-00
    if (digits.length > 9) {
      return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9, 11)}`;
    } else if (digits.length > 6) {
      return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
    } else if (digits.length > 3) {
      return `${digits.slice(0, 3)}.${digits.slice(3)}`;
    }
    return digits;
  } else {
    // CNPJ: 00.000.000/0000-00
    return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12, 14)}`;
  }
}

export default function ProfileForm() {
  const { isOpen, openModal, closeModal } = useModal();
  const { form, isPending, onSubmit, onReset } = useProfileFormController();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const today = new Date().toISOString().split("T")[0];

  const handleCancel = () => {
    onReset();
    closeModal();
  };

  const handleFormSubmit = async (data: any) => {
    console.log('📝 handleFormSubmit - Dados recebidos do form:', data);
    console.log('📝 Valores do form.getValues():', form.getValues());
    const success = await onSubmit(data);
    if (success) {
      closeModal();
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="px-4 py-2 rounded-full border"
      >
        Editar
      </button>

      <Modal isOpen={isOpen} onClose={handleCancel} className="max-w-[700px] m-4">
        <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl">
          <h4 className="text-xl font-semibold mb-4">
            Editar informações
          </h4>

          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="col-span-2 lg:col-span-1">
                <Label>
                  Nome <span className="text-error-500">*</span>
                </Label>
                <Input
                  placeholder="Digite seu nome"
                  {...register("name")}
                  error={!!errors.name}
                />
                {errors.name && (
                  <p className="text-xs text-error-500 mt-1">
                    {errors.name.message as string}
                  </p>
                )}
              </div>

              <div className="col-span-2 lg:col-span-1">
                <Label>
                  E-mail <span className="text-error-500">*</span>
                </Label>
                <Input
                  type="email"
                  placeholder="Digite seu e-mail"
                  {...register("email")}
                  error={!!errors.email}
                />
                {errors.email && (
                  <p className="text-xs text-error-500 mt-1">
                    {errors.email.message as string}
                  </p>
                )}
              </div>

              <div className="col-span-2 lg:col-span-1">
                <Label>Telefone</Label>
                <Controller
                  control={form.control}
                  name="cellPhone"
                  render={({ field }) => (
                    <Input
                      type="tel"
                      placeholder="(11) 99999-9999"
                      value={field.value as string}
                      onChange={(e) => field.onChange(formatPhone(e.target.value))}
                      ref={field.ref}
                    />
                  )}
                />
              </div>

              <div className="col-span-2 lg:col-span-1">
                <Label>Documento</Label>
                <Controller
                  control={form.control}
                  name="document"
                  render={({ field }) => (
                    <Input
                      placeholder="CPF ou CNPJ"
                      value={field.value as string}
                      onChange={(e) => field.onChange(formatDocument(e.target.value))}
                      ref={field.ref}
                    />
                  )}
                />
              </div>

              <div className="col-span-2">
                <Label>Data de nascimento</Label>
                <Input
                  type="date"
                  {...register("birthDate")}
                  max={today}
                />
                {errors.birthDate && (
                  <p className="text-xs text-error-500 mt-1">
                    {errors.birthDate.message as string}
                  </p>
                )}
              </div>

              <div className="col-span-2">
                <Label>Gênero</Label>
                <Controller
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <select
                      className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.value || undefined)}
                      ref={field.ref}
                    >
                      <option value="">Selecione</option>
                      <option value="MALE">Masculino</option>
                      <option value="FEMALE">Feminino</option>
                      <option value="OTHER">Outro</option>
                      <option value="PREFER_NOT_TO_SAY">Prefiro não informar</option>
                    </select>
                  )}
                />
                {errors.gender && (
                  <p className="text-xs text-error-500 mt-1">
                    {errors.gender.message as string}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Salvando..." : "Salvar alterações"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
