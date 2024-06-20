'use client'

import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { IOrder } from "@/models/Order";
import { getOrders } from "@/lib/queryFns/get-orders";
import { OrderSearchForm } from "./search-form.client";
import { EmptyTable } from "../empty-table";

export interface iOrderListPageQuery {
	query: string | null,
	status: string | null,
	mealId: string | null,
	shippingId: string | null,
}

export default function OrderListTable() {

	const params = useSearchParams();
	const [pageQuery, setPageQuery] = useState<iOrderListPageQuery>({
		query: '',
		status: '',
		mealId: '',
		shippingId: ''
	})

	useEffect(() => {
		setPageQuery({
			query: params.get('query'),
			status: params.get('status'),
			mealId: params.get('mealId'),
			shippingId: params.get('shippingId')
		})
	}, [params])

	const { data, isPending } = useQuery({ queryKey: ['orders', pageQuery], queryFn: () => getOrders(pageQuery) })

	if (isPending) return <EmptyTable message="Loading orders." />
	return (
		<>
			{data && (<DataTable columns={columns} data={data.data as IOrder[]} />)}
		</>
	);
}

