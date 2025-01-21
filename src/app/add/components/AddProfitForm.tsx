
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useActionState } from 'react'

export default function AddProfitForm(/* { submitProfit }: { submitProfit: () => void } */) {



    const submitProfitForm =  (prevState: string|null, formData: FormData):string|null => {

if(formData.get('profitform')?.toString().trim().length===0) return null;

        return formData.get('profitform') as string

        
    }
    const [state, formAction, isPending] = useActionState(submitProfitForm, null);

    return (
        <form action={formAction}>
            <Input placeholder='0' type='number' name={"profitform"} />
            {/*             {state?.success === false &&
                <div className="error">
                    Failed to add profit
                </div>
            } */}
            <Button>Submit</Button>
        </form>
    )
}
