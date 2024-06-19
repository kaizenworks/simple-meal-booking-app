import { Card, CardTitle, CardContent, } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ShippingMethod from "@/models/ShippingMethod";
import db from "@/lib/db";
import { AddShippingButton } from "./add-shipping-button";
import { unstable_noStore } from "next/cache";
import ShippingMethodRowAction from "./shipping-method-row-action.client";

export async function getShippingMethod() {
	unstable_noStore();
	await db.connect();
	let docs = await ShippingMethod.find({})
	return docs.map(doc=>doc.toJSON())
}

export default async function ShippingMethodCard() {

	const methods = await getShippingMethod();

	return (
		<Card className="w-full mx-auto">
			<CardTitle className="p-5">
				<div className="flex gap-4 items-center">
					<span>Shipping</span>
					<AddShippingButton />
				</div>
			</CardTitle>
			<CardContent className="flex flex-col gap-4">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Shipping Method</TableHead>
							<TableHead>Charge</TableHead>
							<TableHead style={{ textAlign: 'right' }}>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{methods.length > 0 ? (
							methods.map((method, idx) => (
								<TableRow
									key={idx}
								>
									<TableCell>{method.name}</TableCell>
									<TableCell>{method.charge}</TableCell>
									<TableCell style={{ textAlign: 'right' }}>
										<ShippingMethodRowAction method={method} />
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={3} className="h-24 text-center">
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	)
}