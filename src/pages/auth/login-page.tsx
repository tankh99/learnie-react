import LoginForm, { LoginFormValues } from "./components/login-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useLogin } from "@/api/hooks/useAuth";
import { isAuthenticated } from "@/api/hooks/auth";

export default function LoginPage() {

  
  const loginMutation = useLogin();
  const login = async  (values: LoginFormValues) => {
    loginMutation.mutate(values);
  }

  if (isAuthenticated()) {
    return <Navigate to="/" replace />
  }
  return (
    <div>
      <div className="mx-auto max-w-[400px] border border-gray-200 drop-shadow-sm p-10 flex flex-col space-y-4">
        <h3 className="font-bold text-xl">Login</h3>
        <Link to="/">Home</Link>
        <LoginForm onSubmit={login} />
        <p className="">Don't have an account? 
          <Link to="/signup" replace className="text-blue-500 underline hover:no-underline"> Sign up here</Link>
        </p>
      </div>
    </div>
  )
}
