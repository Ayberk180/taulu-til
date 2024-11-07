import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import SearchBarModal from "@/components/searchBarModal";
import DefinitionCard from "@/components/ui/definitionComponent";



export default function Page() {
    

    
    
    function getNum() {
        const expt=[0,1691,2777,4629,4889,5248,5288,5631,6087,6469,6475,8478,8526,9069,9613,9716,9748,11068,12672,13091,13099,4009,5621,6250,9432,10786,12966]
        let randomNum = Math.floor(Math.random() * (13223 - 1)) + 1
        if (expt.includes(randomNum)) {
            return getNum()
        }
        console.log(randomNum)
        return randomNum
    }

      getNum()
  return (
    <div>
      <div className="bg-slate-50 h-screen w-full sticky overflow-visible">
        <section className="bg-green-600 w-full h-1/6 overflow-visible">
          <MaxWidthWrapper className="pb-10 pt-10 lg:grid sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-10 xl:pt-10 lg:pb-24">
            <SearchBarModal/>
          </MaxWidthWrapper>
        </section>
        <section className="pt-5">
          {/* <MaxWidthWrapper>
            <DefinitionCard word={getNum().toString()} />
          </MaxWidthWrapper> */}
        </section>
      </div>
    </div>
  );
}
