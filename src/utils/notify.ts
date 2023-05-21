import { toast } from 'react-toastify'

export const showSuccessNotification = (text: string) => toast.success(text)
export const showFailureNotification = (text: string) => toast.error(text)
