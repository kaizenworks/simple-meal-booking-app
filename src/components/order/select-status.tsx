import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ControllerRenderProps, FieldValues } from "react-hook-form"
import { FormControl } from "@/components/ui/form"
import { Button } from "@/components/ui/button"

interface iSelectStatus {
	field: ControllerRenderProps<FieldValues,'status'>
}

export default function SelectStatus({ field }: iSelectStatus) {

	return (
		<Select onValueChange={field.onChange} defaultValue={field.value}>
			<FormControl>
				<SelectTrigger>
					<SelectValue placeholder="Select Status" />
				</SelectTrigger>
			</FormControl>
			<SelectContent>
				<SelectItem value="pending">Pending</SelectItem>
				<SelectItem value="processing">Processing</SelectItem>
				<SelectItem value="completed">Completed</SelectItem>
				<SelectItem value="cancelled">Cancelled</SelectItem>
			</SelectContent>
		</Select>
	)
}