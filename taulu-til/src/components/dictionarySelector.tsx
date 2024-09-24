// "use client"
// import React, { useState } from "react";
// import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
// import { ttDB } from "@/lib/db";
// import Link from "next/link";
// import { WithId } from "mongodb";

// export default function DictionarySelector({fulldict}:{fulldict:WithId<Document>[]}) {
//   const [alphabet, setAlphabet] = useState("A");

  
//   const click = (value: string) => {
//     setAlphabet(value);
//   };

//   let wordArr=[]

//     for (let i = 0; i < fulldict.length; i++){
// wordArr.push(fulldict[i])
//     }
    
//     console.log(wordArr)


//   return (
//     <div>
//       <ToggleGroup
//         type="single"
//         defaultValue={alphabet}
//         onValueChange={(value) => click(value)}
//       >
//         <ToggleGroupItem value="A">A</ToggleGroupItem>
//         <ToggleGroupItem value="B">B</ToggleGroupItem>
//         <ToggleGroupItem value="C">C</ToggleGroupItem>
//         <ToggleGroupItem value="Ç">Ç</ToggleGroupItem>
//         <ToggleGroupItem value="D">D</ToggleGroupItem>
//         <ToggleGroupItem value="E">E</ToggleGroupItem>
//         <ToggleGroupItem value="F">F</ToggleGroupItem>
//         <ToggleGroupItem value="G">G</ToggleGroupItem>
//         <ToggleGroupItem value="Ğ">Ğ</ToggleGroupItem>
//         <ToggleGroupItem value="H">H</ToggleGroupItem>
//         <ToggleGroupItem value="I">I</ToggleGroupItem>
//         <ToggleGroupItem value="İ">İ</ToggleGroupItem>
//         <ToggleGroupItem value="J">J</ToggleGroupItem>
//         <ToggleGroupItem value="K">K</ToggleGroupItem>
//         <ToggleGroupItem value="L">L</ToggleGroupItem>
//         <ToggleGroupItem value="M">M</ToggleGroupItem>
//         <ToggleGroupItem value="N">N</ToggleGroupItem>
//         <ToggleGroupItem value="O">O</ToggleGroupItem>
//         <ToggleGroupItem value="Ö">Ö</ToggleGroupItem>
//         <ToggleGroupItem value="P">P</ToggleGroupItem>
//         <ToggleGroupItem value="R">R</ToggleGroupItem>
//         <ToggleGroupItem value="S">S</ToggleGroupItem>
//         <ToggleGroupItem value="T">T</ToggleGroupItem>
//         <ToggleGroupItem value="U">U</ToggleGroupItem>
//         <ToggleGroupItem value="Ü">Ü</ToggleGroupItem>
//         <ToggleGroupItem value="V">V</ToggleGroupItem>
//         <ToggleGroupItem value="Y">Y</ToggleGroupItem>
//         <ToggleGroupItem value="Z">Z</ToggleGroupItem>
//       </ToggleGroup>

//       {/* {Promise.all(words.map())} */}
//       {/* <DictList alphabet={alphabet} /> */}

//       <div className="grid grid-cols-3 lg:grid-cols-8">
//         {(fulldict).map((word) => {
//           if (word!.word == alphabet) {
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

