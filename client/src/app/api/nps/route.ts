import { NextRequest, NextResponse } from 'next/server';

const API_KEY = process.env.NEXT_PUBLIC_NPS_API_KEY;
const NPS_BASE_URL = 'https://developer.nps.gov/api/v1';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const endpoint = searchParams.get('endpoint');
    const parkCode = searchParams.get('parkCode') || 'yose';
    const limit = searchParams.get('limit') || '10';

    if (!endpoint) {
        return NextResponse.json({ error: 'Endpoint required' }, { status: 400 });
    }

    try {
        const url = `${NPS_BASE_URL}/${endpoint}?parkCode=${parkCode}&limit=${limit}&api_key=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        
        return NextResponse.json(data);
    } catch (error) {
        console.error('NPS API error:', error);
        return NextResponse.json({ error: 'Failed to fetch from NPS API' }, { status: 500 });
    }
}