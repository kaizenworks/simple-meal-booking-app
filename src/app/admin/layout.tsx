import { auth, signIn } from "@/auth";
import Navbar from "@/components/navbar";
import NavbarAdmin from "@/components/navbar-admin";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: {
    template: '%s | Meal Ordering App',
    default: 'Simple Meal Ordering App',
  },
  description: "Simple Meal Ordering App Demo by Kaizenworks",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth();

  if (!session) return signIn();

  return (
    <>
      <NavbarAdmin />
      <div className="container py-5 mx-auto">
        {children}
      </div>
    </>
  );
}
