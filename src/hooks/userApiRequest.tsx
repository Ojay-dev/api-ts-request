import { useState, useCallback } from 'react';
import axios, { AxiosResponse, Method } from 'axios';

type ApiRequest<T> = {
	method: Method;
	url: string;
	data?: T;
};

export function useApiRequest<T>() {
	const [error, setError] = useState<Error | null>(null);
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const [data, setData] = useState<T | null>(null);

	const fetchData = useCallback(async (request: ApiRequest<T>) => {
		try {
			const response: AxiosResponse<T> = await axios(request);
			setData(response.data);
			setIsLoaded(true);
		} catch (error) {
			const axiosError = error as Error;
			setError(axiosError);
		}
	}, []);

	const get = useCallback(
		(url: string) => fetchData({ method: 'get', url }),
		[fetchData]
	);

	const post = useCallback(
		(url: string, data?: T) => {
			setIsLoaded(false);
			fetchData({ method: 'post', url, data: data || undefined });
		},
		[fetchData]
	);

	const put = useCallback(
		(url: string, data?: T) => {
			setIsLoaded(false);
			fetchData({ method: 'put', url, data: data || undefined });
		},
		[fetchData]
	);

	const del = useCallback(
		(url: string) => {
			setIsLoaded(false);
			fetchData({ method: 'delete', url });
		},
		[fetchData]
	);

	return {
		error,
		isLoaded,
		data,
		get,
		post,
		put,
		del
	};
}
