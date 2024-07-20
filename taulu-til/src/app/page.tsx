import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Image from "next/image";

export default function Home() {
  return (
   <div className="bg-slate-50">
      <section>
      <MaxWidthWrapper className='pb-24 pt-10 lg:grid sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52 lg:min-h-screen'>
          <div className='col-span-3 px-6 lg:px-0 lg:pt-4 '>
            <div className='relative mx-auto text-center  flex flex-col items-center lg:items-start'>
              <div className='absolute w-28 left-0 -top-20 hidden lg:block'>
                {/* i forgot this div right here in the video, it's purely visual gradient and looks nice */}
                <div className='absolute inset-x-0 bottom-0 bg-gradient-to-t via-slate-50/50 from-slate-50 h-28' />
              </div>
              <h1 className='relative w-fit tracking-tight text-balance mt-16 font-bold !leading-tight text-gray-900 text-5xl md:text-6xl lg:text-7xl'>
                Learn the Karachay Language{' '}
                <span className='bg-green-600 px-2 text-white'>Coming Soon</span>{' '}
              </h1>
              </div>
            </div>
        </MaxWidthWrapper>
      </section>
   </div>
  );
}
