import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
    console.log("Inside post method");

    console.log("Request Object", req);
    try {
        const formData = await req.formData();
        console.log("FormData = ", formData);
        const file = formData.get("file");
        
        if (!file) {
            return Response.json({ error: "No file uploaded" }, { status: 400 });
        }
        console.log("Received file =", file);

        // convert file to buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        console.log("File converted to buffer",buffer);
        

        // save file locally (in /public/uploads)
        const filePath = path.join(process.cwd(), "public", "uploads", file.name);
        await writeFile(filePath, buffer);
        console.log("File save into Public folder");
        

        // get file metadata
        const metadata = {
            name: file.name,
            size: file.size,
            type: file.type,
            uploadedAt: new Date(),
        };
        console.log("Meta data got created :",metadata);
        

        // here you could insert 'metadata' into MongoDB or another DB

        return Response.json({ success: true, metadata });

    }
    catch (err) {
        console.error(err);
        return Response.json({ error: "Upload failed" }, { status: 500 });
    }


}
