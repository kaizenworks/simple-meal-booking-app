"use client"
import { Button } from "@/components/ui/button";
import { DialogHeader, Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useState } from "react";
import ShippingForm from "./shipping-form";
import { IShippingMethod } from "@/models/ShippingMethod";

export function EditShippingButton({ method }: { method: IShippingMethod }) {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
			<Button variant="ghost" className="w-full justify-start" size="sm">Edit</Button>
			</DialogTrigger>
			
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit {method.name} ?</DialogTitle>
					<DialogDescription>
						<ShippingForm method={method} onSubmit={()=>setOpen(false)} />
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}