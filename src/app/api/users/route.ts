import db from "@/lib/db";
import { escapeRegex } from "@/lib/escape-regex";
import User, { IUser } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
	await db.connect();

  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query')

	let dbQuery: any = {}
	if(query) dbQuery['name'] = new RegExp( escapeRegex(query) , "i")

  let users = await User.find(dbQuery).sort({_id:-1});

  users = users.map((user:IUser)=>{return user.toJSON()})
   
	return NextResponse.json({ data: users })
  }
  