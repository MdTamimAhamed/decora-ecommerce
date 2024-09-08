const getBaseUrl = () => {
	if (import.meta.env.MODE === 'development') {
		return import.meta.env.VITE_BASE_URL_DEV;
	} else {
		return import.meta.env.VITE_BASE_URL_PRODUCTION;
	}
};

export const baseUrl = getBaseUrl();
