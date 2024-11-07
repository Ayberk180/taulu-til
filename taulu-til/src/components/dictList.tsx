// "use server"
// import { ttDB } from "@/lib/db";
// import Link from "next/link";
// import React from "react";

// export const Filter = async ({ searchString }: { searchString: string }) => {
//     const fulldict = await ttDB
//     .collection("tauluDictionary")
//     .find()
//     .sort({ word: 1 })
//     .collation({ locale: "tr", caseLevel: true })
//     .toArray();

//     let wordArr=[]

//     for (let i = 0; i < fulldict.length; i++){
// wordArr.push(fulldict[i].word)
//     }
    
//     return wordArr 
//   return (
//     <div>
//       <div className="grid grid-cols-3 lg:grid-cols-8">
//         {wordArr.map((word) => {
//           if (word.word == alphabet) {
//             return (
//               <Link href={"../definition?word=" + word.word}>
//                 <button className="text-blue-600 visited:text-purple-600 underline">
//                   {word.word}
//                 </button>
//               </Link>
//             );
//           }
//         })}
//       </div>
//     </div>
//   );
// }
