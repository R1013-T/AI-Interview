import { HiOutlineExclamationCircle } from 'react-icons/hi2'

interface FormErrorProps {
  message?: string
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null

  return (
    <div className="bg-red-500/20 border border-red-500 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
      <HiOutlineExclamationCircle className="h-6 w-6" />
      <p>{message}</p>
    </div>
  )
}
