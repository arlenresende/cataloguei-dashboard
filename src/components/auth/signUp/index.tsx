


import GoogleAuth from "@/components/google-auth";
import AuthHeader from "../AuthHeader";
import BackDash from "../BackDash";
import AuthFooter from "../AuthFooter";
import SignUpForm from "./SignUpForm";

export default function AuthSignUp() {
 
  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <BackDash />
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <AuthHeader title="Cadastre-se" description="Cadastre-se para começar a usar o Cataloguei." />
          <div>
            <GoogleAuth />
            <SignUpForm />
            <AuthFooter text="Já tem uma conta?" linkText="Sign In" to="/signin" />
          </div>
        </div>
      </div>
    </div>
  );
}
