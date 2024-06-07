"use client"

import { convertDateString } from "@/lib/datetime.util";
import { IOrder } from "@/models/Order";
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<IOrder>[] = [
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      let dateString = convertDateString(row.getValue('createdAt'));

      return <span suppressHydrationWarning>{dateString}</span>
    }
  },
  {
    accessorKey: "invoiceId",
    header: "Invoice",
  },
  {
    accessorKey: "name",
    header: "Customer",
    cell: ({ row }) => {
      return <>

        <div>{row.getValue('name')}</div>
        <div>{row.getValue('phone')}</div>
        <div>{row.getValue('email')}</div>

      </>
    }
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "note",
    header: "Note",
  },
  {
    accessorKey: "mealName",
    header: "Meal",
    cell: ({ row }) => {
      return <>

        <div>{row.getValue('mealName')}</div>
        <div>x{row.getValue('quantity')}</div>

      </>
    }
  },
  {
    accessorKey: "total",
    header: "Total",
  }
]
