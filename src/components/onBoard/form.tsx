import { Loader2 } from 'lucide-react';
import { Controller } from 'react-hook-form';
import Label from '@/components/form/Label';
import Input from '@/components/form/input/InputField';
import TextArea from '@/components/form/input/TextArea';
import Button from '@/components/ui/button/Button';
import { buildStorePublicUrl, useOnBoardController } from './controller';

interface FormProps {
  activeConfetti: (bool: boolean) => void;
}

export default function Form({ activeConfetti }: FormProps) {
  const { form, isPending, onSubmit } = useOnBoardController({
    onSuccess: () => activeConfetti(true),
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = form;

  const urlValue = watch('url');
  const urlPreview = urlValue ? buildStorePublicUrl(urlValue) : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <div>
          <Label>
            Nome da loja <span className="text-error-500">*</span>
          </Label>
          <Input
            placeholder="Digite o nome da sua loja"
            {...register('name')}
            error={Boolean(errors.name)}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-error-500">{errors.name.message as string}</p>
          )}
        </div>

        <div>
            <Label>
                URL da loja <span className="text-error-500">*</span>
            </Label>

            <div className="relative">
                <span className="absolute left-0 top-1/2 -translate-y-1/2  bg-brand-500 px-3.5 py-3 text-white dark:border-white dark:text-white text-sm rounded-l-lg">
                www.cataloguei.com.br/
                </span>

                <Input
                placeholder="minha-loja"
                className="pl-[190px]"
                {...register("url")}
                error={Boolean(errors.url)}
                hint={urlPreview ? `Prévia: ${urlPreview}` : undefined}
                />
            </div>

            {errors.url && (
                <p className="mt-1 text-xs text-error-500">
                {errors.url.message as string}
                </p>
            )}
            </div>

        <div>
          <Label>
            WhatsApp <span className="text-error-500">*</span>
          </Label>
          <Controller
            name="whatsApp"
            control={control}
            render={({ field }) => (
              <Input
                type="tel"
                placeholder="(11) 99999-9999"
                value={field.value}
                onChange={(e) => {
                  const digits = e.target.value.replace(/\D/g, '').slice(0, 11);
                  let formatted = digits;
                  if (digits.length > 2) formatted = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
                  if (digits.length > 7) formatted = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
                  field.onChange(formatted);
                }}
                error={Boolean(errors.whatsApp)}
              />
            )}
          />
          {errors.whatsApp && (
            <p className="mt-1 text-xs text-error-500">{errors.whatsApp.message as string}</p>
          )}
        </div>

        <div>
          <Label>
            Descrição <span className="text-error-500">*</span>
          </Label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextArea
                rows={5}
                placeholder="Conte em poucas palavras o que sua loja vende"
                value={field.value}
                onChange={field.onChange}
                error={Boolean(errors.description)}
              />
            )}
          />
          {errors.description && (
            <p className="mt-1 text-xs text-error-500">
              {errors.description.message as string}
            </p>
          )}
        </div>

        <Button
          className="w-full"
          size="sm"
          disabled={isPending}
          startIcon={isPending ? <Loader2 className="animate-spin" size={18} /> : undefined}
        >
          Criar minha loja
        </Button>
      </div>
    </form>
  );
}
