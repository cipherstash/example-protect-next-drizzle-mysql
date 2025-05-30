import { NextResponse } from 'next/server'
import { db } from "@/db"
import { users } from "@/db/schema"
import { extractUsedTable } from 'drizzle-orm/gel-core'
import { protectClient } from '@/protect'
import { users as protectUsers } from '@/protect/schema'
import { eq } from 'drizzle-orm'

export async function GET() {
  try {
    const existingUsers = await db.select().from(users)

    const usersToMigrate = existingUsers.map((user) => {
      return {
        name: user.name,
        email: user.email,
        nameEncrypted: user.name,
        emailEncrypted: user.email,
      }
    })

    const result = await protectClient.bulkEncryptModels(usersToMigrate, protectUsers)

    if (result.failure) {
      return NextResponse.json({
        success: false,
        message: 'Failed to migrate users',
        errors: result.failure,
      }, { status: 500 })
    }

    // Update users with encrypted data
    for (const encryptedUser of result.data) {
      await db.update(users)
        .set({
          nameEncrypted: encryptedUser.nameEncrypted,
          emailEncrypted: encryptedUser.emailEncrypted
        })
        .where(eq(users.name, encryptedUser.name as string))
    }

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
