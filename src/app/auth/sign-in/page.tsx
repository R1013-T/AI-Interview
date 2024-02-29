import SignIn from "@/components/auth/auth-card/credentials/sign-in";
import BackButton from "@/components/common/buttons/back-button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignInPage() {
  return (
    <article className="h-full overflow-y-auto relative">
      <div className="absolute top-0 left-0">
        <BackButton href="/auth" />
      </div>
      <div className="h-full grid place-items-center">
        <Card className="w-full md:max-w-lg md:min-w-sm md:w-1/2">
          <CardHeader>
            <CardTitle>
              <p className="text-center tracking-wide text-sm md:text-lg">
                AI模擬面接を始める
              </p>
            </CardTitle>
          </CardHeader>
          <CardContent className="max-w-md mx-auto">
            <SignIn />
          </CardContent>
          <CardFooter className="max-w-md mx-auto text-white/50 text-sm">
            <BackButton href="/auth" />
          </CardFooter>
        </Card>
      </div>
    </article>
  )
}
