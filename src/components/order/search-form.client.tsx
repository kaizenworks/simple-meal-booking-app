"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { orderSearchSchema } from "@/lib/zod/order-search";

export const OrderSearchForm = () => {

	const params = useSearchParams();

	const router = useRouter()

	const form = useForm<z.infer<typeof orderSearchSchema>>({
		resolver: zodResolver(orderSearchSchema),
		defaultValues: {
			query: params.get('query') ?? undefined,
			status: params.get('status') ?? undefined,
			mealId: params.get('mealId') ?? undefined,
			shipping: params.get('shipping') ?? undefined
		},
	})

	function onSubmit({ query, status, mealId, shipping }: z.infer<typeof orderSearchSchema>) {


		const _params = new URLSearchParams()
		if (query) _params.set("query", query)
		if (status) _params.set("status", status)
		if (mealId) _params.set("mealId", mealId)
		if (shipping) _params.set("shipping", shipping)

		router.push(window.location.pathname + `?${_params.toString()}`, { scroll: false });

	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4" >

				<FormField
					control={form.control}
					name="query"
					render={({ field }) => (
						<FormItem className="flex-grow">
							<FormControl>
								<Input placeholder="Search invoiceId, customer name etc.." {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="status"
					render={({ field }) => (
						<FormItem className="flex-grow">
							<FormControl>
								<Input placeholder="status" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="mealId"
					render={({ field }) => (
						<FormItem className="flex-grow">
							<FormControl>
								<Input placeholder="Meal Name" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="shipping"
					render={({ field }) => (
						<FormItem className="flex-grow">
							<FormControl>
								<Input placeholder="Shipping Method" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button variant="outline">Search</Button>

			</form>
		</Form>
	)
}
