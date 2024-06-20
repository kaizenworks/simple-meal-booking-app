"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { orderSearchSchema } from "@/lib/zod/order-search";
import SelectStatus from "./select-status";
import SubmitOnFormChange from "@/components/submit-on-form-change.client";
import SelectMeal from "./select-meal";
import SelectShippingMethod from "./select-shipping-method";
import { IMeal } from "@/models/Meal";
import { IShippingMethod } from "@/models/ShippingMethod";
import { useEffect } from "react";

interface iOrderSearchFormProps {
	meals: IMeal[];
	shippingMethods: IShippingMethod[];
}

export const OrderSearchForm = ({ meals, shippingMethods }: iOrderSearchFormProps) => {

	const params = useSearchParams();

	const router = useRouter()

	const form = useForm<z.infer<typeof orderSearchSchema>>({
		resolver: zodResolver(orderSearchSchema),
		defaultValues: setFormValues(),
	})

	useEffect(()=>{
		form.reset(setFormValues())
	},[params]);

	function setFormValues() {
		return {
			query: params.get('query') ?? '',
			status: params.get('status') ?? '',
			mealId: params.get('mealId') ?? '',
			shippingId: params.get('shippingId') ?? ''
		}
	}

	function onSubmit({ query, status, mealId, shippingId }: z.infer<typeof orderSearchSchema>) {


		const _params = new URLSearchParams()
		if (query) _params.set("query", query)
		if (status) _params.set("status", status)
		if (mealId) _params.set("mealId", mealId)
		if (shippingId) _params.set("shippingId", shippingId)

		router.push(window.location.pathname + `?${_params.toString()}`, { scroll: false });

	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4" >
				<SubmitOnFormChange debounceMs={200} onChange={onSubmit} >
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
								<SelectStatus field={field} />
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="mealId"
						render={({ field }) => (
							<FormItem className="flex-grow">
								<SelectMeal field={field} options={meals} />
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="shippingId"
						render={({ field }) => (
							<FormItem className="flex-grow">
								<SelectShippingMethod field={field} options={shippingMethods} />
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button variant="outline">Search</Button>
				</SubmitOnFormChange>
			</form>
		</Form>
	)
}