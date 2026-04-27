import { RegisterForm } from '@/features'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const RegisterPage = async () => {
  const cookieStore = await cookies()

  const token = cookieStore.get('token')

  if (token) {
    redirect('/')
  }

  return (
    <div>
      <RegisterForm />
    </div>
  )
}

export default RegisterPage
