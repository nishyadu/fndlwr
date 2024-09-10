import { NextResponse } from 'next/server';
import { createPool } from '@vercel/postgres';

const pool = createPool({
  connectionString: process.env.fndlwr_URL,
});

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const result = await pool.sql`
      SELECT *
      FROM lawyer 
      WHERE id = ${params.id}
    `;
    
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Lawyer not found' }, { status: 404 });
    }

    const lawyer = result.rows[0];
    lawyer.expertise = lawyer.expertise || [];  // Ensure expertise is always an array

    return NextResponse.json(lawyer);
  } catch (error) {
    console.error('Error fetching lawyer details:', error);
    return NextResponse.json({ error: 'An error occurred while fetching lawyer details' }, { status: 500 });
  }
}