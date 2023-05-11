import { useState, useEffect, SetStateAction, Dispatch } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, CancelTokenSource} from 'axios';

interface useApiProps {
    url: string,
    options?: AxiosRequestConfig,
    fetch?: boolean
}

type useApiOutput<T> = [
    T | null,
    AxiosError | null,
    boolean,
    Dispatch<SetStateAction<boolean>>,
    (() => void) | undefined
]

function useApi<T>({url, options = { method: 'GET'}, fetch = true}: useApiProps): useApiOutput<T>{

    const [ response, setResponse ] = useState<T | null>(null);
    const [ error, setError ] = useState<AxiosError | null>(null);
    const [ loading, setLoading ] = useState<boolean>(fetch);
    const [ cancel, setCancel ] = useState<CancelTokenSource | null>(null);
    const [ shouldFetch, setShouldFetch ] = useState<boolean>(fetch);

    useEffect(() => {
        const source = axios.CancelToken.source();
        setCancel(source);
        if(shouldFetch){
            setLoading(true);
            axios(url,{
                ...options,
                cancelToken: source.token
            }).then((res: AxiosResponse) => {
                setResponse(res.data)
                setLoading(false)
            }).catch((error) => {
                if(!axios.isCancel(error)){
                    setError(error)
                    setLoading(false)
                }
            })
        }
        
        return () => {
            source.cancel("API Request was cancelled!")
        }
    },[shouldFetch])

    return [ response, error, loading, setShouldFetch, cancel?.cancel ]
}

export default useApi;