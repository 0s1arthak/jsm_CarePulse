"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { any, z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl
} from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { PatientFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser, registerPatient } from "@/lib/actions/patient.actions"
import { FormFieldType } from "./PatientForm"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Doctors, GenderOptions, IdentificationTypes, PatientFormDefaultValues } from "@/constants"
import { Label } from "../ui/label"
import { SelectItem } from "../ui/select"
import Image from "next/image"
import FileUploader from "../FileUploader"



// export enum FormFieldType{
//     INPUT='input',
//     TEXTAREA='textarea',
//     CHECKBOX='checkbox',
//     DATE_PICKER='datePicker',
//     SELECT='select',
//     PHONE_INPUT='phoneInput',
//     SKELETON='skeleton'
// }


 
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})
 
export function RegisterForm({user}:{user:User}) {
  const router=useRouter()
  const [isLoading,setIsLoading]=useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: "",
      email:"",
      phone: "",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);
    var formData;
    if(values.identificationDocument && values.identificationDocument.length>0){
      const blobFile=new Blob([values.identificationDocument[0]],{
        type:values.identificationDocument[0].type,
      })

      formData=new FormData();
      formData.append('blobFile',blobFile);
      formData.append('filename',values.identificationDocument[0].name)
    }
    try{
      const patientData={
        ...values,
        userId:user.$id,
        birthDate:new Date(values.birthDate),
        identificationDocument:formData,

      }
      // @ts-ignore
      const patient=await registerPatient(patientData);
      if(patient){
        router.push(`/patients/${user.$id}/new-appointment`)
      }
    }catch(error){
      console.error(error);
    }
    setIsLoading(false);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
        <section className="space-y-4">
            <h1>Welcome 👋</h1>
            <p className="text-dark-700">Let us know more about yourself.</p>
        </section>



        <section className="space-y-6">
            {/* <h1>Welcome 👋</h1> */}
            <div className="mb-9 space-y-1">
              <h2 className="sub-header">Personal Information</h2>
            </div>
            
        </section>




        {/* <section className="space-y-4">
            <h1>Welcome 👋</h1>
            <p className="text-dark-700">Let us know more about yourself.</p>
        </section> */}




        <CustomFormField 
        fieldType={FormFieldType.INPUT}
        name="name"
        label="Full Name"
        placeholder="Enter your name"
        iconSrc="/assets/icons/user.svg"
        iconAlt="user"
        control={form.control}/>


        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField 
          fieldType={FormFieldType.INPUT}
          name="email"
          label="Email"
          placeholder="johndoe123@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
          control={form.control}/>




          <CustomFormField 
          fieldType={FormFieldType.PHONE_INPUT}
          name="phone"
          label="Phone number"
          placeholder="(+91) 8765430982"
          iconSrc="/assets/icons/email.svg"
          control={form.control}/>
        </div>


        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField 
            fieldType={FormFieldType.DATE_PICKER}
            name="birthDate"
            label="Date of Birth"
            control={form.control}/>




            <CustomFormField 
            fieldType={FormFieldType.SKELETON}
            name="gender"
            label="Gender"
            renderSkeleton={(field)=>(
              <FormControl>
                <RadioGroup className="flex h-11 gap-6 xl:justify-between" 
                onValueChange={field.onChange}
                defaultValue={field.value}>

                {GenderOptions.map((option)=>(
                  <div key={option} className="radio-group">
                    <RadioGroupItem value={option} id={option}/>
                    <Label htmlFor={option} className="cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}





                </RadioGroup>
              </FormControl>
            )}
            control={form.control}/>
        </div>







        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField 
            fieldType={FormFieldType.INPUT}
            name="address"
            label="Address"
            placeholder="Maujpur,Delhi"
            control={form.control}/>





          <CustomFormField 
            fieldType={FormFieldType.INPUT}
            name="occupation"
            label="Occupation"
            placeholder="Software Engineer"
            control={form.control}/>
        </div>




        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField 
            fieldType={FormFieldType.INPUT}
            name="emergencyContactName"
            label="Emergency contact name"
            placeholder="Guardian's name"
            control={form.control}/>




          <CustomFormField 
            fieldType={FormFieldType.PHONE_INPUT}
            name="emergencyContactNumber"
            label="Emergency contact number"
            placeholder="(+91) 8765430982"
            iconSrc="/assets/icons/email.svg"
            control={form.control}/>
        </div>



        <section className="space-y-6">
              <div className="mb-9 space-y-1">
                <h2 className="sub-header">Medical Information</h2>
              </div>     
        </section>


        <CustomFormField 
            fieldType={FormFieldType.SELECT}
            name="primaryPhysician"
            label="Primary Physician"
            placeholder="Select a physician"
            control={form.control}>
              {
                Doctors.map((doctor)=>(
                  <SelectItem
                  key={doctor.name} 
                  value={doctor.name}>
                    <div className="flex cursor-pointer items-center gap-2">
                      <Image
                      src={doctor.image}
                      width={32}
                      height={32}
                      alt={doctor.name}
                      className="rounded-full border border-dark-500"
                    
                      />
                      <p>{doctor.name}</p>
                    </div>

                  </SelectItem>

                ))
              }


            </CustomFormField>






        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField 
            fieldType={FormFieldType.INPUT}
            name="insuranceProvider"
            label="Insurance Provider"
            placeholder="LIC"
            control={form.control}/>





          <CustomFormField 
            fieldType={FormFieldType.INPUT}
            name="insurancePolicyNumber"
            label="Insurance policy number"
            placeholder="1234BHGJ"
            control={form.control}/>
        </div>





        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField 
            fieldType={FormFieldType.TEXTAREA}
            name="allergies"
            label="Allergies"
            placeholder="Peanuts,Penicillin,pollen"
            control={form.control}/>





          <CustomFormField 
            fieldType={FormFieldType.TEXTAREA}
            name="currentMedication"
            label="Current medication(if any)"
            placeholder="Paracetamol 500mg"
            control={form.control}/>
        </div>





        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField 
            fieldType={FormFieldType.TEXTAREA}
            name="familyMedicalHistory"
            label="Family medical history"
            placeholder="Mother had diabetes"
            control={form.control}/>





          <CustomFormField 
            fieldType={FormFieldType.TEXTAREA}
            name="pastMedicalHistory"
            label="Past medical history"
            placeholder="Tonsillectomy"
            control={form.control}/>
        </div>


        <section className="space-y-6">
              <div className="mb-9 space-y-1">
                <h2 className="sub-header">Identification and Verification</h2>
              </div>     
        </section>




        <CustomFormField 
            fieldType={FormFieldType.SELECT}
            name="identificationType"
            label="Identification type"
            placeholder="Select an identification type"
            control={form.control}>
              {
                IdentificationTypes.map((type)=>(
                  <SelectItem key={type} value={type}>
                    {type}

                  </SelectItem>

                ))
              }


            </CustomFormField>


            <CustomFormField 
              fieldType={FormFieldType.INPUT}
              name="identificationNumber"
              label="Identification number"
              placeholder="1234567"
              control={form.control}
            />



            <CustomFormField 
              fieldType={FormFieldType.SKELETON}
              name="identificationDocument"
              label="Scanned copy of identification document"
              renderSkeleton={(field)=>(
                <FormControl>
                  <FileUploader files={field.value} onChange={field.onChange} />
                </FormControl>
              )}
              control={form.control}
            />



        <section className="space-y-6">
              <div className="mb-9 space-y-1">
                <h2 className="sub-header">Consent and privacy</h2>
              </div>     
        </section>



        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="disclosureConsent"
          label=" I consent to the disclosure of information"
        />



        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="privacyConsent"
          label=" I consent to the privacy policy"
        />




        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="treatmentConsent"
          label=" I consent to the treatment of my personal data"
        />







        <SubmitButton isLoading={isLoading} className="shad-primary-btn">Get Started</SubmitButton>
      </form>
    </Form>
  )
}

export default RegisterForm
