import { NextResponse } from "next/server";
import { parse } from "csv-parse/sync";

export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get("file");

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Convert buffer to string (CSV content)
        const csvContent = buffer.toString("utf-8");

        // Parse CSV data into JSON
        const records = parse(csvContent, { columns: true, skip_empty_lines: true });

        return NextResponse.json({ message: "File uploaded successfully!", data: records });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
