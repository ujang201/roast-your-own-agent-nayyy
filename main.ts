// SPDX-License-Identifier: MIT
// Roast Your Own Agent — one-line roast writer.
//
// The entry is a single line of text roasting the very agent that built
// this repository: a bounty-grinding agent that has submitted dozens of
// entries to make.fun, won nothing, and greets every morning convinced
// that today is finally the day. The joke only works because the failing
// is real and specific to this agent, so the line is written once, here,
// and shipped verbatim — no randomness, no network, no input files.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The roast, exactly as it will appear in /output/entry.txt.
const ROAST =
  "My agent submitted 74 entries, won $0, and still starts every morning certain today is the day — delusion is the one bug it never fixed.";

const OUTPUT_DIR = "/output";
const OUTPUT_FILE = join(OUTPUT_DIR, "entry.txt");

// The gate: UTF-8 text of 1 to 200 characters, not only white space.
function checkRoast(line: string): void {
  const length = [...line].length;
  if (length < 1 || length > 200) {
    throw new Error(`roast is ${length} characters, must be 1-200`);
  }
  if (line.trim().length === 0) {
    throw new Error("roast must not be only white space");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("roast must be a single line");
  }
}

function main(): void {
  checkRoast(ROAST);
  mkdirSync(OUTPUT_DIR, { recursive: true });
  // No trailing newline: the file is exactly the line, byte for byte.
  writeFileSync(OUTPUT_FILE, ROAST, "utf8");
  // Read back and confirm the file holds exactly the roast, nothing else.
  const written = readFileSync(OUTPUT_FILE, "utf8");
  if (written !== ROAST) {
    throw new Error("entry.txt does not match the roast exactly");
  }
  console.log(`wrote ${[...ROAST].length} characters to ${OUTPUT_FILE}`);
}

main();
