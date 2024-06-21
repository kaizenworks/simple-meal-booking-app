import { auth } from "@/auth";
import { ROLES } from "@/config";
import db from "@/lib/db";
import { escapeRegex } from "@/lib/escape-regex";
import User, { IUser } from "@/models/User";
import { NextAuthRequest } from "next-auth/lib";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export const GET = auth(async function GET(request: NextAuthRequest) {

  if (!request.auth) return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
  
  if (request.auth.user.role != ROLES[0]) return NextResponse.json({ message: "Not allowed" }, { status: 403 })

  await db.connect();

  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query')

  let dbQuery: any = {}
  if (query) dbQuery['name'] = new RegExp(escapeRegex(query), "i")

  let users = await User.find(dbQuery).sort({ _id: -1 });

  users = users.map((user: IUser) => { return user.toJSON() })

  return NextResponse.json({ data: users })
})
