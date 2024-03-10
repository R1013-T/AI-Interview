import { toast } from 'sonner'

import { Button } from '@/components/ui/button'

export default function FinishButton({ disabled }: { disabled: boolean }) {
  return (
    <Button
      className=""
      disabled={disabled}
      onClick={() => {
        toast.info(
          '採点機能はまだ実装されていません。アップデートをお待ち下さい。',
        )
      }}
    >
      面接を終了し、結果を採点する。
    </Button>
  )
}
