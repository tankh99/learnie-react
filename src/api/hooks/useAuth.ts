import { useToast } from "@/components/ui/use-toast";
import { auth } from "@/lib/firebsae/config";
import { LoginFormValues } from "@/pages/auth/components/login-form";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from "react-router";

export const useLogin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (values: LoginFormValues) => {
      const signinRes = await signInWithEmailAndPassword(auth, values.email, values.password);
      toast({
        title: "Success",
        description: "Logged in successfully",
        variant: "success"
      })
      navigate("/")
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
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (values: any) => {
      const signupRes = await createUserWithEmailAndPassword(auth, values.email, values.password);
      toast({
        title: "Success",
        description: "Account created successfully",
        variant: "success"
      })
      navigate("/login")
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

export const useSignout = () => {
  const {toast} = useToast();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async () => {
      await signOut(auth);
      toast({
        title: "Success",
        description: "Signed out successfully",
        variant: "success"
      })
      navigate("/login");
    },
    onError: (err: any) => {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive"
      }) 
    }
  })
}