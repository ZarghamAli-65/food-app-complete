// app/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const response = NextResponse.next();

    // Set CORS headers for the API
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Handle preflight request (OPTIONS)
    if (request.method === 'OPTIONS') {
        return response;
    }

    return response;
}

// This middleware applies to all API routes in the app
export const config = {
    matcher: '/api/*', // Apply middleware to all API routes
};
