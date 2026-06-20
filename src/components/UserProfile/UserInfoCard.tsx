
import { useAuth } from "@/hooks/useAuth";
import ProfileForm from "./ProfileForm";


export default function UserInfoCard() {
  const { user } = useAuth();

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Informações pessoais
          </h4>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div>
              <p className="mb-2 text-xs text-gray-500">Nome</p>
              <p className="text-sm font-medium">{user?.name}</p>
            </div>

            <div>
              <p className="mb-2 text-xs text-gray-500">Email</p>
              <p className="text-sm font-medium">{user?.email}</p>
            </div>

            <div>
              <p className="mb-2 text-xs text-gray-500">Telefone</p>
              <p className="text-sm font-medium">{user?.cellPhone || "-"}</p>
            </div>

            <div>
              <p className="mb-2 text-xs text-gray-500">Documento</p>
              <p className="text-sm font-medium">{user?.document || "-"}</p>
            </div>

            <div>
              <p className="mb-2 text-xs text-gray-500">Data de nascimento</p>
              <p className="text-sm font-medium">
                {user?.birthDate
                  ? new Date(user.birthDate).toLocaleDateString("pt-BR")
                  : "-"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs text-gray-500">Gênero</p>
              <p className="text-sm font-medium">
                {user?.gender === "MALE"
                  ? "Masculino"
                  : user?.gender === "FEMALE"
                  ? "Feminino"
                  : user?.gender === "OTHER"
                  ? "Outro"
                  : user?.gender === "PREFER_NOT_TO_SAY"
                  ? "Prefiro não informar"
                  : "-"}
              </p>
            </div>
          </div>
        </div>

        <ProfileForm />
      </div>
    </div>
  );
}