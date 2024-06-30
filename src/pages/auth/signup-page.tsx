import SignupForm, { SignupFormValues } from './components/signup-form'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebsae/config'
import { useToast } from '@/components/ui/use-toast'
import { Link } from 'react-router-dom'

export default function SignupPage() {

  const {toast} = useToast()
  const signup = async (values: SignupFormValues) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, values.email, values.password)
      toast({
        variant:"success",
        title: "Success",
        description: "Account created successfully"
      })
      console.log(user);
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: err.message
      })
    }
  }

  return (
    <div className='mx-auto max-w-[400px] border border-gray-200 drop-shadow-sm p-10 flex flex-col space-y-4'>
      <h3 className="font-bold text-xl">Sign up</h3>
      <SignupForm onSubmit={signup} />
      <p className="">Already have an account? 
        <Link to="/login" replace className="text-blue-500 underline hover:no-underline"> Login here</Link>
      </p>
    </div>
  )
}
