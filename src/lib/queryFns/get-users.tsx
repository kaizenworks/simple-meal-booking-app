import { iUserListPageQuery } from "@/components/user/list-table.client";
import { objectToQueryString } from "@/lib/objectToQueryString";

export function getUsers(query?:iUserListPageQuery) {
	
	let url = `/api/users`;
	
	if(query) {
		let queryString = objectToQueryString(query);
		url += `?${queryString}`;
	}

	return fetch(url)
	.then(response=>response.json())
}