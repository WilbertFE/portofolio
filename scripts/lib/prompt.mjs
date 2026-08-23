import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";

/**
 * Shared terminal prompts for the seed/admin scripts.
 *
 * Both need a TTY. When there isn't one - a piped invocation, some editor
 * terminals - the caller should fall back to environment variables rather than
 * hanging on a read that will only ever return EOF.
 */
export function hasTty() {
  return Boolean(stdin.isTTY);
}

/** Reads a line without echoing it, so a password stays off the screen. */
async function askHidden(rl, question) {
  const redraw = () => rl.output.write("\x1b[2K\x1b[200D" + question);
  stdout.write(question);
  rl.input.on("data", redraw);
  try {
    return await rl.question("");
  } finally {
    rl.input.off("data", redraw);
    stdout.write("\n");
  }
}

/**
 * Runs `fn` with an { ask, askHidden } pair and closes the interface after.
 *
 *   const { email } = await withPrompts(async (p) => ({
 *     email: await p.ask("Email: "),
 *     password: await p.askHidden("Password: "),
 *   }));
 */
export async function withPrompts(fn) {
  const rl = readline.createInterface({ input: stdin, output: stdout });
  try {
    return await fn({
      ask: (question) => rl.question(question),
      askHidden: (question) => askHidden(rl, question),
    });
  } finally {
    rl.close();
  }
}
