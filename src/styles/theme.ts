import { DefaultTheme } from 'styled-components';

export const getDefaultTheme = (): DefaultTheme => {
	const defaultTheme: DefaultTheme = {
		sizing: {
			common: {
				content: '1600px',
				header: '60px'
			}
		}
	};
	return defaultTheme;
};

export const theme = getDefaultTheme();
