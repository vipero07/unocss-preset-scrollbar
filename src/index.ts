import type { Preset } from 'unocss'
import { colorResolver } from '@unocss/preset-mini/utils';

export function presetScrollbar(): Preset {
	return {
		name: 'unocss-preset-scrollbar',
		variants: [
			(matcher) => {
				const matches = matcher.match(
					/^(resizer|scrollbar(?:-(?:thumb|track(?:-piece)?|button|corner))?):/
				);
				if (!matches) {
					return matcher;
				}
				return {
					matcher: matcher.slice(matches[0].length),
					selector: (s) => `${s}::-webkit-${matches[1]}`
				};
			}
		],
		rules: [
			[
				/^scroll(?:bar)?-(thin|none|auto)$/,
				([, w]) => ({
					'scrollbar-width': w
				})
			],
			[
				/^scroll(?:bar)?-(track|thumb)-(.+)$/,
				([s, section, colorMatch], context) => {
					const varName = `scroll${section}-bg`;
					const opacityVarName = `--un-${varName}-opacity`;
					const colorVarName = `--un-${varName}`;
					const res = colorResolver('color', varName)([s, colorMatch], context);

					if (!res) {
						return;
					}

					const color = res['color'];
					const opacity = res[opacityVarName];

					if (!color) {
						return;
					}

					if (opacity) {
						return {
							[opacityVarName]: opacity,
							[colorVarName]: color,
							'scrollbar-color': 'var(--un-scrollthumb-bg) var(--un-scrolltrack-bg)'
						};
					}

					return {
						[colorVarName]: color,
						'scrollbar-color': 'var(--un-scrollthumb-bg) var(--un-scrolltrack-bg)'
					};
				}
			]
		]
	};
}
export default presetScrollbar;
