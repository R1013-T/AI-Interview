import { HiOutlineInformationCircle } from 'react-icons/hi2'

import { Alert, AlertDescription } from '@/components/ui/alert'
import type { Interview } from '@/types/interview'

export default function StartInfo({ interview }: { interview: Interview }) {
  if (!interview) return null

  return (
    <Alert className="animate-show-up">
      <AlertDescription className="flex gap-2 items-center">
        <HiOutlineInformationCircle className="w-6 h-6" />
        <p>{`入社形態「${interview.employmentType === 'newGraduate' ? '新卒' : '中途'}」、職業「${interview.occupation}」`}</p>
      </AlertDescription>
    </Alert>
  )
}
