"use client"
import React from 'react'
import { Card, CardTitle } from './ui/card'
import { useSession } from '@/app/SessionContext';
import { ttDB } from '@/lib/db';
import GetWords from './getWords';

export default function savedWords() {
    const user=useSession()

  return (
    <div>
        <section>
            <Card>
                <CardTitle>
                    My Saved Words 
                </CardTitle>
                <GetWords id={user.user?.id}/>
            </Card>
        </section>
    </div>
  )
}
