import UserForm from '@/components/user/user-form'
import { Card, CardContent } from '@/components/ui/card'
import User, { IUser } from '@/models/User';
import { Metadata } from 'next'
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
	title: "Edit User",
};

async function getUser(id:string): Promise<IUser | null> {
  let user = await User.findOne({_id:id});
  if(!user) return null;
  return user.toJSON();
}

export default async function EditUserPage({ params }: { params: { id: string } }) {

  let user = await getUser(params.id);

  if(!user) return redirect('/admin/users')
  
  return (
    <>
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-bold my-4">Edit User</h1>
      </div>
      <Card className="w-full md:w-50 mx-auto">
        <CardContent className="flex flex-col gap-4 pt-6">
          <UserForm user={user} />
        </CardContent>
      </Card>
    </>
  )
}
