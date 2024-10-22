import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import * as Sentry from '@sentry/nextjs'









import RegisterForm from '@/components/forms/RegisterForm'
import { getUser } from '@/lib/actions/patient.actions'
const Register = async ({params:{userId}}:SearchParamProps) => {


  const user=await getUser(userId)
  console.log(user);

  Sentry.metrics.set("user_view_register",user.name)



  return (
    <div className="flex h-screen max-h-screen">
      {/* todo : OTP verification | PasskeyModel */}
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image 
          src="/assets/icons/logo-full.svg"
          alt="Logo"
          width={1000}
          height={1000}
          className="mb-12 h-10 w-fit"
          />
          <RegisterForm user={user}/>
          <p className="copyright py-12">©2024 CarePulse</p>
        </div>
      </section>
      <Image
      src="/assets/images/register-img.png"
      alt="Onboarding Image"
      width={1000}
      height={1000}
      className="side-img max-w-[600px]"
      />
    </div>
  )
}

export default Register
