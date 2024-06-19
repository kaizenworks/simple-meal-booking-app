import { z } from 'zod';

export const checkoutSchema = z.object({
	name: z.string().min(6, { message: "Full name is required" }),
	phone: z.string().min(10, { message: "Phone is required" }),
	email: z.string()
		.min(1, { message: "Email is required" })
		.email({ message: "Email is not valid" }),
	address: z.string().min(6, { message: "Address is required" }),
	note: z.string().optional(),
	mealId: z.string().min(1, { message: "Meal is required" }),
	shippingId: z.string().min(1, { message: "Meal is required" }),
	quantity: z.number().min(1, "Quanity must be at least 1"),
	days: z.date().array().refine((days: Date[]) => {
		return days.length > 0;
	}, "Please select one or more dates."),
})