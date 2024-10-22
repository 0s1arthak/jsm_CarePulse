"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form
} from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import {UserFormValidation} from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"


export enum FormFieldType{
    INPUT='input',
    TEXTAREA='textarea',
    CHECKBOX='checkbox',
    DATE_PICKER='datePicker',
    SELECT='select',
    PHONE_INPUT='phoneInput',
    SKELETON='skeleton'
}


 
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})
 
export function PatientForm() {
  const router=useRouter()
  const [isLoading,setIsLoading]=useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email:"",
      phone: "",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit({name,email,phone}: z.infer<typeof UserFormValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);
    try{
      const userData={name,email,phone};
      console.log(userData);
      const user=await createUser(userData)
      console.log(user);
      if(user){
        router.push(`/patients/${user.$id}/register`)
      }
    }catch(error){
      console.error(error);
    }
    setIsLoading(false);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
            <h1>Hi there 👋</h1>
            <p className="text-dark-700">Schedule your first meet</p>
        </section>
        <CustomFormField 
        fieldType={FormFieldType.INPUT}
        name="name"
        label="Full name"
        placeholder="Enter your name"
        iconSrc="/assets/icons/user.svg"
        iconAlt="user"
        control={form.control}/>



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
        <SubmitButton isLoading={isLoading} className="shad-primary-btn">Get Started</SubmitButton>
      </form>
    </Form>
  )
}

export default PatientForm
