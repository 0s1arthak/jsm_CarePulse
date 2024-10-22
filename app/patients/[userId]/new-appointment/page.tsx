import AppointmentForm from "@/components/forms/AppointmentForm";
import PatientForm from "@/components/forms/PatientForm";
import { Button } from "@/components/ui/button";
import { getPatient } from "@/lib/actions/patient.actions";
import Image from "next/image";
import Link from "next/link";
import * as Sentry from "@sentry/nextjs"

export default async function NewAppointment({params:{userId}}:SearchParamProps) {
    const patient=await getPatient(userId);
    Sentry.metrics.set("patient_view_new-appointment",patient.name)

  return (
    <div className="flex h-screen max-h-screen">
      {/* todo : OTP verification | PasskeyModel */}
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image 
          src="/assets/icons/logo-full.svg"
          alt="Logo"
          width={1000}
          height={1000}
          className="mb-12 h-10 w-fit"
          />
          {/* <PatientForm/> */}
          <AppointmentForm
          type="create"
          userId={userId}
          patientId={patient.$id}
          // Do i need to give setOpen as it is giving error
          // setOpen={true}
          
          />
          <p className="copyright mt-10 py-12">©2024 CarePulse</p>
        </div>
      </section>
      <Image
      src="/assets/images/appointment-img.png"
      alt="Appointment"
      width={1000}
      height={1000}
      className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
}
