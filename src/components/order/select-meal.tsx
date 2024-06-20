"use client"
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ControllerRenderProps, FieldValues } from "react-hook-form"
import { FormControl } from "@/components/ui/form"
import { useQuery } from "@tanstack/react-query"
import { getMeals } from "@/lib/queryFns/get-meals";
import { IMeal } from "@/models/Meal";

interface iSelectMeal {
	field: ControllerRenderProps<FieldValues, 'mealId'>;
	options: IMeal[];
}

export default function SelectMeal({ field, options }: iSelectMeal) {

	return (
		<Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
			<FormControl>
				<SelectTrigger>
					<SelectValue placeholder="Select Meal" />
				</SelectTrigger>
			</FormControl>
			<SelectContent>
				{options && options.map((meal: IMeal, idx: number) => {
					return (
						<SelectItem key={idx} value={meal.id}>{meal.name}</SelectItem>
					)
				})}
			</SelectContent>
		</Select>
	)
}