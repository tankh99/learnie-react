import { useToast } from "@/components/ui/use-toast";
import { auth } from "@/lib/firebsae/config";
import { LoginFormValues } from "@/pages/auth/components/login-form";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const useIsLoggedIn = () => {
  const [authReady, setAuthReady] = useState(false);
  const isLoggedIn = auth.currentUser !== null
  useEffect(() => {
    const init = async () => {
      await auth.authStateReady();
      setAuthReady(true);
    }
    init()
  }, [auth])
  return [isLoggedIn, authReady]
}

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
      navigate("/", { replace: true })
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
      navigate("/login", {replace: true, state: {from: "/"}});
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