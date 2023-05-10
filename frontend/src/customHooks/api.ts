import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, CancelTokenSource} from 'axios';

interface useApiProps {
    url: string,
    options?: AxiosRequestConfig
}

type useApiOutput<T> = [
    T | null,
    AxiosError | null,
    boolean,
    (() => void) | undefined
]

function useApi<T>({url, options = { method: 'GET'}}: useApiProps): useApiOutput<T>{

    const [ response, setResponse ] = useState<T | null>(null);
    const [ error, setError ] = useState<AxiosError | null>(null);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ cancel, setCancel ] = useState<CancelTokenSource | null>(null)

    useEffect(() => {
        const source = axios.CancelToken.source();
        setCancel(source);
        axios(url,{
            ...options,
            cancelToken: source.token
        }).then((res: AxiosResponse) => {
            setResponse(res.data)
        }).catch((error) => {
            setError(error)
        })
        
        return () => {
            source.cancel("API Request was cancelled!")
        }
    },[])

    useEffect(() => {
        if(response || (error && error.name !== 'CanceledError')){
            setLoading(false)
        }
    },[response, error])

    return [ response, error, loading, cancel?.cancel ]
}

export default useApi;