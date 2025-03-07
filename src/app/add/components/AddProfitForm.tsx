'use client';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { IChar } from '@/lib/models/char.interface'
import React, { useActionState, useEffect, useRef } from 'react'
import { addNewProfit, getAllCharsAction } from '@/app/actions/UserAction'
import useCharsStore from '@/store/charsStore';
import { motion } from 'motion/react';

interface ProfitResponse {
    success: boolean;
    error?: string;
    updatedChars?: IChar[];
}



export default function AddProfitForm({ charid, date }: { charid: string, date: string }) {

    const setChars = useCharsStore(state => state.setChars)

    const inputRef = useRef<HTMLInputElement>(null);
    const submitProfitForm = async (prevState: ProfitResponse | null, formData: FormData): Promise<ProfitResponse | null> => {
        console.log("submitProfitForm called with:", formData.get("profitform"));
        const profitInput = formData.get("profitform")?.toString().trim();

        if (!profitInput || !charid) {
            return { success: false, error: "Profit amount and character ID are required" };
        }

        const profitAmount = Number(profitInput);
        if (isNaN(profitAmount) || profitAmount <= 0) {
            return { success: false, error: "Profit must be a positive number" };
        }


        const result = await addNewProfit(charid, date, profitAmount);

        if (result.success) {
            const updatedChars = await getAllCharsAction();
            console.log('updatedChars', updatedChars)
            setChars(updatedChars);
        }

        console.log('result', result)
        return result

    }
    const [state, formAction, isPending] = useActionState(submitProfitForm, null);

    useEffect(() => {
        if (state?.success && inputRef.current) {
            inputRef.current.value = "";
        }
    }, [state]);

    return (<div className='flex flex-col gap-12 w-1/3 items-center justify-start'>
        <form
            key={state?.success ? Date.now() : "form"}
            action={formAction} className='w-full border-2 border-background_alt p-4 rounded-lg flex flex-col justify-start gap-5'>
            <h2 className='mt-2'>Add new profit</h2>
            <Input placeholder='0'
                ref={inputRef}
                type='number' name={"profitform"} defaultValue="" />

            <Button type='submit' disabled={isPending}>{isPending ? "Submitting..." : "Submit"}</Button>
        </form>
        {state?.success && (
            <motion.p className='text-green-500'
                animate={{ opacity: 0 }} initial={{ opacity: 1 }} transition={{ duration: 1, delay: 1.5 }}>You profit was submitted</motion.p>

        )
        }
        {
            state?.error && (
                <motion.p className='text-red-500'
                    animate={{ opacity: 0 }} initial={{ opacity: 1 }} transition={{ duration: 1, delay: 1.5 }}> {state.error}</motion.p>
            )
        }
    </div >
    )
}
