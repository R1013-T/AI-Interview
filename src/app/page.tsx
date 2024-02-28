import AuthLink from "@/components/common/auth-link";
import Logo from "@/components/common/logo";
import TopHeader from "@/components/header";

export default function Home() {
  return (
    <main className="flex flex-col h-screen">
      <TopHeader />
      <article className="flex justify-center items-center p-3 h-full" >
        <AuthLink />
      </article>
    </main>
  )
}
