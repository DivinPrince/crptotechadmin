'use client'
import { Button } from '@/components/ui/button'
import React, { useEffect } from 'react'
import { BiLogoGoogle } from 'react-icons/bi'
import { signIn, useSession} from 'next-auth/react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const page = () => {
   const session = useSession()
   const router = useRouter()
   useEffect(()=>{
      if (session.data?.user && session.data.user.email == 'dynamiccode00@gmail.com') {
         router.push('/')
      }
   },[session])
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
   <div className='w-full h-full flex justify-center items-center'>
     <Button onClick={() => socialAction("google")}>
      <BiLogoGoogle />
      Sign In
    </Button>
   </div>
  )
}

export default page