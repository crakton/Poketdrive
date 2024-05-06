import { useQuery } from '@tanstack/react-query';
import { fetch } from '../api';

interface IQueryRequest {
    key: string | string[];
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    url: string;
    params?: any; // data to be sent to the server
}

const request = ({ key, method, url, params }: IQueryRequest) => {
    const { data, isError, error, isLoading } = useQuery({
        queryKey: [key],
        queryFn: () => {
            fetch({
                method,
                url,
                data: params,
            })
        }
    });

    return { data, isError, error, isLoading };
}

export default request;