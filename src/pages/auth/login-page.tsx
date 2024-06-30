import { auth } from "@/lib/firebsae/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import LoginForm from "./login-form";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const {toast} = useToast()
  const login = async  (values: any) => {
    try {
      const signinRes = await signInWithEmailAndPassword(auth, values.email, values.password);
      console.log(signinRes);
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      })
    }
  }

  return (
    <div>
      signup-page
      <div className="mx-auto max-w-[400px] border border-gray-200 drop-shadow-sm p-10">
        <h3 className="font-bold text-xl">Login</h3>
        <br/>
        <LoginForm onSubmit={login} />
        <p>Don't have an account? 
          <Link to="/signup">Sign up here</Link>
        </p>
      </div>
    </div>
  )
}
