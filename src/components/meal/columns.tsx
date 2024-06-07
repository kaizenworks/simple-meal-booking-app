"use client"

import { convertDateString } from "@/lib/datetime.util";
import { IMeal } from "@/models/Meal";
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<IMeal>[] = [
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      let dateString = convertDateString(row.getValue('createdAt'));

      return <span suppressHydrationWarning>{dateString}</span>
    }
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  }
]
