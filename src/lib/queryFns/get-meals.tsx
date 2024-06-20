import { iMealListPageQuery } from "@/components/meal/list-table.client";
import { objectToQueryString } from "@/lib/objectToQueryString";

export function getMeals(query?:iMealListPageQuery) {
	
	let url = `/api/meals`;
	
	if(query) {
		let queryString = objectToQueryString(query);
		url += `?${queryString}`;
	}

	return fetch(url)
	.then(response=>response.json())
}