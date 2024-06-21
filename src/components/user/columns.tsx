"use client"

import { IUser } from "@/models/User";
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link";

export const columns: ColumnDef<IUser>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return <Link href={`/admin/users/${row.original.id}`}>{row.getValue('name')}</Link>
    }
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      return <div>{row.original.role.toUpperCase()}</div>
    }
  },
  {
    accessorKey: "email",
    header: "Email"
  },
  {
    accessorKey: "createdAt",
    header: "Created Date",
    cell: ({ row }) => {
      let date = new Date(row.original.createdAt);

      return <span suppressHydrationWarning>{date.toDateString() ?? 'na'}</span>
    }
  }
]
