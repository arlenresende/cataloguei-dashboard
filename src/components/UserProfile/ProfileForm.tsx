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
        className="flex items-center gap-2 px-4 py-2 rounded-full border"
      >
        <svg className="fill-current" width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z" fill="" />
        </svg>
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
