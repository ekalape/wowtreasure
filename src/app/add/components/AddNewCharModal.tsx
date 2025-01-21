'use client'

import { useActionState, useEffect, useState, useTransition } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { CharDataType } from '@/lib/models/char.interface'
import { addChar } from '@/lib/services/chars.service'

export function AddNewCharModal() {
    const [open, setOpen] = useState(false)

    const [error, setError] = useState<string|null>(null);

    const [state, formAction, isPending] = useActionState(handleSubmit, null)

    const [isPendingTransition, startTransition] = useTransition()

    function handleSubmit(currentstate: CharDataType | null, formData: FormData) {

        if (!formData.get('name') || !formData.get('class') || !formData.get('server') || !formData.get('fraction')) {
            return null;
        }

        const newState = {
            name: formData.get('name') as string,
            class: formData.get('class') as string,
            server: formData.get('server') as string,
            fraction: formData.get('fraction') as string
        }
        console.log('Character added')
        console.log(newState)
        
        startTransition(async () => {
           const res= await addChar(newState);
        if(res.error){setError(res.error.message)}
        });
        /*  setOpen(false); */
        return newState
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button disabled={isPending}
                    className={`w-16 h-16 rounded-full border-2 flex items-center justify-center border-foreground_alt text-foreground_alt text-3xl `} >
                    +
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]" onPointerDownOutside={() => setOpen(false)}>
                <DialogHeader>
                    <DialogTitle>Add New Character</DialogTitle>
                    <DialogDescription>
                        Enter the details of your new character here.
                    </DialogDescription>
                </DialogHeader>
                <form action={formAction} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input id="name" className="col-span-3" name="name" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="class" className="text-right">
                            Class
                        </Label>
                        <Input id="class" className="col-span-3" name="class" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="server" className="text-right">
                            Server
                        </Label>
                        <Input id="server" className="col-span-3" name="server" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="fraction" className="text-right">
                            Fraction
                        </Label>
                        <Input id="fraction" className="col-span-3" name="fraction" />
                    </div>
                    <div className="flex justify-end gap-4">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)} className={` text-sm font-hachi ${isPending ? 'text-background' : 'text-foreground_alt'}`}>
                            Cancel
                        </Button>
                        <Button disabled={isPending}
                            type="submit" className={` text-sm font-hachi ${isPending ? 'text-background' : 'text-foreground'}`}>Add</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

