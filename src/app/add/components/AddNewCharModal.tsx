'use client'

import { useActionState, useState } from 'react'
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
import { IChar } from '@/lib/models/char.interface'
import { v4 as uuidv4 } from 'uuid';
import { addNewCharacter } from '@/app/actions/UserAction'
import useCharsStore from '@/store/charsStore'
import InputRadio from './InputVariants/Radio/InputRadio'
import DropDownMenu from './InputVariants/DropDownMenu/DropDownMenu'
import { CLASS_OPTIONS } from './InputVariants/InputVariantsConstToUse'



export function AddNewCharModal() {
    const [open, setOpen] = useState(false)
    const [currentFraction, setCurrentFraction] = useState("Horde");
    const [currentClass, setCurrentClass] = useState("");

    const [state, formAction, isPending] = useActionState(handleSubmit, { chars: null, error: null })

    const setChars = useCharsStore(state => state.setChars)

    async function handleSubmit(prevState: { chars: IChar[] | null, error: Error | null }, data: FormData) {

        if (!data.get('name')?.toString().trim() ||
            currentClass.length === 0 ||
            !data.get('server')?.toString().trim()
        ) {
            return prevState;
        } else {
            const newCharacter: IChar = {
                charid: uuidv4(),
                name: data.get('name')?.toString().trim() || "",
                charclass: currentClass,
                server: data.get('server')?.toString().trim() || "",
                fraction: currentFraction,
                createdAt: (new Date()).toISOString(),
                earnings: [],

            }
            const updatedChars = await addNewCharacter(newCharacter);
            console.log("updatedChars___>", updatedChars);
            if (updatedChars && updatedChars.chars) {
                setChars(updatedChars.chars)
            }
            setOpen(false);
            return { chars: updatedChars.chars, error: updatedChars.error }
        }
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button disabled={isPending}
                    className={`w-16 h-16 rounded-full border-2 flex items-center justify-center border-foreground_alt text-foreground_alt text-3xl `} >
                    +
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]"
                onPointerDownOutside={() => setOpen(false)}>
                <DialogHeader>
                    <DialogTitle className='text-xl text-center'>Add New Character</DialogTitle>
                    <DialogDescription className='text-sm text-center'>
                        Enter the details of your new character here.
                    </DialogDescription>
                </DialogHeader>
                <form action={formAction} className="grid gap-6 py-4">
                    <div className="flex w-full items-center gap-4 relative">
                        <div className="flex w-full flex-col items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input id="name" className="col-span-3" name="name" /></div>

                    </div>
                    <div className="flex w-full items-center gap-4 relative">
                        <div className="flex w-full flex-col items-center gap-4">
                            <Label htmlFor="server" className="text-right">
                                Server
                            </Label>
                            <Input id="server" className="col-span-3" name="server" /></div>

                    </div>
                    <div className='flex w-full items-center justify-center gap-4 relative mb-4'>
                        <div className="flex flex-col items-center gap-4 relative h-10 mt-4 w-full" >
                            <DropDownMenu options={[...Object.values(CLASS_OPTIONS)]} checked={currentClass} setChecked={setCurrentClass} />
                        </div>

                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <div className='flex w-full items-end justify-center gap-4 relative'>Fraction

                        </div>
                        <InputRadio fractionChecked={currentFraction} setFractionChecked={setCurrentFraction} />

                    </div>
                    <hr />
                    <div className="flex justify-center gap-4 mt-3">
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

function formFieldsValidation(formData: FormDataEntryValue): boolean {
    return formData.toString().trim().length > 2 ? true : false;
}

