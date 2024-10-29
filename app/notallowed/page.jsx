"use client";
import React from 'react'

import { faScrewdriverWrench, faSignOut } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@nextui-org/react'
import { signOut } from 'next-auth/react';

export default function Page() {
  return (
    <div className="h-screen w-full flex">
      <div className="flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 justify-around items-center">
        <div>
          <h1 className="text-white font-bold text-4xl font-sans flex gap-2">
            <FontAwesomeIcon icon={faScrewdriverWrench} className="h-10 w-10" />
            MTN Service TH
          </h1>
          <p className="text-white mt-1">
            If you want to find a repair technician, think of us. We provide various repair technician services.
          </p>
        </div>
      </div>
      <div className="flex w-1/2 justify-center items-center bg-white h-screen">
        <div className="bg-red-100 p-8 rounded-xl shadow-lg max-w-md text-center">
          <h1 className="text-red-800 font-bold text-2xl mb-1">Account Suspended</h1>
          <p className="text-sm font-normal text-red-600 mb-7">
            Your account has been suspended due to policy violations. Please contact our support team for further assistance.
          </p>
          <Button onClick={() => signOut({ callbackUrl: '/' })} className="bg-red-200 px-10 py-4" radius="full" endContent={ <FontAwesomeIcon icon={faSignOut}/>}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}
