import { NextRequest, NextResponse } from "next/server";
import { update } from "@/lib/sheetUpdater";
export async function POST(req : NextRequest , res : NextResponse) {
    try {
        const body = await req.json();
        const playersString = body.players
  .map((p : any, i : number) => `P${i + 1}: ${p.uid || 'N/A'}`)
  .join(' | \n');
        const res = await update([body.teamName , body.name , body.contact , body.playerType , body.gameType , playersString , body.transactionId]);
        console.log("Google Sheets API response:", res);
        return NextResponse.json({
            message : "Data saved succefully !!!",
            success : true
        } , {status : 200})
    } catch (error) {
        return NextResponse.json({
            message : "Internal server error !!!",
            success : false
        } , {status : 500})
    }
}
