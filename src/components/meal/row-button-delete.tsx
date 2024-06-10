"use client"
import { deleteMealAction } from "@/app/admin/meals/[id]/delete-meal.action";
import { Button } from "@/components/ui/button";
import { DialogHeader, Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export function DeleteMealButton({ id, name }: { id: string, name: string }) {
	const [open, setOpen] = useState(false);
	const queryClient = useQueryClient();


	// const deleteAction = deleteMeal.bind(null, id);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="destructive" size="sm">Delete</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Delete Meal - {name} ?</DialogTitle>
					<DialogDescription>
						Do you want to delete meal &quot;{name}&quot;? This will permanently delete the meal and cannot be undone.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<form onSubmit={(event) => {
						event.preventDefault();
						deleteMealAction({ mealId: id }).then(() => {
							queryClient.invalidateQueries({ queryKey: ['meals'] })
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