
import { Today } from "./Today";
import { SearchForm } from "./SearchForm";
import { NextDays } from "./NextDays";

export const App = () => (
  <div className=' px-2 md:px-4 lg:px-10 xl:px-16 2xl:px-28 max-w-[1620px] mx-auto  py-2 '>
    

    <div className="grid grid-cols-2 gap-4">
      <Today/>
      <SearchForm/>

    </div>
    <NextDays/>

   
   
 
  </div>
);


