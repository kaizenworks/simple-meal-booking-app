import { auth } from "@/auth";
import { ROLES } from "@/config";
import { getSession } from "next-auth/react"
import Link from "next/link"
import { LogOutButton } from "./auth/log-out-button.client"

export default async function NavbarAdmin() {

	const session = await auth();

	return (
		<nav className="navbar bg-blue">
			<div className="container py-5 mx-auto flex items-center gap-4">
				<Link href="/admin" className="text-lg font-bold">Meal Booking App</Link>
				<div className="flex gap-4 me-auto">
					<Link href="/admin">Orders</Link>
					<Link href="/admin/meals">Meals</Link>
					{ session?.user?.role == ROLES[0] && <Link href="/admin/users">Users</Link> }
					<Link href="/admin/settings">Settings</Link>
				</div>
				<div className="flex gap-4">
					<LogOutButton>Log Out</LogOutButton>
				</div>
			</div>
		</nav>
	)
}