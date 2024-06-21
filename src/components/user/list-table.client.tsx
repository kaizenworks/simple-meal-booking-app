'use client'

import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { getUsers } from "@/lib/queryFns/get-users";
import { EmptyTable } from "../empty-table";
import { IUser } from "@/models/User";

export interface iUserListPageQuery {
	query: string | null
}

export default function UserListTable() {

	const params = useSearchParams();
	const [pageQuery, setPageQuery] = useState<iUserListPageQuery>({
		query: null,
	})

	useEffect(() => {
		setPageQuery({
			query: params.get('query')
		})
	}, [params])

	const { data, isPending } = useQuery({ queryKey: ['users', pageQuery], queryFn: () => getUsers(pageQuery) })

	if (isPending) return <EmptyTable message="Loading users." />

	return (
		<>
			{data && <DataTable columns={columns} data={data.data as IUser[]} />}
		</>
	);
}

