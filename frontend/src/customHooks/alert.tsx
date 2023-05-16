import { useCallback, useState } from "react";
import Alert, { Props } from "../components/general/Alert/Alert";

function useAlert(){

    const [ isVisible, setIsVisible ] = useState<boolean>(false);
    const [ alertProps, setAlertProps ] = useState<Props>({
        backgroundColor: "black",
        message: "message"
    })
    const [ timeoutId, setTimeoutId ] = useState<number | undefined >();
    
    const alert = useCallback((props: Props) => {

        clearTimeout(timeoutId)
        setAlertProps(props)
        setIsVisible(true);
        const timeout = window.setTimeout(() => {
            setIsVisible(false);
        }, 2000)
        setTimeoutId(timeout);
    },[timeoutId])


    const AlertComponent = isVisible ? <Alert {...alertProps} /> : null;

    return { AlertComponent, alert };
}

export default useAlert;