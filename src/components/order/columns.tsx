"use client"

import { convertDateString } from "@/lib/datetime.util";
import { IOrder } from "@/models/Order";
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "../ui/badge";
import OrderAdminRowAction from "./order-admin-row-action.client";

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
    cell: ({ row }) => {
      return <>{row.original.invoiceId?.toUpperCase()}</>
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      let {status} = row.original;
      return <Badge variant={status as any} size="sm">{status?.toUpperCase()}</Badge>
    }
  },
  {
    accessorKey: "name",
    header: "Customer",
    cell: ({ row }) => {
      return <>

        <div>{row.getValue('name')}</div>
        <div>{row.original.phone}</div>
        <div>{row.original.email}</div>

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
        <div>x{row.original.quantity}</div>

      </>
    }
  },
  {
    accessorKey: "days",
    header: "Dates",
    cell: ({ row }) => {
      return <>
        {row.original.days.map((day,idx)=>{
          return <div key={idx}>{(new Date(day).toLocaleDateString())} </div>
        })}
      </>
    }
  },
  {
    accessorKey: "total",
    header: "Total",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({row}) => {
     return (
      <div className="text-right">
        <OrderAdminRowAction order={row.original} /> 
      </div>
     )
    }
  }
]
