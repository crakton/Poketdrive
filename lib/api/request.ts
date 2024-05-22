import { fetch } from '../api';

interface IRequestOptions {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    url: string;
    params?: any; // data to be sent to the server
    data?: any; // data to be sent to the server
}

const request = async ({ method, url, params }: IRequestOptions) => {
    try {
        const response = await fetch({
            method,
            url,
            data: params,
        });

        return { data: response.data, isError: false, error: null, isLoading: false };
    } catch (error) {
        return { data: null, isError: true, error, isLoading: false };
    }
}

export default request;
