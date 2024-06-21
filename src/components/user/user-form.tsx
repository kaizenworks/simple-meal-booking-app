"use client"
import { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"



import { IUser } from '@/models/User';
import { SubmitHandler, useForm } from "react-hook-form";
import React from "react";
import { shippingMethods, shippingMethodIds } from "@/lib/shipping";
import { saveMeal } from "@/app/admin/meals/add/save-meal.action";
import { useFormStatus } from "react-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ROLES } from "@/config";
import { saveUser } from "@/app/admin/users/add/save-user.action";

export const userFormSchema = z.object({
	name: z.string().min(3, { message: "Full name is required" }),
	email: z.string().min(1, { message: "Email value not provided" }).email({ message: "Invalid email" }),
	role: z.enum(ROLES),
	password: z.string().optional()
})

interface UserFormProps {
	user?: IUser;
}

export default function UserForm({ user }: UserFormProps) {

	const router = useRouter();

	const queryClient = useQueryClient();

	const form = useForm<z.infer<typeof userFormSchema>>({
		defaultValues: {
			name: user?.name ?? '',
			email: user?.email ?? '',
			role: user?.role ?? ROLES[1], // 1 = staff
			password: '',
		},
		mode: 'onBlur',
		resolver: zodResolver(userFormSchema),
	});

	// const save = saveMeal.bind(null, meal?.id ?? null)
	const { pending } = useFormStatus()

	const onSubmit = (value: z.infer<typeof userFormSchema>) => {
		saveUser(user?.id ?? null, value).then(() => {
			queryClient.invalidateQueries({ queryKey: ['users'] })
			router.back();
		})
	}


	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<div className="grid grid-cols-1 gap-4">
					<div className="p-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem className="mb-3">
									<FormLabel>Full Name</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem className="mb-3">
									<FormLabel>Email Address</FormLabel>
									<FormControl>
										<Input type="email" placeholder="Valid email address" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="role"
							render={({ field }) => (
								<FormItem className="mb-3">
									<FormLabel>Role</FormLabel>
									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select Role" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value={ROLES[0]}>Admin</SelectItem>
											<SelectItem value={ROLES[1]}>Staff</SelectItem>

										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						{ !user && (
							<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem className="mb-3">
									<FormLabel>Paswword</FormLabel>
									<FormControl>
										<Input placeholder="Minimum 6 charcters." {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						)}

						<Button disabled={pending} className="w-full" type="submit">{pending ? '...' : 'Save User'}</Button>
					</div>
				</div>


			</form>
		</Form>
	)
}