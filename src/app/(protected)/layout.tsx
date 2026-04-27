import { cookies } from 'next/headers'
import ProtectedShell from './ProtectedShell'
import { redirect } from 'next/navigation'

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')

  if (!token) {
    redirect('/login')
  }

  return <ProtectedShell>{children}</ProtectedShell>
}

export default ProtectedLayout
