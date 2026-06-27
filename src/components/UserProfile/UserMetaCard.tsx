import { useEffect } from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { useAuth } from "@/hooks/useAuth";
import { useStore } from "@/hooks/useStore";
import { useUpdateStore } from "@/hooks/useUpdateStore";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";

const storeSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().optional().or(z.literal("")),
  email: z.string().min(1, "E-mail é obrigatório").email("E-mail inválido"),
  logo: z.string().optional().or(z.literal("")),
  coverImage: z.string().optional().or(z.literal("")),
  websiteUrl: z.string().optional().or(z.literal("")),
  whatsappUrl: z.string().optional().or(z.literal("")),
  instagramUrl: z.string().optional().or(z.literal("")),
  facebookUrl: z.string().optional().or(z.literal("")),
  tiktokUrl: z.string().optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  phoneNumber: z.string().optional().or(z.literal("")),
  cellPhone: z.string().optional().or(z.literal("")),
});

type StoreFormData = z.infer<typeof storeSchema>;

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

export default function UserMetaCard() {
  const { user } = useAuth();
  const { data: storeResponse } = useStore();
  const store = storeResponse?.data;
  const { isOpen, openModal, closeModal } = useModal();
  const updateStoreMutation = useUpdateStore();

  const address = store
    ? [store.address?.street, store.address?.number, store.address?.neighborhood, store.address?.city, store.address?.state]
        .filter(Boolean)
        .join(", ")
    : "";

  const form = useForm<StoreFormData>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: store?.name || "",
      description: store?.description || "",
      email: store?.email || "",
      logo: store?.logo || "",
      coverImage: store?.coverImage || "",
      websiteUrl: store?.websiteUrl || "",
      whatsappUrl: store?.whatsappUrl || "",
      instagramUrl: store?.instagramUrl || "",
      facebookUrl: store?.facebookUrl || "",
      tiktokUrl: store?.tiktokUrl || "",
      phone: store?.phone || "",
      phoneNumber: store?.phoneNumber || "",
      cellPhone: store?.cellPhone || "",
    },
  });

  const { register, handleSubmit, control, reset, formState: { errors } } = form;

  useEffect(() => {
    if (store) {
      reset({
        name: store.name || "",
        description: store.description || "",
        email: store.email || "",
        logo: store.logo || "",
        coverImage: store.coverImage || "",
        websiteUrl: store.websiteUrl || store.url || "",
        whatsappUrl: formatPhone(store.whatsappUrl || ""),
        instagramUrl: store.instagramUrl || "",
        facebookUrl: store.facebookUrl || "",
        tiktokUrl: store.tiktokUrl || "",
        phone: formatPhone(store.phone || ""),
        phoneNumber: formatPhone(store.phoneNumber || ""),
        cellPhone: formatPhone(store.cellPhone || ""),
      });
    }
  }, [store, reset]);

  const handleSave = async (data: StoreFormData) => {
    if (!store?.id) return;
    const clean = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, value === "" ? undefined : value])
    );
    await updateStoreMutation.mutateAsync({ id: store.id, data: clean });
    closeModal();
  };

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
              {store?.logo ? (
                <img src={store.logo} alt={store.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-brand-500 flex items-center justify-center text-white text-2xl font-bold">
                  {store?.name?.charAt(0) || user?.name?.charAt(0) || "?"}
                </div>
              )}
            </div>
            <div className="order-3 xl:order-2">
              <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                {store?.name || user?.name || "Minha Loja"}
              </h4>
              <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {store?.description || "Sua loja"}
                </p>
                {address && (
                  <>
                    <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {address}
                    </p>
                  </>
                )}
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
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Informações da Loja
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Atualize os dados da sua loja.
            </p>
          </div>
          <form onSubmit={handleSubmit(handleSave)} className="flex flex-col">
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div>
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Dados da Loja
                </h5>
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2">
                    <Label>Nome da Loja <span className="text-error-500">*</span></Label>
                    <Input placeholder="Nome da loja" {...register("name")} error={!!errors.name} />
                    {errors.name && <p className="text-xs text-error-500 mt-1">{errors.name.message}</p>}
                  </div>

                  <div className="col-span-2">
                    <Label>Descrição</Label>
                    <Input placeholder="Descreva sua loja" {...register("description")} />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>E-mail <span className="text-error-500">*</span></Label>
                    <Input type="email" placeholder="contato@loja.com" {...register("email")} error={!!errors.email} />
                    {errors.email && <p className="text-xs text-error-500 mt-1">{errors.email.message}</p>}
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>URL do Logo</Label>
                    <Input placeholder="https://example.com/logo.png" {...register("logo")} />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>URL da Capa</Label>
                    <Input placeholder="https://example.com/cover.jpg" {...register("coverImage")} />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Website</Label>
                    <Input placeholder="https://www.loja.com" {...register("websiteUrl")} />
                  </div>
                </div>
              </div>

              <div className="mt-7">
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Contato
                </h5>
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2 lg:col-span-1">
                    <Label>WhatsApp</Label>
                    <Controller
                      control={control}
                      name="whatsappUrl"
                      render={({ field }) => (
                        <Input
                          type="tel"
                          placeholder="(11) 99999-9999"
                          value={field.value || ""}
                          onChange={(e) => field.onChange(e.target.value.replace(/\D/g, "").slice(0, 11))}
                        />
                      )}
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Telefone</Label>
                    <Controller
                      control={control}
                      name="phone"
                      render={({ field }) => (
                        <Input
                          type="tel"
                          placeholder="(11) 99999-9999"
                          value={field.value || ""}
                          onChange={(e) => field.onChange(formatPhone(e.target.value))}
                        />
                      )}
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Telefone Fixo</Label>
                    <Controller
                      control={control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <Input
                          type="tel"
                          placeholder="(11) 3333-4444"
                          value={field.value || ""}
                          onChange={(e) => field.onChange(formatPhone(e.target.value))}
                        />
                      )}
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Celular</Label>
                    <Controller
                      control={control}
                      name="cellPhone"
                      render={({ field }) => (
                        <Input
                          type="tel"
                          placeholder="(11) 99999-9999"
                          value={field.value || ""}
                          onChange={(e) => field.onChange(formatPhone(e.target.value))}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-7">
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Redes Sociais
                </h5>
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2 lg:col-span-1">
                    <Label>Instagram</Label>
                    <Input placeholder="https://instagram.com/loja" {...register("instagramUrl")} />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Facebook</Label>
                    <Input placeholder="https://facebook.com/loja" {...register("facebookUrl")} />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>TikTok</Label>
                    <Input placeholder="https://tiktok.com/@loja" {...register("tiktokUrl")} />
                  </div>
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
