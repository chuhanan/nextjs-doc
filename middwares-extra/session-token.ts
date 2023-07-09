import { NextRequest, NextResponse } from 'next/server'

export default async function sessionToken(request: NextRequest, response: NextResponse) {
  const token = request.headers.get('x-session-token')
  if (token) {
    response.headers.set('x-session-token', token)
  } else {
    response.headers.set('x-session-token', '123456789')
  }
  return response
}
