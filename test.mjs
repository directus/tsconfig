import { readdir } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import c from 'tinyrainbow';
import { parseNative } from 'tsconfck';
import ts from 'typescript';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const configs = await readdir(path.join(__dirname, 'configs'));

const results = await Promise.allSettled(configs.map((config) => parseNative(`configs/${config}/tsconfig.json`)));

for (const [index, result] of results.entries()) {
	const config = configs[index];

	if (result.status === 'fulfilled') {
		log(c.green('✔'), c.bold(config));
		continue;
	}

	const message = result.reason?.diagnostic ? formatDiagnostic(result.reason.diagnostic) : String(result.reason);

	log(c.red('✖'), c.bold(config));
	log(message.replaceAll(/^/gm, '  > '));

	process.exitCode = 1;
}

function log(...message) {
	// eslint-disable-next-line no-console
	console.log(...message);
}

function formatDiagnostic(diagnostic) {
	const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');

	if (!diagnostic.file)
		return message;

	const file = path.relative('.', diagnostic.file.fileName);
	const { line, character } = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start);

	return `${file} (${line + 1},${character + 1}): ${message}`;
}
