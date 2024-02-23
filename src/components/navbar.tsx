export default function Navbar() {
	return (
		<nav className="navbar bg-blue">
			<div className="container py-5 mx-auto flex justify-between items-center">
				<a href="/" className="text-lg font-bold">Meal Booking App</a>
				<div className="flex gap-4">
					<a href="#" className="hover:text-gray-300">Home</a>
					<a href="#" className="hover:text-gray-300">About</a>
					<a href="#" className="hover:text-gray-300">Services</a>
					<a href="#" className="hover:text-gray-300">Contact</a>
				</div>
			</div>
		</nav>
	)
}