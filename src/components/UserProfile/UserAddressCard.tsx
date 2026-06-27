import { useEffect } from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { useStore } from "@/hooks/useStore";
import { useUpdateStore } from "@/hooks/useUpdateStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";

const addressSchema = z.object({
  street: z.string().optional().or(z.literal("")),
  number: z.string().optional().or(z.literal("")),
  neighborhood: z.string().optional().or(z.literal("")),
  city: z.string().optional().or(z.literal("")),
  state: z.string().optional().or(z.literal("")),
  zip_code: z.string().optional().or(z.literal("")),
  country: z.string().optional().or(z.literal("")),
});

type AddressFormData = z.infer<typeof addressSchema>;

export default function UserAddressCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const { data: storeResponse } = useStore();
  const store = storeResponse?.data;
  const address = store?.storeAddresses?.[0]?.address;
  const updateStoreMutation = useUpdateStore();

  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      street: "",
      number: "",
      neighborhood: "",
      city: "",
      state: "",
      zip_code: "",
      country: "",
    },
  });

  const { register, handleSubmit, reset } = form;

  useEffect(() => {
    if (address) {
      reset({
        street: address.street || "",
        number: address.number || "",
        neighborhood: address.neighborhood || "",
        city: address.city || "",
        state: address.state || "",
        zip_code: address.zip_code || "",
        country: address.country || "",
      });
    }
  }, [address, reset]);

  const handleSave = async (data: AddressFormData) => {
    if (!store?.id) return;
    const clean = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, value === "" ? undefined : value])
    );
    const existingAddress = store.storeAddresses?.[0];
    await updateStoreMutation.mutateAsync({
      id: store.id,
      data: {
        storeAddresses: [{
          store_id: store.id,
          address_id: existingAddress?.address_id || "",
          type: existingAddress?.type || "PHYSICAL",
          is_default: existingAddress?.is_default ?? true,
          address: {
            id: existingAddress?.address?.id || "",
            street: clean.street || "",
            number: clean.number || "",
            neighborhood: clean.neighborhood || "",
            city: clean.city || "",
            state: clean.state || "",
            zip_code: clean.zip_code || "",
            country: clean.country || "",
            complement: existingAddress?.address?.complement || null,
          },
        }],
      },
    });
    closeModal();
  };

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
              Endereço
            </h4>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  País
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {address?.country || "-"}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Cidade/Estado
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {address?.city && address?.state ? `${address.city}, ${address.state}` : "-"}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  CEP
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {address?.zip_code || "-"}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Bairro
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {address?.neighborhood || "-"}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={openModal}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
          >
            <svg className="fill-current" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z" fill="" />
            </svg>
            Editar
          </button>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Editar Endereço
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Atualize o endereço da sua loja.
            </p>
          </div>
          <form onSubmit={handleSubmit(handleSave)} className="flex flex-col">
            <div className="px-2 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div className="col-span-2 lg:col-span-1">
                  <Label>Rua</Label>
                  <Input placeholder="SQN 316 Bloco A" {...register("street")} />
                </div>

                <div className="col-span-2 lg:col-span-1">
                  <Label>Número</Label>
                  <Input placeholder="101" {...register("number")} />
                </div>

                <div className="col-span-2 lg:col-span-1">
                  <Label>Bairro</Label>
                  <Input placeholder="Asa Norte" {...register("neighborhood")} />
                </div>

                <div className="col-span-2 lg:col-span-1">
                  <Label>Cidade</Label>
                  <Input placeholder="Brasília" {...register("city")} />
                </div>

                <div className="col-span-2 lg:col-span-1">
                  <Label>Estado</Label>
                  <Input placeholder="DF" {...register("state")} />
                </div>

                <div className="col-span-2 lg:col-span-1">
                  <Label>CEP</Label>
                  <Input placeholder="70774-010" {...register("zip_code")} />
                </div>

                <div className="col-span-2 lg:col-span-1">
                  <Label>País</Label>
                  <Input placeholder="Brasil" {...register("country")} />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button type="button" size="sm" variant="outline" onClick={closeModal}>
                Cancelar
              </Button>
              <Button type="submit" size="sm" disabled={updateStoreMutation.isPending}>
                {updateStoreMutation.isPending ? (
                  <span className="flex items-center gap-2"><Loader2 className="animate-spin" size={16} /> Salvando...</span>
                ) : (
                  "Salvar alterações"
                )}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
