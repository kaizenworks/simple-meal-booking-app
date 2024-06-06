import { LogInForm } from "@/components/auth/log-in-form.client";
import { Toaster } from "@/components/ui/toaster";

export default function SignInPage() {

	return (
		<div className="flex items-center justify-center h-screen">
			<LogInForm />
			<Toaster />
		</div>
	)
}