import { LogInForm } from "@/components/auth/log-in-form.client";
import { Toaster } from "@/components/ui/toaster";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Login | Simple Meal Ordering App",
	description: "Simple Meal Ordering App Demo by Kaizenworks",
};

export default function LoginPage() {

	return (
		<div className="flex items-center justify-center h-screen">
			<LogInForm />
			<Toaster />
		</div>
	)
}