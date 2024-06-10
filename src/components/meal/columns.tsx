"use client"

import { convertDateString } from "@/lib/datetime.util";
import { IMeal } from "@/models/Meal";
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link";
import { DeleteMealButton } from "./row-button-delete";

export const columns: ColumnDef<IMeal>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return <Link href={`/admin/meals/${row.original.id}`}>{row.getValue('name')}</Link>
    }
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      let dateString = convertDateString(row.getValue('createdAt'));

      return <span suppressHydrationWarning>{dateString}</span>
    }
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <DeleteMealButton id={row.original.id} name={row.original.name} />
      )
    }
  }
]
