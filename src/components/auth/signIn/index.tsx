
import SignInForm from "./SignInForm";
import GoogleAuth from "@/components/google-auth";
import AuthHeader from "../AuthHeader";
import BackDash from "../BackDash";
import AuthFooter from "../AuthFooter";


export default function AuthSignIn() {
 
  return (
    <div className="flex flex-col flex-1">
      <BackDash />
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <AuthHeader title="Que bom ter você aqui!" description="Faça login e continue de onde parou." />
          <div>
            <GoogleAuth />
            <SignInForm />
            <AuthFooter text="Não tem uma conta?" linkText="Cadastre-se" to="/registrar" />
          </div>
        </div>
      </div>
    </div>
  );
}
