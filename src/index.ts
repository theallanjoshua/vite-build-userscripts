import { build, type Plugin } from 'vite';
import { getUserscriptHeaderComment, type UserscriptHeaders } from '~/utils/userscript-headers.js';

interface Script {
	headers: UserscriptHeaders;
	entry: string;
	outDir: string;
	outFileName?: string;
}

export interface BuildUserscriptsOptions {
	plugins?: Plugin[];
	scripts: Script[];
}

export async function buildUserscripts(options: BuildUserscriptsOptions) {
	const { scripts, plugins = [] } = options;

	for (const script of scripts) {
		const { entry, outDir, outFileName = 'script.user.js', headers } = script;

		const userscriptHeaderComment = getUserscriptHeaderComment(headers);

		await build({
			configFile: false,
			build: {
				outDir,
				emptyOutDir: false, // Prevents subsequent builds from deleting previous files
				minify: false,
				lib: {
					entry,
					formats: ['iife'],
					name: 'userscript',
					fileName: () => outFileName,
				},
			},
			plugins: [
				...plugins,
				{
					name: 'vite-build-userscripts-inject-userscript-header-comment',
					generateBundle(_, bundle) {
						for (const [_, chunk] of Object.entries(bundle)) {
							if (chunk.type === 'chunk' && chunk.isEntry) {
								chunk.code = `${userscriptHeaderComment}\n${chunk.code}`;
							}
						}
					},
				},
			],
		});
	}
}
