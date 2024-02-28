import TopHeader from '@/components/header'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <TopHeader />
      <main className="p-3 pt-16 h-full">{children}</main>
    </>
  )
}
