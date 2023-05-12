import { useState } from "react";
import Alert, { Props } from "../components/general/Alert/Alert";

function useAlert(){

    const [ isVisible, setIsVisible ] = useState<boolean>(false);
    const [ alertProps, setAlertProps ] = useState<Props>({
        backgroundColor: "black",
        message: "message"
    })
    const alert = (props: Props) => {
        setAlertProps(props)
        setIsVisible(true);
        setTimeout(() => {
            setIsVisible(false);
        }, 2000)
    }

    const AlertComponent = isVisible ? <Alert {...alertProps} /> : null;

    return { AlertComponent, alert };
}

export default useAlert;