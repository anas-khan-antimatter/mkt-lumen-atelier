import { NextResponse } from "next/server"

interface ConsultRequest {
  spaceType: string
  budgetBand: string
  preferredTimes: string
  name?: string
  email?: string
}

const submissions: ConsultRequest[] = []

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ConsultRequest>

    if (!body.spaceType || !body.budgetBand || !body.preferredTimes) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields: spaceType, budgetBand, preferredTimes" },
        { status: 400 }
      )
    }

    const entry: ConsultRequest = {
      spaceType: body.spaceType,
      budgetBand: body.budgetBand,
      preferredTimes: body.preferredTimes,
      name: body.name || "Anonymous",
      email: body.email || "",
    }

    submissions.push(entry)

    console.log("[Consult Submission]", JSON.stringify(entry, null, 2))

    return NextResponse.json({
      ok: true,
      message: "Your consultation request has been received. We'll be in touch within 2 business days.",
      submissionId: `CS-${Date.now()}`,
      fallback: true,
    })
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: "Invalid request body" },
      { status: 400 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    totalSubmissions: submissions.length,
    submissions: submissions.slice(-10).reverse(),
  })
}