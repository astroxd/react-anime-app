import { toast } from 'react-toastify'

const toastStyle = {
	position: 'top-right',
	autoClose: 5000,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	theme: 'light',
}

const SuccessToast = (message) => {
	return toast.success(message, toastStyle)
}
const ErrorToast = (message) => {
	return toast.error(message, toastStyle)
}

export { SuccessToast, ErrorToast }
