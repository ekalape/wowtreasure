'use client'

import { useActionState, useEffect, useState } from 'react'
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

import { wowUser } from '@/lib/services/mongoDb'
import { IChar } from '@/lib/models/char.interface'
import { v4 as uuidv4 } from 'uuid';
import { addNewCharacter } from '@/app/actions/UserAction'
import useCharsStore from '@/store/charsStore'



export function AddNewCharModal() {
    const [open, setOpen] = useState(false)

    const [currentFraction, setCurrentFraction] = useState("Horde");

    const [state, formAction, isPending] = useActionState(handleSubmit, { chars: null, error: null })

    const setChars = useCharsStore(state => state.setChars)

    async function handleSubmit(prevState: { chars: IChar[] | null, error: Error | null }, data: FormData) {
        const userid = "jhbghdvnhs53";
        if (!data.get('name')?.toString().trim() ||
            !data.get('class')?.toString().trim() ||
            !data.get('server')?.toString().trim()
        ) {

            return prevState;
        } else {
            const newCharacter: IChar = {
                charid: uuidv4(),
                name: data.get('name')?.toString().trim() || "",
                charclass: data.get('class')?.toString().trim() || "",
                server: data.get('server')?.toString().trim() || "",
                fraction: currentFraction,
                createdAt: (new Date()).toISOString(),
                earnings: [],

            }
            const updatedChars = await addNewCharacter(newCharacter, userid);
            console.log("updatedChars___>", updatedChars);
            if (updatedChars && updatedChars.chars) {
                setChars(updatedChars.chars)
            }
            setOpen(false);
            return { chars: updatedChars.chars, error: updatedChars.error }
        }
    }
    useEffect(() => {
        console.log('fraction', currentFraction)
    }, [currentFraction])

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
                        <Label htmlFor="fractionHorde" className="text-right">
                            Horde
                        </Label>
                        <Input id="fractionHorde" className="col-span-3"
                            name="fraction" type='radio' value="Horde"
                            checked={currentFraction === "Horde"} onChange={() => setCurrentFraction("Horde")} />
                        <Label htmlFor="fractionAliance" className="text-right">
                            Aliance
                        </Label>
                        <Input id="fractionAliance" className="col-span-3"
                            name="fraction" type='radio' value="Aliance"
                            checked={currentFraction === "Aliance"} onChange={() => setCurrentFraction("Aliance")} />
                    </div>
                    <div className="flex justify-end gap-4">
                        <Button type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            className={` text-sm font-hachi ${isPending ? 'text-background' : 'text-foreground_alt'}`}>
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

