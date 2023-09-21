import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export const metadata: Metadata = {
  title: 'Classroom',
  description: 'Learn and Earn',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main>
          <div className="border-b py-1">
            <nav
              className='flex'

            >
              <div className={cn("flex items-center space-x-4 lg:space-x-6 grow")}>
              <Link
                href="/home"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Home
              </Link>
              <Link
                href="/classroom"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Classroom
              </Link>
              </div>
              
            <div className='px-2'>
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
              



            </nav>
          </div>
          {children}

        </main>
      </body>
    </html>
  )
}
