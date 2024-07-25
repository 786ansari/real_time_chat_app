import { toast } from "react-toastify"

export const ToastContainer = (status,message) => {
    if(status){
        toast.success(message)
    }
    else{
        toast.error(message)
    }

}