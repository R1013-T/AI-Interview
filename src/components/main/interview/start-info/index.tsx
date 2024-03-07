'use client'

import { useSearchParams } from 'next/navigation'
import { HiOutlineInformationCircle } from 'react-icons/hi2'

import { Alert, AlertDescription } from '@/components/ui/alert'

export default function StartInfo() {
  const searchParams = useSearchParams()
  const occupation = searchParams.get('occupation')
  const employmentType = searchParams.get('employmentType')

  return (
    <Alert>
      <AlertDescription className="flex gap-2 items-center">
        <HiOutlineInformationCircle className="w-6 h-6" />
        <p>{`入社形態「${employmentType === 'newGraduate' ? '新卒' : '中途'}」、職業「${occupation}」で面接を始めます。`}</p>
      </AlertDescription>
    </Alert>
  )
}
