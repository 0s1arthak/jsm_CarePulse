import PatientForm from "@/components/forms/PatientForm";
import PasskeyModal from "@/components/PasskeyModal";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home({searchParams}:SearchParamProps) {

  const isAdmin=searchParams.admin==='true';



  return (
    <div className="flex h-screen max-h-screen">
      {/* todo : OTP verification | PasskeyModel */}
      {/* Whenever I click admin it will write admin is true on search params so we can destructure it  */}


      {isAdmin && <PasskeyModal/>}






      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[496px] flex-1 flex-col py-10">
          <Image 
          src="/assets/icons/logo-full.svg"
          alt="Logo"
          width={1000}
          height={1000}
          className="mb-12 h-10 w-fit"
          />
          <PatientForm/>
          <div className="text-14-regular mt-20 flex justify-between py-10">
              <p className="justify-items-end text-dark-600 xl:text-left">©2024 CarePulse</p>
              <Link href="/?admin=true" className="text-green-500">
                Admin
              </Link>
          </div>
        </div>
      </section>
      <Image
      src="/assets/images/onboarding-img.png"
      alt="Onboarding Image"
      width={1000}
      height={1000}
      className="side-img max-w-[50%]"
      />
    </div>
  );
}
