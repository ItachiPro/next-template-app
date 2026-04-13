import { cookies } from 'next/headers'

export const getAuthHeaders = async (): Promise<Record<string, string>> => {
  if (typeof window === 'undefined') {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    if (token) {
      return {
        Authorization: `Bearer ${token}`,
      }
    }
  }

  return {}
}
