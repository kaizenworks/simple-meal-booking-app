import db from "@/lib/db";
import Meal, { IMeal } from "@/models/Meal";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
	await db.connect();

  let meals = await Meal.find({});

  meals = meals.map((meal:IMeal)=>{return meal.toJSON()})
   
	return NextResponse.json({ data: meals })
  }
  