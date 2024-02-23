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

const orderFormSchema = z.object({
	name: z.string().min(6, { message: "Full name is required" }),
	phone: z.string().min(10, { message: "Phone is required" }),
	email: z.string()
		.min(1, { message: "Email is required" })
		.email({ message: "Email is not valid" }),
	address: z.string().min(6, { message: "Address is required" }),
	quantity: z.number().min(1, "Quanity must be at least 1"),
	mealId: z.string().min(1, { message: "Meal is required" }),
	days: z.date().array().refine((days: Date[]) => {
		return days.length > 0;
	}, "Please select one or more dates."),
})

export interface ICheckoutBody {
	name: string;
	phone: string;
	email: string;
	address: string;
	shippingMethod: string;
	days: Date[];
	note: string;
	mealId: string;
	quantity: number;
}

interface OrderFormProps {
	meals: IMeal[]
	onSubmit: SubmitHandler<ICheckoutBody>
	isSubmitting: boolean
}

export default function OrderForm({ meals, onSubmit, isSubmitting }: OrderFormProps) {

	const form = useForm<ICheckoutBody>({
		defaultValues: {
			name: '',
			phone: '',
			email: '',
			address: '',
			shippingMethod: 'standard',
			days: [],
			note: '',
			mealId: '',
			quantity: 1
		},
		mode: 'onBlur',
		resolver: zodResolver(orderFormSchema),
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="p-4">
						<h4 className="mb-4 text-xl font-bold">Billing Information</h4>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem className="mb-3">
									<FormLabel>Full Name</FormLabel>
									<FormControl>
										<Input placeholder="Your Full Name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="phone"
							render={({ field }) => (
								<FormItem className="mb-3">
									<FormLabel>Phone Number</FormLabel>
									<FormControl>
										<Input placeholder="ie. +1 XXX XXXX XXX" {...field} />
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
										<Input placeholder="ie. your@email.com" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="address"
							render={({ field }) => (
								<FormItem className="mb-3">
									<FormLabel>Delivery Address</FormLabel>
									<FormControl>
										<Textarea placeholder="Full street address including PO BOX" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="note"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Notes</FormLabel>
									<FormControl>
										<Textarea placeholder="Special notes related to this order." {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

					</div>
					<div className="p-4">
						<h4 className="mb-4 text-xl font-bold">Order Details</h4>
						<FormField
							control={form.control}
							name="mealId"
							render={({ field }) => (
								<FormItem className="mb-3">
									<FormLabel>Meal</FormLabel>
									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select a meal type" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{
												meals.map((meal, index) => {
													return <SelectItem key={index} value={meal.id}>{meal.name}</SelectItem>
												})
											}
										</SelectContent>
									</Select>
									<FormDescription>
										Standard meal = 100. Premium meal = 500.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="shippingMethod"
							render={({ field }) => (
								<FormItem className="mb-3">
									<FormLabel>Shipping Method</FormLabel>
									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select a shipping method" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="standard">Standard</SelectItem>
											<SelectItem value="express">Express</SelectItem>
											<SelectItem value="pikcup">Store Pickup</SelectItem>
										</SelectContent>
									</Select>
									<FormDescription>
										Express shipping takes upto 1 hour. Standard shipping takes 4-5 hours.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="days"
							render={({ field }) => (
								<FormItem className="mb-3">
									<FormLabel>Select Dates</FormLabel>
									<FormControl>
										<Calendar
											mode="multiple"
											min={1}
											selected={field.value}
											onSelect={(date) => field.onChange(date)}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button disabled={isSubmitting} className="w-full" type="submit">Place Order</Button>
					</div>
				</div>


			</form>
		</Form>
	)
}