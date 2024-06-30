import { useToast } from "@/components/ui/use-toast";
import { auth } from "@/lib/firebsae/config";
import { LoginFormValues } from "@/pages/auth/components/login-form";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (values: LoginFormValues) => {
      const signinRes = await signInWithEmailAndPassword(auth, values.email, values.password);
      toast({
        title: "Success",
        description: "Logged in successfully",
        variant: "success"
      })
      return signinRes;
    },
    onError: (err) => {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive"
      })
    }
  })
}

export const useSignup = () => {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (values: any) => {
      const signupRes = await createUserWithEmailAndPassword(auth, values.email, values.password);
      toast({
        title: "Success",
        description: "Account created successfully",
        variant: "success"
      })
      return signupRes;
    },
    onError: (err) => {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive"
      })
    }
  })
}