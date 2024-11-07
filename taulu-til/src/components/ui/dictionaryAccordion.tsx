import { ttDB } from '@/lib/db';
import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion';
import Link from 'next/link';

export default async function DictionaryAccordion() {

    const alphabet = ["A","B","C","Ç","D","E","F","G","Ğ","H","I","İ","J","K","L","M","N","O","Ö","P","R","S","Ş","T","U","Ü","V","Y","Z"]

    const words = await ttDB.collection("tauluDictionary").find().sort({ word: 1 }).collation({ locale: "tr", caseLevel: true }).toArray();
  
  return (
    <Accordion type="single" collapsible>
                    { alphabet.map((alphabet) =>(
                      <AccordionItem value={"item-"+alphabet}>
                    <AccordionTrigger>Words starting with {alphabet}</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-3 lg:grid-cols-8">
                  {(words).map((word) => {
                    if(word.word[0] == alphabet){
                      return(
                          <Link href={'../definition?word='+word.id}>
                          <button className="text-blue-600 visited:text-purple-600 underline">{word.word}</button>
                          </Link>
                        )
                      }
                    })}
                    </div>
                    {/* <p>{alphabet}</p> */}
                    </AccordionContent>
                  </AccordionItem>))}
                </Accordion>
  )
}
