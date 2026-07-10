import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Menggantikan __dirname karena tidak tersedia di ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Arahkan ke folder tempat 91 gambar.webp.webp mentah berada
const inputFolder = path.join(__dirname, "public/assets");

try {
  const files = fs.readdirSync(inputFolder);

  files.forEach((file) => {
    const ext = path.extname(file).toLowerCase();

    // Filter hanya file gambar.webp,.webp, atau.webp
    if (ext === ".webp" || ext === ".webp" || ext === ".webp" || ext === ".webp" || ext === ".webp" || ext === ".webp") {
      const inputPath = path.join(inputFolder, file);
      const outputPath = path.join(inputFolder, file.replace(ext, ".webp"));

      sharp(inputPath)
        .resize({ width: 1920, withoutEnlargement: true }) // Auto-resize maks lebar 1920px
        .webp({ quality: 80 }) // Kompres kualitas ke 80%
        .toFile(outputPath)
        .then(() => console.log(`Sukses: ${file} -> WebP`))
        .catch((err) => console.error(`Gagal konversi ${file}:`, err));
    }
  });
} catch (err) {
  console.error("Terjadi kesalahan saat membaca folder:", err);
}
