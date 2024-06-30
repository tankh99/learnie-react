import { FormTextInput } from "@/components/form/form-text-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type P = {
  onSubmit: (values: any) => void;
}

export const loginFormSchema = z.object({
  email: z.string().email().min(1, "Email is required"),
  password: z.string().min(1, "Password is required")
})

export type LoginFormValues = z.infer<typeof loginFormSchema>

const DEFAULT_VALUES: LoginFormValues = {
  email: "",
  password: ""
}

export default function LoginForm({onSubmit}: P) {
  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(loginFormSchema),
    defaultValues: DEFAULT_VALUES
  })

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4">
          <FormTextInput name="email" label="Email" form={form} type="email" />
          <FormTextInput name="password" label="Password" form={form} type="password" />
          <Button type="submit">Login</Button>
        </form>
      </Form>
    </div>
  )
}
