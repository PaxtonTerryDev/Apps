'use server';
import path from 'node:path';
import AdmZip from 'adm-zip';

export async function downloadComponentFiles(filePath: string): Promise<string> {
	try {
		// Resolve the folder path
		const folderPath = path.resolve(process.cwd(), filePath);
		const zip = new AdmZip();

		// Add the folder to the ZIP file
		zip.addLocalFolder(folderPath);

		// Generate the ZIP buffer
		const buffer = await zip.toBufferPromise();

		// Convert the buffer to a Base64 string
		return buffer.toString('base64');
	} catch (error) {
		console.error('Error creating ZIP file:', error);
		throw new Error('Failed to create ZIP file');
	}
}
