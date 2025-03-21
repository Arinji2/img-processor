import path from "path";
import sharp from "sharp";
/**
 * Converts a WebP image to PNG format
 * @param {string} inputPath - Path to the WebP image
 * @param {string} outputPath - Path where the PNG image will be saved
 * @returns {Promise<void>} - A promise that resolves when conversion is complete
 */
export async function convertWebPToPNG(inputPath, outputPath) {
    try {
        console.log(`Converting WebP to PNG: ${inputPath} -> ${outputPath}`);
        if (path.extname(outputPath) !== ".png") {
            outputPath += ".png";
        }
        await sharp(inputPath).png().toFile(outputPath);
        console.log(`WebP to PNG conversion complete: ${outputPath}`);
    }
    catch (error) {
        console.error(`WebP to PNG conversion error for ${inputPath}:`, error);
        throw new Error(`Error converting WebP to PNG: ${error.message}`);
    }
}
/**
 * Converts a PNG image to WebP format
 * @param {string} inputPath - Path to the PNG image
 * @param {string} outputPath - Path where the WebP image will be saved
 * @returns {Promise<void>} - A promise that resolves when conversion is complete
 */
export async function convertPNGToWebP(inputPath, outputPath) {
    try {
        console.log("Starting PNG to WebP conversion");
        if (path.extname(outputPath) !== ".webp") {
            outputPath += ".webp";
        }
        await sharp(inputPath).webp({ quality: 95 }).toFile(outputPath);
        console.log("Conversion completed successfully. Output Path:", outputPath);
    }
    catch (error) {
        console.error(`PNG to WebP conversion error for ${inputPath}:`, error);
        throw new Error(`Error converting PNG to WebP: ${error.message}`);
    }
}
