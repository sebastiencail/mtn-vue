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

  // Cas 204 No Content
  if (res.status === 204) {
    return undefined as T
  }

  // Cas body vide (DELETE, etc.)
  const text = await res.text()
  if (!text) {
    return undefined as T
  }

  return JSON.parse(text) as T
}
