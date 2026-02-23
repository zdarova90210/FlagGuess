import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

const SVG_DIR = path.join(ROOT, "src/app/assets/img/all-flags-svg");
const PNG_DIR = path.join(ROOT, "src/app/assets/img/all-flags-png");
const OUT_FILE = path.join(ROOT, "src/app/data/countries.generated.json");

function listFiles(dirAbs, allowedExts) {
  if (!fs.existsSync(dirAbs)) return [];
  const entries = fs.readdirSync(dirAbs, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => allowedExts.includes(path.extname(name).toLowerCase()));
}

function normalizeCode(rawCode) {
  return rawCode.trim().toUpperCase();
}

function makeAssetPath(kind, filename) {
  if (kind === "svg") return `assets/img/all-flags-svg/${filename}`;
  if (kind === "png") return `assets/img/all-flags-png/${filename}`;
  throw new Error(`Unknown asset kind: ${kind}`);
}

function indexByCode(files, kind) {
  const map = new Map();

  for (const file of files) {
    const base = path.basename(file, path.extname(file));
    const code = normalizeCode(base);

    if (map.has(code) && map.get(code) !== file) {
      console.warn(`Duplicate ${kind} code detected: ${code} (${map.get(code)} vs ${file})`);
    }

    map.set(code, file);
  }

  return map;
}

const regionNamesEn = new Intl.DisplayNames(["en"], { type: "region" });
const regionNamesRu = new Intl.DisplayNames(["ru"], { type: "region" });

function deriveCountryName(code) {
  const lowerCode = code.toLowerCase();
  if (!/^[a-z]{2}$/.test(lowerCode)) return null;

  try {
    return regionNamesEn.of(lowerCode.toUpperCase()) ?? null;
  } catch {
    return null;
  }
}

function deriveCountryNameRu(code) {
  const lowerCode = code.toLowerCase();
  if (!/^[a-z]{2}$/.test(lowerCode)) return null;

  try {
    return regionNamesRu.of(lowerCode.toUpperCase()) ?? null;
  } catch {
    return null;
  }
}

const svgFiles = listFiles(SVG_DIR, [".svg"]);
const pngFiles = listFiles(PNG_DIR, [".png"]);

if (svgFiles.length === 0 && pngFiles.length === 0) {
  console.error("No flag files found.");
  console.error(`Checked: ${path.relative(ROOT, SVG_DIR)} and ${path.relative(ROOT, PNG_DIR)}`);
  process.exit(1);
}

const svgByCode = indexByCode(svgFiles, "svg");
const pngByCode = indexByCode(pngFiles, "png");
const allCodes = new Set([...svgByCode.keys(), ...pngByCode.keys()]);

const countries = [...allCodes]
  .sort((a, b) => a.localeCompare(b))
  .map((code) => {
    const svgFile = svgByCode.get(code);
    const pngFile = pngByCode.get(code);
    const nameEn = deriveCountryName(code) ?? code;

    return {
      code,
      name: nameEn,
      nameRu: deriveCountryNameRu(code) ?? nameEn,
      flagSvgPath: svgFile ? makeAssetPath("svg", svgFile) : undefined,
      flagPngPath: pngFile ? makeAssetPath("png", pngFile) : undefined,
    };
  })
  .filter((country) => country.code && (country.flagSvgPath || country.flagPngPath));

fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
fs.writeFileSync(OUT_FILE, JSON.stringify(countries, null, 2) + "\n", "utf-8");

console.log(`Generated ${countries.length} countries -> ${path.relative(ROOT, OUT_FILE)}`);
console.log(`SVG: ${svgFiles.length}, PNG: ${pngFiles.length}`);
