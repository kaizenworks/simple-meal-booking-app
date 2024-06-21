'use server'
import { revalidatePath, revalidateTag } from 'next/cache'
import User from "@/models/User";
import { z } from 'zod';
import { changePasswordFormSchema } from '@/components/user/change-password-form';

export async function changePasswordAction(userId: string | null, {password}: z.infer<typeof changePasswordFormSchema>) {
	
	if(!userId) return {error: "Not found"};

	let user = await User.findOne({_id:userId});
	if(!user) return {error: "Invalid user"};

	user.password = password;
	await user.save();	
	
	revalidateTag('users')
	revalidatePath('/admin/users')
}