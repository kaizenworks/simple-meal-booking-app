'use client'

import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { getMeals } from "@/lib/queryFns/get-meals";
import { EmptyTable } from "../empty-table";
import { IMeal } from "@/models/Meal";

export interface iMealListPageQuery {
	query: string | null
}

export default function MealListTable() {

	const params = useSearchParams();
	const [pageQuery, setPageQuery] = useState<iMealListPageQuery>({
		query: null,
	})

	useEffect(() => {
		setPageQuery({
			query: params.get('query')
		})
	}, [params])

	const { data, isPending } = useQuery({ queryKey: ['meals', pageQuery], queryFn: () => getMeals(pageQuery) })

	if (isPending) return <EmptyTable message="Loading meals." />

	return (
		<>
			{data && <DataTable columns={columns} data={data.data as IMeal[]} />}
		</>
	);
}

