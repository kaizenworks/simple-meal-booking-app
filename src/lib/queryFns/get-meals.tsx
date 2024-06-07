import { iMealListPageQuery } from "@/components/meal/list-table.client";
import { objectToQueryString } from "@/lib/objectToQueryString";

export function getMeals(query:iMealListPageQuery) {
	
	let queryString = objectToQueryString(query);

	let url = `/api/meals?${queryString}`

	return fetch(url)
	.then(response=>response.json())
}