'use client'

import { useSession } from 'next-auth/react';
import React from 'react'
import Profile from './Profile';

export default function NoFetch() {
    const { data: session } = useSession();
  return (
    <div>
        <div className="absolute right-10 bottom-10">
      <Profile session={session} />
      </div>
    </div>
  )
}
