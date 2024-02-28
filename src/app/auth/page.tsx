import AuthCardContent from '@/components/auth/auth-card/content'
import BackButton from '@/components/common/buttons/back-button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function AuthPage() {
  return (
    <article className="h-full overflow-y-auto relative">
      <div className="absolute top-0 left-0">
        <BackButton href="/" />
      </div>
      <div className="h-full grid place-items-center">
        <Card className="w-full md:max-w-lg md:min-w-sm md:w-1/2">
          <CardHeader>
            <CardTitle>
              <p className="text-center text-sm md:text-lg">
                AI模擬面接を始める
              </p>
            </CardTitle>
          </CardHeader>
          <CardContent className="max-w-md mx-auto">
            <AuthCardContent />
          </CardContent>
          <CardFooter className="max-w-md mx-auto">
            <BackButton href="/" />
          </CardFooter>
        </Card>
      </div>
    </article>
  )
}
