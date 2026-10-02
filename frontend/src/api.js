const defaultApiBaseUrl = 'http://localhost:3000'

export const API_BASE_URL = (
  typeof window !== 'undefined' && window.BARBERSHOP_API_URL
    ? window.BARBERSHOP_API_URL
    : defaultApiBaseUrl
).replace(/\/$/, '')
