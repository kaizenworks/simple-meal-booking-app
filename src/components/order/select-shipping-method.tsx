import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ControllerRenderProps, FieldValues } from "react-hook-form"
import { FormControl } from "@/components/ui/form"
import { IShippingMethod } from "@/models/ShippingMethod";

interface iSelectShippingMethod {
	field: ControllerRenderProps<FieldValues, 'shippingId'>,
	options: IShippingMethod[];
}

export default function SelectShippingMethod({ field, options }: iSelectShippingMethod) {

	return (
		<Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
			<FormControl>
				<SelectTrigger>
					<SelectValue placeholder="Select Shipping" />
				</SelectTrigger>
			</FormControl>
			<SelectContent>
				{options && options.map((option: IShippingMethod, idx: number) => {
					return (
						<SelectItem key={idx} value={option.id}>{option.name}</SelectItem>
					)
				})}
			</SelectContent>
		</Select>
	)
}