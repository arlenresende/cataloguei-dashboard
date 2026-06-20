import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const storeSchema = z.object({
  name: z.string().min(1, { message: 'Por favor, insira um nome para sua loja' }),
  url: z.string().min(1, { message: 'Por favor, insira uma url para sua loja' }),
  whatsApp: z.string().min(1, {
    message: 'Por favor, insira o número do WhatsApp da sua loja.',
  }),
  description: z.string().min(1, {
    message: 'Por favor, insira a descrição da sua loja.',
  }),
});
type FormData = z.infer<typeof storeSchema>;

function slugify(str: string) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function buildStorePublicUrl(rawSlug: string) {
  const slug = slugify(rawSlug);
  return `https://catalogeui.com.br/${slug}`;
}

async function createStore(data: {
  name: string;
  url: string;
  description: string;
  whatsappUrl: string;
}) {
  void data;
  return { success: true };
}

type UseOnBoardControllerParams = {
  onSuccess: () => void;
};

export function useOnBoardController({ onSuccess }: UseOnBoardControllerParams) {
  const form = useForm<FormData>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: '',
      url: '',
      whatsApp: '',
      description: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    const fullUrl = buildStorePublicUrl(data.url);
    const formatedData = {
      name: data.name.trim(),
      url: fullUrl,
      description: data.description.trim(),
      whatsappUrl: data.whatsApp.trim(),
    };
    const result = await createStore(formatedData);
    if (result.success) {
      form.reset();
      onSuccess();
    }
  };

  return {
    form,
    isPending: form.formState.isSubmitting,
    onSubmit,
  };
}
