'use client'

import { signOut } from "next-auth/react"
import { Button } from "../ui/button"

export const LogOutButton = ({ children }: any) => {

	return (
		<Button type="button" variant="ghost" onClick={() => signOut()}>
			{children}
		</Button>
	)
}