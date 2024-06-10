"use client"
import { deleteShippingAction } from "@/app/admin/settings/delete-shipping.action";
import { Button } from "@/components/ui/button";
import { DialogHeader, Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export function DeleteShippingButton({ id, name }: { id: string, name: string }) {
	const [open, setOpen] = useState(false);
	const queryClient = useQueryClient();


	// const deleteAction = deleteMeal.bind(null, id);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="ghost" className="w-full justify-start" size="sm">Delete</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Delete &quot;{name}&quot; ?</DialogTitle>
					<DialogDescription>
						This will permanently delete &quot;{name}&quot; and cannot be undone.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<form onSubmit={(event) => {
						event.preventDefault();
						deleteShippingAction({ id }).then(() => {
							setOpen(false)
						});

					}}
					>
						<Button type="submit">Confirm</Button>
					</form>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}