
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useActionState } from 'react'

export default function AddProfitForm(/* { submitProfit }: { submitProfit: () => void } */) {



    const submitProfitForm = (prevState: string | null, formData: FormData): string | null => {

        if (formData.get('profitform')?.toString().trim().length === 0) return null;

        return formData.get('profitform') as string


    }
    const [state, formAction, isPending] = useActionState(submitProfitForm, null);

    return (
        <form action={formAction} className='w-1/3 border-2 border-background_alt p-4 rounded-lg flex flex-col justify-start gap-5'>
            <h2 className='mt-2'>Add new profit</h2>
            <Input placeholder='0' type='number' name={"profitform"} />

            <Button>Submit</Button>
        </form>
    )
}
