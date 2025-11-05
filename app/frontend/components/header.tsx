import Link from "next/link"
import { MobileMenu } from "./mobile-menu"
import { Button } from "./ui/button"

export const Header = () => {
  return (
    <div className="fixed z-50 pt-8 md:pt-14 top-0 left-0 w-full">
      <header className="flex items-center justify-between container">
        <Link href="/" className="font-sentient text-xl md:text-2xl">
          Love Fund
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/app" className="max-md:hidden">
            <Button className="bg-yellow-200 hover:bg-yellow-300 text-black font-bold">
              Go to App
            </Button>
          </Link>
          <MobileMenu />
        </div>
      </header>
    </div>
  )
}
