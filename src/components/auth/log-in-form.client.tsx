"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { logInSchema } from "@/lib/zod/log-in";
import { useToast } from "@/components/ui/use-toast"


export const LogInForm = () => {

	const router = useRouter()
	const { toast } = useToast()

	const form = useForm<z.infer<typeof logInSchema>>({
		resolver: zodResolver(logInSchema),
		defaultValues: {
			email: "meal@kaizenworks.dev",
			password: "",
		},
	})

	async function onSubmit({ email, password }: z.infer<typeof logInSchema>) {

		let authResponse = await signIn("credentials", { email, password, redirect: false });
		
		if (authResponse?.error) {
			toast({
				title: "Invalid login",
				description: "Please recheck and try again.",
			})
			return;
		}

		router.push("/admin");
	}


	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} >
				<Card className="w-full mx-auto max-w-sm">
					<CardHeader>
						<CardTitle className="text-2xl">Login</CardTitle>
						<CardDescription>
							Enter your email below to login to your account.
						</CardDescription>
					</CardHeader>
					<CardContent className="grid gap-4">

						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder="m@example.com" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>password</FormLabel>
									<FormControl>
										<Input type="password"  {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

					</CardContent>
					<CardFooter>
						<Button className="w-full">Log in</Button>
					</CardFooter>
				</Card>

			</form>
		</Form>
	)
}
