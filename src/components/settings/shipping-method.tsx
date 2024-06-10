import { Card, CardTitle, CardContent, } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { Button } from "../ui/button";
import { EditShippingButton } from "./edit-shipping-button.client";
import { DeleteShippingButton } from "./delete-shipping-button.client";
import ShippingMethod from "@/models/ShippingMethod";
import db from "@/lib/db";
import { AddShippingButton } from "./add-shipping-button";

async function getShippingMethod() {
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
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button variant="outline" size="icon">
													<EllipsisVertical className="h-4 w-4" />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent>

												<EditShippingButton method={method} />

												<DeleteShippingButton id={method.id} name={method.name} />
											</DropdownMenuContent>
										</DropdownMenu>
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