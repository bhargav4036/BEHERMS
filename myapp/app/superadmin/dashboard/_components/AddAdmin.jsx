"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"


import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useContext, useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { SuperadminContext } from "../../_context/Superadmincontext"
import { addAdmin } from "@/app/_utils/apiFeatures"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
    metamask_addr: z.string().min(42, {
        message: "Metamask address must be at least 42 characters.",
    }),
    institution_name: z.string().min(5, {
        message: "Metamask address must be at least 5 characters.",
    })
})

export function AddAdmin(props) {
    const { state,address,name } = useContext(SuperadminContext);
    // ...
    const { toast } = useToast();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            metamask_addr: "",
            institution_name : "",
        },
    })

    function onSubmit(values) {
        console.log(values);
        console.log("Hit")
        const check = addAdmin(state.contract,address,values.institution_name,values.metamask_addr);
        if(check){
            toast({
                title: "Info",
                description: "Admin added successfully",
            })
            // setTimeout(() => {
            //     window.location.reload();
            // },1000)
        }
        else {
            toast({
                title: "Error",
                description: "Super Admin not added. Problem with the Network",
            })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="institution_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Institution name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter Institution name" className="w-full" {...field} />
                            </FormControl>
                            {/* <FormDescription>
                                Enter the name of the institution
                            </FormDescription> */}
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="metamask_addr"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>MetaMask Address</FormLabel>
                            <FormControl>
                                <Input placeholder="Meta Mask Address here" className="w-full" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" >Add</Button>
            </form>
        </Form>
    )
}
