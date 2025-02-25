import multer from 'multer';
import { promisify } from 'util';
import fs from 'fs';
import csv from 'csv-parser';
import { NextResponse } from 'next/server';

const upload = multer({ dest: 'uploads/' });
const uploadMiddleware = promisify(upload.single('file'));

export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get('file');

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const results = [];
        const filePath = `uploads/${file.name}`;

        // Save the uploaded file
        const buffer = Buffer.from(await file.arrayBuffer());
        fs.writeFileSync(filePath, buffer);

        // Parse CSV and wait for completion
        await new Promise((resolve, reject) => {
            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', () => {
                    fs.unlinkSync(filePath); // Clean up file after parsing
                    resolve();
                })
                .on('error', (error) => {
                    fs.unlinkSync(filePath); // Clean up file on error
                    reject(error);
                });
        });

        return NextResponse.json({ 
            message: 'File uploaded and processing completed', 
            data: results 
        });
    } catch (error) {
        return NextResponse.json({ 
            error: 'File upload or processing failed', 
            details: error.message 
        }, { status: 500 });
    }
}
