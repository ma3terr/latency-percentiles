import {readFileSync} from "node:fs";
import {pathToFileURL} from "node:url";

export function run(input) {
  if (input.some(value => !Number.isFinite(value) || value < 0)) throw new Error("Invalid latency");
  const sorted = [...input].sort((a, b) => a - b);
  return Object.fromEntries([50, 95, 99].map(percentile => [
    "p" + percentile, sorted[Math.ceil(sorted.length * percentile / 100) - 1] ?? null
  ]));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    if (process.argv.length !== 3) throw new Error("Usage: node index.mjs INPUT.json");
    const input = JSON.parse(readFileSync(process.argv[2], "utf8"));
    console.log(JSON.stringify(run(input), null, 2));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
