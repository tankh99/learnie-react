import { FormTextInput } from "@/components/form/form-text-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type P = {
  onSubmit: (values: any) => void;
}

export const signupFormSchema = z.object({
  email: z.string().email().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type SignupFormValues = z.infer<typeof signupFormSchema>

const DEFAULT_VALUES: SignupFormValues = {
  email: "",
  password: "",
  confirmPassword: ""
}

export default function SignupForm({onSubmit}: P) {
  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(signupFormSchema),
    defaultValues: DEFAULT_VALUES
  })

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4">
          <FormTextInput name="email" label="Email" form={form} type="email" />
          <FormTextInput name="password" label="Password" form={form} type="password" />
          <FormTextInput name="confirmPassword" label="Password" form={form} type="password" />
          <Button type="submit">Login</Button>
        </form>
      </Form>
    </div>
  )
}
