import { NextResponse } from 'next/server';
import { createPool } from '@vercel/postgres';

const pool = createPool({
  connectionString: process.env.fndlwr_URL,
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';

  try {
    const result = await pool.sql`
      SELECT DISTINCT name, specialty
      FROM lawyer 
      WHERE name ILIKE ${`%${query}%`} OR specialty ILIKE ${`%${query}%`}
      LIMIT 5
    `;
    const suggestions = result.rows.flatMap(row => [row.name, row.specialty]);
    const uniqueSuggestions = Array.from(new Set(suggestions));
    return NextResponse.json(uniqueSuggestions);
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    return NextResponse.json({ error: 'An error occurred while fetching suggestions' }, { status: 500 });
  }
}