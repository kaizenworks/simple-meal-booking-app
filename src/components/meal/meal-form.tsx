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



import { IMeal } from '@/models/Meal';
import { SubmitHandler, useForm } from "react-hook-form";
import React from "react";
import { shippingMethods, shippingMethodIds } from "@/lib/shipping";
import { saveMeal } from "@/app/admin/meals/add/save-meal.action";
import { useFormStatus } from "react-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const mealFormSchema = z.object({
	name: z.string().min(3, { message: "Meal name is required" }),
	price: z.coerce.number().min(1, { message: "Minimum price is 1" })
})

interface MealFormProps {
	meal?: IMeal;
}

export default function MealForm({ meal }: MealFormProps) {

	const router = useRouter();

	const queryClient = useQueryClient();

	const form = useForm<z.infer<typeof mealFormSchema>>({
		defaultValues: {
			name: meal?.name ?? '',
			price: meal?.price ?? 0,
		},
		mode: 'onBlur',
		resolver: zodResolver(mealFormSchema),
	});

	// const save = saveMeal.bind(null, meal?.id ?? null)
	const { pending } = useFormStatus()

	const onSubmit = (value:z.infer<typeof mealFormSchema>) => {
		saveMeal(meal?.id??null,value).then(()=>{
			queryClient.invalidateQueries({ queryKey: ['meals'] })
			router.back();
		})
	}


	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<div className="grid grid-cols-1 gap-4">
					<div className="p-4">
						<h4 className="mb-4 text-xl font-bold">Billing Information</h4>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem className="mb-3">
									<FormLabel>Meal Name</FormLabel>
									<FormControl>
										<Input placeholder="Meal display name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="price"
							render={({ field }) => (
								<FormItem className="mb-3">
									<FormLabel>Meal Price</FormLabel>
									<FormControl>
										<Input type="number" placeholder="Meal price" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button disabled={pending} className="w-full" type="submit">{ pending ? '...' : 'Save Meal' }</Button>
					</div>
				</div>


			</form>
		</Form>
	)
}