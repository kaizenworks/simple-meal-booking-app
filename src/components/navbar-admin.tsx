import Link from "next/link"
import { LogOutButton } from "./auth/log-out-button.client"

export default function NavbarAdmin() {

	return (
		<nav className="navbar bg-blue">
			<div className="container py-5 mx-auto flex items-center gap-4">
				<Link href="/admin" className="text-lg font-bold">Meal Booking App</Link>
				<div className="flex gap-4 me-auto">
					<Link href="/admin">Orders</Link>
					<Link href="#">Meals</Link>
					<Link href="#">Shipping Methods</Link>
					<Link href="#">Users</Link>
				</div>
				<div className="flex gap-4">
					<LogOutButton>Log Out</LogOutButton>
				</div>
			</div>
		</nav>
	)
}