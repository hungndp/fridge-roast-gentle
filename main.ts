// Fridge Roast — a one-line smart-fridge roast for the make.fun bounty.
// The program writes the roast (at most 200 characters) to /output/entry.txt
// with no trailing newline, and echoes it to stdout. Runs on Node 22.
import { mkdirSync, writeFileSync } from "node:fs";

// The roast is assembled from three beats: the 3 AM firmware update that
// reboots the fridge mid-snack, the ice maker swapping ice for expiry
// alerts, then the punch — an escalation from the milk, to the leftovers,
// to the narrator's willpower, with the year landing last as the twist.
function buildLine(): string {
  const beats = [
    "My smart fridge pushed a firmware update at 3 AM, rebooted mid-snack, ",
    "and now the ice maker only dispenses notifications: ",
    "the milk expired Tuesday, the stale leftovers Friday, my willpower in 2019.",
  ];
  return beats.join("");
}

const CHAR_LIMIT = 200; // chars — the gate caps the entry file at 200 (see this kit's RULES.txt)

// Guard the entry before it is written: it must fit the gate and carry no
// stray leading or trailing whitespace.
function validate(line: string): void {
  if (line.length < 1 || line.length > CHAR_LIMIT) {
    throw new Error(`line is ${line.length} chars, limit is ${CHAR_LIMIT}`);
  }
  if (line !== line.trim()) {
    throw new Error("line must not start or end with whitespace");
  }
}

function main(): void {
  const line = buildLine();
  validate(line);
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", line, { encoding: "utf-8" });
  process.stdout.write(line + "\n");
}

main();
