import { LoginForm } from '@/features'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const LoginPage = async () => {
  const cookieStore = await cookies()

  const token = cookieStore.get('token')

  if (token) {
    redirect('/')
  }

  return (
    <div>
      <LoginForm />
    </div>
  )
}

export default LoginPage
