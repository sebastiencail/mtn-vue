const API_URL = 'http://localhost:3000'

export async function http<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
    ...options,
  })

  if (!res.ok) {
    const message = await res.text()
    throw new Error(message || res.statusText)
  }

  return res.json() as Promise<T>
}
