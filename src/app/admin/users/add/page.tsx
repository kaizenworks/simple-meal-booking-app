import UserForm from '@/components/user/user-form'
import { Card, CardContent } from '@/components/ui/card'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: "Add User | Simple Meal Ordering App",
	description: "Simple Meal Ordering App Demo by Kaizenworks",
};

export default async function AddUserPage() {
  
  return (
    <>
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-bold my-4">Add User</h1>
      </div>
      <Card className="w-full md:w-50 mx-auto">
        <CardContent className="flex flex-col gap-4 pt-6">
          <UserForm />
        </CardContent>
      </Card>
    </>
  )
}
