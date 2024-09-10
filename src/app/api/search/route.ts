import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';
  const location = searchParams.get('location') || '';

  try {
    const result = await sql`
      SELECT id, name, specialty, location, imageurl
      FROM lawyer 
      WHERE (name ILIKE ${`%${query}%`} OR specialty ILIKE ${`%${query}%`})
      AND location ILIKE ${`%${location}%`}
    `;
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error searching lawyers:', error);
    return NextResponse.json({ error: 'An error occurred while searching for lawyers' }, { status: 500 });
  }
}