"use client"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form";
import React from "react";
import { useFormStatus } from "react-dom";
import { IOrder } from "@/models/Order";
import SelectStatus from "./select-status";
import { changeOrderStatusAction } from "@/app/admin/change-order-status.action";

export const orderStatusEditFormSchema = z.object({
	status: z.string().optional()
})

interface OrderStatusEditFormProps {
	order: IOrder,
	onSubmit: Function
}

export default function OrderStatusEditForm({ order, onSubmit }: OrderStatusEditFormProps) {

	const form = useForm<z.infer<typeof orderStatusEditFormSchema>>({
		defaultValues: {
			status: order.status
		},
		mode: 'onBlur',
		resolver: zodResolver(orderStatusEditFormSchema),
	});

	const saveStatus = changeOrderStatusAction.bind(null, order.invoiceId)
	const { pending } = useFormStatus()

	const save = async (value: z.infer<typeof orderStatusEditFormSchema>) => {
		await saveStatus(value)
		onSubmit();
	}


	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(save)} className="space-y-8">
				<div className="grid grid-cols-1 gap-4">
					<div className="p-4">
						<FormField
							control={form.control}
							name="status"
							render={({ field }) => (
								<FormItem className="mb-3">
									<FormLabel>Order Status</FormLabel>
									<SelectStatus field={field} />
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