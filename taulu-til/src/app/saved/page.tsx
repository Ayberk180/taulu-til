import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import SavedWords from '@/components/savedWords'
import SearchBarModal from '@/components/searchBarModal'
import React from 'react'

export default async function saved() {
    
  return (
    <div>
        <section className="bg-green-600 w-full h-1/6 overflow-visible">
          <MaxWidthWrapper className="pb-10 pt-10 lg:grid sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-10 xl:pt-10 lg:pb-24">
            <SearchBarModal/>
          </MaxWidthWrapper>
        </section>
        <section>
          <SavedWords/>
        </section>
    </div>
  )
}
