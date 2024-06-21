"use client"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form";
import React from "react";
import { useFormStatus } from "react-dom";
import { IUser } from "@/models/User";
import { changePasswordAction } from "@/app/admin/users/change-password.action";
import { Input } from "@/components/ui/input";

export const changePasswordFormSchema = z.object({
	password: z.string().min(6,{message:"Minimum 6 characters."})
})

interface ChangePasswordFormProps {
	user: IUser,
	onSubmit: Function
}

export default function ChangePasswordForm({ user, onSubmit }: ChangePasswordFormProps) {

	const form = useForm<z.infer<typeof changePasswordFormSchema>>({
		defaultValues: {
			password: ''
		},
		mode: 'onSubmit',
		resolver: zodResolver(changePasswordFormSchema),
	});

	const savePassword = changePasswordAction.bind(null, user.id)
	const { pending } = useFormStatus()

	const save = async (value: z.infer<typeof changePasswordFormSchema>) => {
		await savePassword(value)
		onSubmit();
	}


	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(save)} className="space-y-8">
				<div className="grid grid-cols-1 gap-4">
					<div className="p-4">
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem className="mb-3">
									<FormLabel>Set Paswword</FormLabel>
									<FormControl>
										<Input placeholder="Minimum 6 charcters." {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button disabled={pending} className="w-full" type="submit">{pending ? '...' : 'Save'}</Button>
					</div>
				</div>
			</form>
		</Form>
	)
}