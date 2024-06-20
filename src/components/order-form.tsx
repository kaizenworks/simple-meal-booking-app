"use client"
import { useEffect, useState } from "react";

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
import { useForm, useWatch } from "react-hook-form";
import React from "react";
import { IShippingMethod } from "@/models/ShippingMethod";
import { Table, TableBody, TableCell, TableRow } from "./ui/table";
import { checkoutAction } from "@/app/actions";
import { z } from "zod";
import { checkoutSchema } from "@/lib/zod/checkout";
import { IOrder } from "@/models/Order";



export interface ICheckoutBody {
	name: string;
	phone: string;
	email: string;
	address: string;
	shippingId: string;
	days: Date[];
	note: string;
	mealId: string;
	quantity: number;
}

interface OrderFormProps {
	meals: IMeal[];
	shippingMethods: IShippingMethod[];
}

export default function OrderForm({ meals, shippingMethods }: OrderFormProps) {

	const [order, setOrder] = useState<IOrder | undefined>();

	const form = useForm<z.infer<typeof checkoutSchema>>({
		defaultValues: {
			name: 'Rafaat',
			phone: '+8801867076297',
			email: 'rafaat.ahmed@gmail.com',
			address: 'Test Address',
			shippingId: '',
			days: [],
			note: 'Some Note',
			mealId: '',
			quantity: 1
		},
		mode: 'onBlur',
		resolver: zodResolver(checkoutSchema),
	});

	const save = (value: z.infer<typeof checkoutSchema>) => {
		checkoutAction(value).then((order: IOrder) => {
			setOrder(order);
		});
	}

	if (order) return ThankYou(order);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(save)} className="space-y-8">
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
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="quantity"
							render={({ field }) => (
								<FormItem className="mb-3">
									<FormLabel>Quantity</FormLabel>
									<FormControl>
										<Input type="number" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="shippingId"
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
											{shippingMethods.map((method) => {
												return <SelectItem value={method.id} key={method.id}>{method.name}</SelectItem>
											})}
										</SelectContent>
									</Select>
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
											disabled={[
												{ before: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000) },
												{ after: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
												{ dayOfWeek: [0, 6] }
											]}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<h4 className="mb-4 text-xl font-bold">Order Summary</h4>
						<TotalValue meals={meals} shippingMethods={shippingMethods} />
						<Button className="w-full" type="submit">Place Order</Button>
					</div>
				</div>


			</form>
		</Form>
	)
}

function ThankYou(order: IOrder) {
	return (
		<div className="w-full md:w-1/3 mx-auto space-y-8">
			<h2 className="text-3xl">Thank you {order.name}</h2>
			<Table>
				<TableBody>
					<TableRow>
						<TableCell>Invoice ID</TableCell>
						<TableCell style={{ textAlign: 'right' }}>{order.invoiceId.toUpperCase()}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Meal: {`${order.mealName} (${order.mealPrice} x ${order.quantity} pcs x ${order.days.length} days)`}</TableCell>
						<TableCell style={{ textAlign: 'right' }}>{order.cartTotal}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Shipping: {`${order.shippingMethod} (${order.shippingRate} x ${order.days.length} days)`}</TableCell>
						<TableCell style={{ textAlign: 'right' }}>{order.shippingCharge}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Total</TableCell>
						<TableCell style={{ textAlign: 'right' }}>{order.total}</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	)
}

function TotalValue({ meals, shippingMethods }: Partial<OrderFormProps>) {

	const valChanges = useWatch();

	const [total, setTotal] = useState({
		price: 0,
		shipping: 0,
		days: 0
	});

	useEffect(() => {
		const { mealId, shippingId, days } = valChanges;

		const meal = meals?.find(m => m.id == mealId);
		const method = shippingMethods?.find(m => m.id == shippingId);

		setTotal({
			price: (meal?.price ?? 0),
			shipping: (method?.charge ?? 0),
			days: days.length
		})

	}, [valChanges])

	return (
		<Table>
			<TableBody>
				<TableRow>
					<TableCell>Cart Total ({total.price} x {valChanges.quantity} pcs x {total.days} days)</TableCell>
					<TableCell style={{ textAlign: 'right' }}>{total.price * valChanges.quantity * total.days}</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>Shipping ({total.shipping} x {total.days} days)</TableCell>
					<TableCell style={{ textAlign: 'right' }}>{total.shipping * total.days}</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>Total</TableCell>
					<TableCell style={{ textAlign: 'right' }}>{((total.price * valChanges.quantity) + total.shipping) * total.days}</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	)

}