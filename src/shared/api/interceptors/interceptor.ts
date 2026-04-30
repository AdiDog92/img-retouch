import { type InternalAxiosRequestConfig } from 'axios';
import { imageRetouchApi } from '../client/instance';

imageRetouchApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
	const token = localStorage.getItem('token');

	if (token) {
		config.headers.set('Authorization', `Bearer ${token}`);
	}

	return config;
});

// Add a response interceptor
imageRetouchApi.interceptors.response.use(
	function (response) {
		return response;
	},

	function (error) {
		return Promise.reject(error);
	},
);
