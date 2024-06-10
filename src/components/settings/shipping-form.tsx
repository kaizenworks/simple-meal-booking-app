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
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form";
import React from "react";
import { useFormStatus } from "react-dom";
import { IShippingMethod } from "@/models/ShippingMethod";
import { saveShipping } from "@/app/admin/settings/save-shipping.action";

export const shippingFormSchema = z.object({
	name: z.string().min(3, { message: "Shipping name is required" }),
	charge: z.coerce.number()
})

interface ShippingFormProps {
	method?: IShippingMethod;
	onSubmit: Function
}

export default function ShippingForm({ method, onSubmit }: ShippingFormProps) {

	const form = useForm<z.infer<typeof shippingFormSchema>>({
		defaultValues: {
			name: method?.name ?? '',
			charge: method?.charge ?? 0,
		},
		mode: 'onBlur',
		resolver: zodResolver(shippingFormSchema),
	});

	const saveAction = saveShipping.bind(null, method?.id ?? null)
	const { pending } = useFormStatus()

	const save = async (formData:FormData) => {
		await saveAction(formData)
		onSubmit();
	}


	return (
		<Form {...form}>
			<form action={save} className="space-y-8">
				<div className="grid grid-cols-1 gap-4">
					<div className="p-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem className="mb-3">
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input placeholder="Shipping method display name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="charge"
							render={({ field }) => (
								<FormItem className="mb-3">
									<FormLabel>Charge</FormLabel>
									<FormControl>
										<Input type="number" placeholder="Shipping charge amount" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button disabled={pending} className="w-full" type="submit">{ pending ? '...' : 'Save' }</Button>
					</div>
				</div>


			</form>
		</Form>
	)
}