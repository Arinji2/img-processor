import fs from "fs";
import path from "path";
import sharp from "sharp";

/**
 * Resizes a WebP image to multiple sizes
 * @param {string} fileName - Base name for the output files
 * @param {string} inputPath - Path to the WebP image
 * @param {Record<string, number>} sizes - Object mapping size names to width in pixels
 * @param {string} outputDir - Directory where resized images will be saved
 * @returns {Promise<void>} - A promise that resolves when all resizing operations are complete
 */
export async function resizeWebP(
  fileName: string,
  inputPath: string,
  sizes: Record<string, number>,
  outputDir: string,
): Promise<void> {
  try {
    console.log(`Starting resize operation for: ${inputPath}`);

    if (!fs.existsSync(inputPath)) {
      throw new Error(`Input file does not exist: ${inputPath}`);
    }

    const inputImage = sharp(inputPath);

    for (const [sizeName, width] of Object.entries(sizes)) {
      try {
        const outputPath = path.join(outputDir, `${fileName}_${sizeName}.webp`);
        console.log(`Resizing to ${sizeName} (${width}px): ${outputPath}`);

        await inputImage
          .clone()
          .resize({
            width: width,
            kernel: "lanczos3",
          })
          .webp({ quality: 95 })
          .toFile(outputPath);

        console.log(`Successfully resized to ${sizeName}`);
      } catch (sizeError) {
        console.error(`Error resizing to ${sizeName}:`, sizeError);
        throw sizeError;
      }
    }

    console.log("All resize operations completed successfully");
  } catch (error) {
    console.error(`Error in resizeWebP:`, error);
    throw new Error(`Error resizing WebP: ${(error as Error).message}`);
  }
}
