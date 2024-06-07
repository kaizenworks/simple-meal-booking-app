import { iOrderListPageQuery } from "@/components/order/list-table.client";
import { objectToQueryString } from "@/lib/objectToQueryString";

export function getOrders(query:iOrderListPageQuery) {
	
	let queryString = objectToQueryString(query);

	let url = `/api/orders?${queryString}`

	return fetch(url)
	.then(response=>response.json())
}