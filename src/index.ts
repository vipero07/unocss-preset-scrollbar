import { definePreset } from 'unocss'
import { colorResolver } from '@unocss/preset-mini/utils';

export const presetScrollbar = definePreset({
	name: 'unocss-preset-scrollbar',
	rules: [
		[
			/^scrollbar-gutter-both$/,
			() => ({
				'scrollbar-gutter': 'stable both-edges',
			})
		],
		[
			/^scrollbar-gutter-(auto|stable|inherit|initial|revert|revert-layer|unset)$/,
			([, p]) => ({
				'scrollbar-gutter': p,
			})
		],
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
})

export default presetScrollbar;
