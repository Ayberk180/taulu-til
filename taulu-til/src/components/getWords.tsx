"use server"
import { ttDB } from '@/lib/db';
import React from 'react'

export default async function GetWords({id} : { id: string | undefined}) {
    console.log(id)
    // const words = await ttDB.collection("savedWords").find({ userid: id }).toArray();
    // console.log(words)
  return (
    <div>G</div>
  )
}
