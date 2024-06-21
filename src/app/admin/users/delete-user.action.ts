'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import User from "@/models/User";

export const deleteUserAction = async ({id}:{id:string}) => {
	
	await User.deleteOne({_id:id});
	
	revalidateTag('users')
	revalidatePath('/admin/users')

}
