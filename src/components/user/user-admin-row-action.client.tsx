"use client"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DialogHeader, Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Ellipsis } from "lucide-react";
import { useState } from "react";
import { IUser } from "@/models/User";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import ChangePasswordForm from "@/components/user/change-password-form";
import { deleteUserAction } from "@/app/admin/users/delete-user.action";

interface UserAdminRowActionProps {
	user: IUser;
}

export default function UserAdminRowAction({ user }: UserAdminRowActionProps) {

	const queryClient = useQueryClient();
	const router = useRouter();

	const [openChangePassword, setOpenChangePassword] = useState(false);
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
					<DropdownMenuItem onClick={() => setOpenChangePassword(true)}>Change Password</DropdownMenuItem>
					<DropdownMenuItem onClick={() => router.push(`/admin/users/${user.id}`) }>Edit</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setOpenDelete(true)}>Delete</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<Dialog open={openChangePassword} onOpenChange={setOpenChangePassword}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Change password for {user.name} ?</DialogTitle>
						<DialogDescription>
							<ChangePasswordForm user={user} onSubmit={() => {
								setOpenChangePassword(false);
							}} />
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>

			<Dialog open={openDelete} onOpenChange={setOpenDelete}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Delete &quot;{user.name}&quot; ?</DialogTitle>
						<DialogDescription>
							This will permanently delete &quot;{user.name}&quot; and cannot be undone.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<form onSubmit={(event) => {
							event.preventDefault();
							deleteUserAction({ id: user.id }).then(() => {
								setOpenDelete(false);
								queryClient.invalidateQueries({ queryKey: ['users'] })
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