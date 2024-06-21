import UserListTable from '@/components/user/list-table.client'
import { UserSearchForm } from '@/components/user/search-form.client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: "Users | Simple Meal Ordering App",
  description: "Simple Meal Ordering App Demo by Kaizenworks",
};

export default async function AdminUsersListPage() {

  return (
    <>
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-bold my-4">Users</h1>
        <Button asChild size="sm">
          <Link href="/admin/users/add">Add User</Link>
        </Button>
      </div>
      <Card className="w-full mx-auto">
        <CardContent className="flex flex-col gap-4 pt-6">
          <Suspense>
            <UserSearchForm />
            <UserListTable />
          </Suspense>
        </CardContent>
      </Card>
    </>
  )
}
