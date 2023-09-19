'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import { BiLogoGoogle } from 'react-icons/bi'
import { signIn} from 'next-auth/react'
import toast from 'react-hot-toast'

const page = () => {
   const socialAction = (action: string) => {

      signIn(action, { redirect: false })
         .then((callback) => {
            if (callback?.error) {
               toast.error("Invalid credentials!");
            }

            // if (callback?.ok) {
            //   router.push("/conversations");
            // }
         })
   };
  return (
     <Button onClick={() => socialAction("google")}>
      <BiLogoGoogle />
      Sign In
    </Button>
  )
}

export default page