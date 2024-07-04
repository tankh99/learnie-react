import LoginForm, { LoginFormValues } from "./components/login-form";
import { Link, Navigate } from "react-router-dom";
import { useIsLoggedIn, useLogin } from "@/api/hooks/useAuth";

export default function LoginPage() {

  
  const loginMutation = useLogin();
  const [isLoggedIn, authReady] = useIsLoggedIn();
  const login = async  (values: LoginFormValues) => {
    loginMutation.mutate(values);
  }

  if (!authReady) {
    return <div>Loading...</div>
  }

  if (isLoggedIn) {
    return <Navigate to="/" replace={true} />
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
