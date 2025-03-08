'use client';
import OneDateChooser from '@/components/DateChooser/OneDateChooser';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useActionState, useEffect, useRef } from 'react'
import { addNewTokenAmount } from '../actions/UserAction';
import useCharsStore from '@/store/charsStore';
import { motion } from 'motion/react';
import { WowTokenType } from '@/lib/models/user.interface';

interface TokenAmountResponse {
    success: boolean;
    error?: string;
    tokens?: WowTokenType[];
}

export default function TokenForm() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [state, formAction, isPending] = useActionState(submitTokenAmount, null);

    const selectedDate = useCharsStore((state) => state.selectedDate);

    async function submitTokenAmount(prevState: TokenAmountResponse | null, formData: FormData)
        : Promise<TokenAmountResponse | null> {
        const tokenAmount = formData.get("tokenform") as string;
        if (!tokenAmount) { return prevState }
        const result = await addNewTokenAmount(Number(tokenAmount), selectedDate);

        return result
    }

    useEffect(() => {
        if (state?.success && inputRef.current) {
            inputRef.current.value = "";
        }
    }, [state]);
    return (
        <>
            <section className='flex lg:col-span-3 lg:col-start-2 lg:col-end-5 w-2/3 min-w-min  m-auto'><OneDateChooser /></section>
            <form
                action={formAction} className='w-full  min-w-80  lg:col-span-2 border-2 border-background_alt p-4 rounded-lg flex flex-col justify-start gap-5'>
                <h2 className='mt-2'>Add token cost</h2>
                <Input placeholder='0'
                    ref={inputRef}
                    type='number' name={"tokenform"} defaultValue="" />
                <Button type='submit' disabled={isPending}>{isPending ? "Submitting..." : "Submit"}</Button>
            </form>
            <div className='flex flex-col gap-12 items-center justify-center absolute -bottom-32 left-5 w-full text-xl'>

                {state?.error && <motion.p animate={{ opacity: 0 }} initial={{ opacity: 1 }} transition={{ duration: 1, delay: 1.5 }}
                    className='text-red-500'>{state.error}</motion.p>}
                {state?.success && <motion.p animate={{ opacity: 0 }} initial={{ opacity: 1 }} transition={{ duration: 1, delay: 1.5 }}
                    className='text-green-500'>Token cost added successfully</motion.p>}</div>
        </>
    )
}
