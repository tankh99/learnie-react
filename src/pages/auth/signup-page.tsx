import SignupForm, { SignupFormValues } from './components/signup-form'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebsae/config'
import { useToast } from '@/components/ui/use-toast'
import { Link } from 'react-router-dom'
import { useSignup } from '@/api/hooks/useAuth'

export default function SignupPage() {

  const signupMutation = useSignup();
  const signup = async (values: SignupFormValues) => {
    signupMutation.mutate(values);
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
