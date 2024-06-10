import db from "@/lib/db";
import { escapeRegex } from "@/lib/escape-regex";
import Meal, { IMeal } from "@/models/Meal";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
	await db.connect();

  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query')

	let dbQuery: any = {}
	if(query) dbQuery['name'] = new RegExp( escapeRegex(query) , "i")

  let meals = await Meal.find(dbQuery).sort({_id:-1});

  meals = meals.map((meal:IMeal)=>{return meal.toJSON()})
   
	return NextResponse.json({ data: meals })
  }
  