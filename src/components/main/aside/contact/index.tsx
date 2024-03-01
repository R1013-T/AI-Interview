import Image from 'next/image'
import { FaGithub, FaSquareXTwitter } from 'react-icons/fa6'
import { HiEnvelope, HiHome, HiMiniIdentification } from 'react-icons/hi2'
import type { IconType } from 'react-icons/lib'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

const contactItems = [
  {
    url: 'https://www.ryu-tech.tokyo/',
    Icon: HiHome,
    name: 'Portfolio Site',
  },
  {
    url: 'https://github.com/R1013-T',
    Icon: FaGithub,
    name: 'GitHub',
  },
  {
    url: 'https://twitter.com/rtjob2023',
    Icon: FaSquareXTwitter,
    name: 'X',
  },
  {
    url: 'mailto:takahashi.ryunosuke.job@gmail.com',
    Icon: HiEnvelope,
    name: 'Mail',
  },
]

const ContactItem = ({
  url,
  Icon,
}: {
  url: string
  Icon: IconType
  name: string
}) => {
  return (
    <a href={url} target="_blank">
      <Icon className="w-7 h-7 text-foreground" />
    </a>
  )
}

export default function Contact() {
  return (
    <Sheet>
      <SheetTrigger>
        <HiMiniIdentification className="w-8 h-8" />
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle className="mb-3">お問い合わせ</SheetTitle>
          <SheetDescription>
            <p>
              AI模擬面接をご利用いただき、
              <br />
              ありがとうございます！
            </p>
            <br />
            <p>
              開発者のRYUです。
              <br />
              お問い合わせは下記のリンクからお願いします！
            </p>
            <div className="mt-10 w-full flex flex-col gap-4 items-center">
              <Image
                src="/ryu.png"
                alt="RYU"
                width={100}
                height={100}
                className="rounded-full"
              />
              <p className="text-lg">RYU</p>
              <div className="flex gap-3">
                {contactItems.map((item, i) => (
                  <ContactItem key={i} {...item} />
                ))}
              </div>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
