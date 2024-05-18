import { useQuery } from '@tanstack/react-query';
import { fetch } from '../api';

/**
 * Represents the request details for a server request.
 *
 * @interface IQueryRequest
 * @property {string | string[]} key - A unique identifier for the request.
 * @property {'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'} method - The HTTP method to use for the request.
 * @property {string} url - The URL to send the request to.
 * @property {any} [params] - Data to be sent to the server.
 */
interface IQueryRequest {
    key: string | string[];
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    url: string;
    params?: any; // data to be sent to the server
    data?: any; // data to be sent to the server
}

/**
 * Makes a request to the server using the specified method and URL.
 *
 * @param {IQueryRequest} options - An object containing the request details.
 * @param {string | string[]} options.key - A unique identifier for the request.
 * @param {'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'} options.method - The HTTP method to use for the request.
 * @param {string} options.url - The URL to send the request to.
 * @param {any} [options.params] - Data to be sent to the server.
 *
 * @returns {Promise<{ data: any, isError: boolean, error: any, isLoading: boolean }>} 
 *  - A promise that resolves to an object containing the request data, error, loading status, and whether an error occurred.
 */
const request = async ({ key, method, url, params }: IQueryRequest) => {
    const { data, isError, error, isLoading } = useQuery({
        queryKey: [key],
        queryFn: () => {
            return fetch({
                method,
                url,
                data: params,
            });
        }
    });

    return { data, isError, error, isLoading };
}

export default request;