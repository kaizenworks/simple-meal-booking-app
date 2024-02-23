import db from "@/lib/db";
import Meal, { IMeal } from "@/models/Meal";

export async function GET(request: Request) {
	await db.connect();

  let meals = await Meal.find({});

  meals = meals.map((meal:IMeal)=>{return meal.toJSON()})
   
	return Response.json({ data: meals })
  }
  