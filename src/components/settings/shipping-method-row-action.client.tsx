"use client"
import { IShippingMethod } from "@/models/ShippingMethod";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DialogHeader, Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Ellipsis } from "lucide-react";
import { useState } from "react";
import ShippingForm from "./shipping-form";
import { deleteShippingAction } from "@/app/admin/settings/delete-shipping.action";

interface ShippingMethodRowActionProps {
	method: IShippingMethod;
}

export default function ShippingMethodRowAction({ method }: ShippingMethodRowActionProps) {

	const [openEdit, setOpenEdit] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" size="icon">
						<Ellipsis className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem onClick={() => setOpenEdit(true)}>Edit</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setOpenDelete(true)}>Delete</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<Dialog open={openEdit} onOpenChange={setOpenEdit}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Edit {method.name} ?</DialogTitle>
						<DialogDescription>
							<ShippingForm method={method} onSubmit={() => setOpenEdit(false)} />
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>

			<Dialog open={openDelete} onOpenChange={setOpenDelete}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Delete &quot;{method.name}&quot; ?</DialogTitle>
						<DialogDescription>
							This will permanently delete &quot;{method.name}&quot; and cannot be undone.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<form onSubmit={(event) => {
							event.preventDefault();
							deleteShippingAction({ id: method.id }).then(() => {
								setOpenDelete(false)
							});

						}}
						>
							<Button type="submit">Confirm</Button>
						</form>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	)

}