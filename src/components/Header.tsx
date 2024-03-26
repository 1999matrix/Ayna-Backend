import Link from "next/link"
import Image from "next/image"
import { SignInButton, SignedOut, UserButton } from "@clerk/nextjs"
import { ThemeToggler } from "./ThemeToggler"

function Header() {
  return (
    <header className="flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
            <div className="bg-[blue] w-fit">
                <Image 
                    src="https://www.shareicon.net/download/2016/07/13/606936_dropbox_2048x2048.png"
                    alt="logo"
                    className="invert"
                    height={55}
                    width={55}
                />
            </div>
            <h1 className="font-bold text-2xl">Dropbox Clone</h1>
        </Link>


        <div className="flex items-center space-x-3 mr-2 lg:mr-5">
          <ThemeToggler />

          <UserButton afterSignOutUrl="/"/>
          <SignedOut>
            {/* com o mode=modal aparece perfeitamente a caixa para fazer sign in após clicar neste botão */}
            <SignInButton afterSignInUrl="/dashboard" mode="modal"/>
          </SignedOut>        
          
          </div>
    </header>
  )
}

export default Header