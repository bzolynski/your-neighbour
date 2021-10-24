import 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		sizing: {
			common: {
				content: string;
				header: string;
			};
		};
	}
}
