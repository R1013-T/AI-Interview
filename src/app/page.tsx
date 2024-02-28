import AuthLink from "@/components/common/buttons/auth-link";
import TopHeader from "@/components/header";

export default function Home() {
  return (
    <main className="flex flex-col h-screen">
      <TopHeader is_link={true} />
      <article className="flex justify-center items-center p-3 h-full" >
        <AuthLink />
      </article>
    </main>
  )
}
