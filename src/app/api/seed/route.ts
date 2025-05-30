import { NextResponse } from 'next/server'
import { db } from "@/db"
import { users } from "@/db/schema"

export async function GET() {
  try {
    await seedUsers()
    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully',
    })
  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to seed database' },
      { status: 500 },
    )
  }
}

// For development/testing purposes, you can seed the database with this function
export async function seedUsers() {
  try {
    // Check if users already exist
    const existingUsers = await db.select().from(users)
    const sampleUsers = [
      {
        name: 'John Doe',
        email: 'john@example.com',
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
      },
      {
        name: 'Alice Johnson',
        email: 'alice@example.com',
      },
      {
        name: 'Bob Brown',
        email: 'bob@example.com',
      },
      {
        name: 'Charlie Davis',
        email: 'charlie@example.com',
      },
      {
        name: 'Diana Wilson',
        email: 'diana@example.com',
      },
      {
        name: 'Edward Miller',
        email: 'edward@example.com',
      },
      {
        name: 'Fiona Taylor',
        email: 'fiona@example.com',
      },
      {
        name: 'George Thomas',
        email: 'george@example.com',
      },
      {
        name: 'Hannah Clark',
        email: 'hannah@example.com',
      },
    ]
    for (const user of sampleUsers) {
      // @ts-ignore
      await db.insert(users).values(user)
    }
    console.log('Database seeded with sample users')
  } catch (error) {
    console.error('Error seeding database:', error)
  }
}