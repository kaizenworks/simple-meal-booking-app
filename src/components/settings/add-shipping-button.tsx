"use client"
import { Button } from "@/components/ui/button";
import { DialogHeader, Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import ShippingForm from "./shipping-form";

export function AddShippingButton() {
	const [open, setOpen] = useState(false);
	const queryClient = useQueryClient();


	// const deleteAction = deleteMeal.bind(null, id);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
			<Button size="sm">
				Add
				</Button>
			</DialogTrigger>
			
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add Shipping Charge</DialogTitle>
					<DialogDescription>
						<ShippingForm onSubmit={()=>setOpen(false)} />
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}