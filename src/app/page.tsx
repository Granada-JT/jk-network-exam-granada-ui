import Link from "next/link";
import PageContent from "@/components/layout/PageContent";

export default function Home() {
  return (
    <PageContent className="flex-col justify-center items-start py-20">
      <div className="flex flex-col gap-8">
        <h1 className="max-w-xl text-5xl font-bold leading-[1.1] tracking-tight text-white">
          Manage your workforce <span className="text-blue-500 text-6xl">effortlessly.</span>
        </h1>
        <p className="max-w-md text-xl leading-relaxed text-zinc-400">
          A streamlined platform for employee records. 
          <span className="block mt-4">
            Ready to start? {" "}
            <Link href="/register" className="text-blue-400 hover:text-blue-300 underline underline-offset-4 transition-colors">register</Link> 
            {" "}or{" "}
            <Link href="/login" className="text-blue-400 hover:text-blue-300 underline underline-offset-4 transition-colors">login</Link>
          </span>
        </p>
      </div>
      <div className="mt-12 pt-8 border-t border-zinc-800 w-full flex items-center gap-2 text-zinc-500 italic">
        <span>Developed by</span>
        <strong className="text-zinc-300 not-italic font-semibold tracking-wide">Jomar Granada</strong>
      </div>
    </PageContent>
  );
}
