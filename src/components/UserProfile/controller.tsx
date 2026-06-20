import { useUpdateProfile } from "@/hooks/useUpdateProfile";
import { useAuth } from "@/hooks/useAuth";
import { profileRequest } from "@/api/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  email: z.string().min(1, "E-mail é obrigatório").email("E-mail inválido"),
  cellPhone: z.string().optional().or(z.literal("")),
  document: z.string().optional().or(z.literal("")),
  birthDate: z.string().optional().or(z.literal("")),
  gender: z.enum(["MALE", "FEMALE", "OTHER", "PREFER_NOT_TO_SAY", ""]).optional().or(z.literal("")),
});

type FormData = z.infer<typeof schema>;

export function useProfileFormController() {
  const { user, updateUserProfile } = useAuth();
  const updateProfileMutation = useUpdateProfile();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      cellPhone: user?.cellPhone || "",
      document: user?.document || "",
      birthDate: user?.birthDate ? user.birthDate.slice(0, 10) : "",
      gender: (user?.gender as FormData["gender"]) || "",
    },
  });

  const onSubmit = async (data: FormData): Promise<boolean> => {
    
    let userId = user?.id;
    
    try {
      const profileResponse = await profileRequest();
      
      if (profileResponse?.success && profileResponse?.data?.id) {
        userId = profileResponse.data.id;
        updateUserProfile(profileResponse.data);
      } else {
        toast.error('Não foi possível identificar o usuário.');
        return false;
      }
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
      toast.error('Erro ao buscar perfil.');
      return false;
    }
    
    if (!userId) {
      toast.error('ID do usuário não encontrado.');
      return false;
    }


    const payload: Partial<FormData> = {};


    if (data.name) {
      payload.name = data.name;
    }
    if (data.email) {
      payload.email = data.email;
    }
    if (data.cellPhone) {
      payload.cellPhone = data.cellPhone.replace(/\D/g, "");
    }
    if (data.document) {
      payload.document = data.document.replace(/\D/g, "");
    }
    if (data.birthDate) {
      payload.birthDate = data.birthDate;
    }
    if (data.gender) {
      payload.gender = data.gender;
    }

   

    try {
      await updateProfileMutation.mutateAsync({
        userId: userId,
        data: payload,
      });
      
      // Buscar os dados atualizados do perfil
      const updatedProfile = await profileRequest();
      if (updatedProfile?.success && updatedProfile?.data) {
        updateUserProfile(updatedProfile.data);
      }
      
      toast.success('Perfil atualizado com sucesso!');
      return true;
    } catch (error) {
      console.error('Erro ao salvar:', error);
      toast.error('Erro ao salvar alterações.');
      return false;
    }
  };

  const onReset = () => {
    form.reset({
      name: user?.name || "",
      email: user?.email || "",
      cellPhone: user?.cellPhone || "",
      document: user?.document || "",
      birthDate: user?.birthDate ? user.birthDate.slice(0, 10) : "",
      gender: (user?.gender as FormData["gender"]) || "",
    });
  };

  return {
    form,
    isPending: updateProfileMutation.isPending,
    onSubmit,
    onReset,
  };
}
