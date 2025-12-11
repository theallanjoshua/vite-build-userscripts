import { objectEntries } from './object.js';

export interface UserscriptHeaders {
	name: string;
	description: string;
	version: string;
	namespace?: string;
	icon?: string;
	include?: string | RegExp | (string | RegExp)[];
	exclude?: string | RegExp | (string | RegExp)[];
	match?: string | RegExp | (string | RegExp)[];
	'exclude-match'?: string | RegExp | (string | RegExp)[];
	require?: string | string[];
	resource?: Record<string, string>;
	noframes?: boolean;
	copyright?: string;
	author?: string;
	homepage?: string;
	homepageURL?: string;
	website?: string;
	source?: string;
	iconURL?: string;
	defaulticon?: string;
	icon64?: string;
	icon64URL?: string;
	updateURL?: string;
	downloadURL?: string;
	supportURL?: string;
	connect?: string | string[];
	tag?: string | string[];
	'run-in'?: string | string[];
	sandbox?: 'raw' | 'JavaScript' | 'DOM';
	unwrap?: boolean;
	'inject-into'?: 'page' | 'content' | 'auto';
	license?: string;
	contributionURL?: string;
	contributionAmount?: string;
	compatible?: string;
	incompatible?: string;
	'run-at'?: 'document-start' | 'document-end' | 'document-idle' | 'document-body' | 'context-menu';
	grant?: string[];
}

export function getUserscriptHeaderComment(userscriptHeaders: UserscriptHeaders) {
	const userscriptHeaderLines = objectEntries(userscriptHeaders).reduce<string[]>((acc, [headerName, headerValue]) => {
		if (headerValue === undefined || headerValue === null) {
			return acc;
		}

		if (Array.isArray(headerValue)) {
			headerValue.forEach((value) => {
				acc.push(`// @${headerName} ${value}`);
			});
		} else {
			acc.push(`// @${headerName} ${headerValue}`);
		}

		return acc;
	}, []);

	const userscriptHeaderComment = ['// ==UserScript==', ...userscriptHeaderLines, '// ==/UserScript=='].join('\n');

	return userscriptHeaderComment;
}
