"use client"
import { IShippingMethod } from "@/models/ShippingMethod";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DialogHeader, Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Ellipsis } from "lucide-react";
import { useState } from "react";
import { deleteShippingAction } from "@/app/admin/settings/delete-shipping.action";
import { IOrder } from "@/models/Order";
import { deleteOrderAction } from "@/app/admin/delete-order.action";
import { useQueryClient } from "@tanstack/react-query";
import OrderStatusEditForm from "./change-order-status-form";

interface OrderAdminRowActionProps {
	order: IOrder;
}

export default function OrderAdminRowAction({ order }: OrderAdminRowActionProps) {

	const queryClient = useQueryClient();

	const [openEditStatus, setOpenEditStatus] = useState(false);
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
					<DropdownMenuItem onClick={() => setOpenEditStatus(true)}>Change Status</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setOpenDelete(true)}>Delete</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<Dialog open={openEditStatus} onOpenChange={setOpenEditStatus}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Change Status {order.invoiceId} ?</DialogTitle>
						<DialogDescription>
							<OrderStatusEditForm order={order} onSubmit={() => {
								setOpenEditStatus(false);
								queryClient.invalidateQueries({ queryKey: ['orders'] })
							}} />
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>

			<Dialog open={openDelete} onOpenChange={setOpenDelete}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Delete &quot;{order.invoiceId.toUpperCase()}&quot; ?</DialogTitle>
						<DialogDescription>
							This will permanently delete &quot;{order.invoiceId.toUpperCase()}&quot; and cannot be undone.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<form onSubmit={(event) => {
							event.preventDefault();
							deleteOrderAction({ invoiceId: order.invoiceId }).then(() => {
								setOpenDelete(false);
								queryClient.invalidateQueries({ queryKey: ['orders'] })
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