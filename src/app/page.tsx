import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <div className="flex flex-col lg:flex-row items-center bg-[#2B2929] dark:bg-slate-800">
        <div className="p-10 flex flex-col bg-[#2B2929] dark:bg-slate-800 text-white space-y-3">
          <h1 className="text-3xl font-bold lg:text-5xl">
            Welcome to Dropbox Clone. <br />
            Storing everything for you and your business needs. All in one place
          </h1>

          <p className="pb-4 lg:pb-20">
            Enhance your personal storage with Dropbox, offering a simple and efficient way to upload, organize, and access files from anywhere. Securely store important documents and media, and experience the convenience of easy file management and sharing in one centralized solution.
          </p>

          <Link href="/dashboard" className="flex cursor-pointer bg-blue-500 p-5 w-fit">
            Try it for free!
            <ArrowRight className="ml-10"/>
          </Link>
          </div> 
          <div className="bg-[#1E1919] dark:bg-slate-800 h-full p-4 lg:p-10">
            <video autoPlay loop muted className="roudend-lg">
              <source
                src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
      </div>


      <p className="text-center font-bold text-xl pt-5">Disclaimer by Pedro Martins</p>
      <p className="text-center font-light text-xs p-4 lg:text-base max-w-full">This site is a clone of Dropbox. I am not a affiliate with Dropbox or/and any of its subsidiaries in any from. Copyright Disclaimer under section 107 of the Copyright Acr 1976, allowance is made for fair use of this site for education purposes.</p>
    </main>
  );
}
