import AuthSignIn from "@/components/auth/signIn";
import PageMeta from "@/components/common/PageMeta";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="Login"
        description="Página de login"
      />

      <AuthSignIn />
    </>
  );
}