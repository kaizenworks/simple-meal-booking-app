"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { mealSearchSchema } from "@/lib/zod/meal-search";

export const MealSearchForm = () => {

	const params = useSearchParams();

	const router = useRouter()

	const form = useForm<z.infer<typeof mealSearchSchema>>({
		resolver: zodResolver(mealSearchSchema),
		defaultValues: {
			query: params.get('query') ?? undefined
		},
	})

	function onSubmit({ query }: z.infer<typeof mealSearchSchema>) {


		const _params = new URLSearchParams()
		if (query) _params.set("query", query)
		
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
								<Input placeholder="Search meal.." {...field} />
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
