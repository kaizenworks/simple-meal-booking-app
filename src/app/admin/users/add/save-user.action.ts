'use server'
import { redirect } from 'next/navigation'
import { revalidatePath, revalidateTag } from 'next/cache'
import User from "@/models/User";
import { z } from 'zod';
import { userFormSchema } from '@/components/user/user-form';

export async function saveUser(userId: string | null, {password,...userObject}: z.infer<typeof userFormSchema>) {
	
	let user;
	if(userId) {
		user = await User.findOne({_id:userId});
		Object.assign(user,userObject);
	} else {
		user = new User(userObject);
		user.password = password;
	}

	try{
		await user.save();		
	} catch(error) {
		console.error(error);
		return {
			errors: "This form contains errors."
		}
	}

	revalidateTag('users')
	revalidatePath('/admin/users')
}