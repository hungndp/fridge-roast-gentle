// Fridge Roast — make.fun bounty entry.
// Writes the single smart-fridge roast (200 chars max) to /output/entry.txt
// (no trailing newline) and prints it to stdout. Node 22.
import { mkdirSync, writeFileSync } from "node:fs";

// The entry line, built in two parts: the setup — the fridge pushes a 3 AM
// firmware update, reboots mid-snack, and its ice maker stops dispensing ice
// and starts dispensing expiry notifications instead — then the punch,
// an escalation from the milk to the leftovers to the narrator's willpower,
// with the twist (2019) landing last.
const SETUP =
  "My smart fridge pushed a firmware update at 3 AM, rebooted mid-snack, and now the ice maker only dispenses notifications: ";
const PUNCH =
  "the milk expired Tuesday, the stale leftovers Friday, my willpower in 2019.";
const LINE = SETUP + PUNCH;
const CHAR_LIMIT = 200; // chars — the gate caps the file at 200 (this kit's RULES.txt)

function main(): void {
  if (LINE.length < 1 || LINE.length > CHAR_LIMIT) {
    throw new Error(`line is ${LINE.length} chars, limit is ${CHAR_LIMIT}`);
  }
  if (LINE !== LINE.trim()) {
    throw new Error("line must not start or end with whitespace");
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", LINE, { encoding: "utf-8" });
  process.stdout.write(LINE + "\n");
}

main();
