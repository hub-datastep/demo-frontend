import { Text } from "@chakra-ui/react"
import { Bounce, toast, ToastOptions, TypeOptions } from "react-toastify"

const toastOptions: ToastOptions = {
  position: "bottom-right",
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  transition: Bounce,
  closeButton: true,
}

export const notify = (text: string, type: TypeOptions) => {
  const content = (
    <Text fontSize="md" fontWeight="medium">
      {text}
    </Text>
  )

  // Error
  if (type === "error") {
    toast.error(content, toastOptions)
  }
  // Success
  else if (type === "success") {
    toast.success(content, toastOptions)
  }
  // Warning
  else if (type === "warning") {
    toast.warning(content, toastOptions)
  }
  // Info
  else if (type === "info") {
    toast.info(content, toastOptions)
  } else {
    toast.info(content, toastOptions)
  }
}
