import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import React, { useActionState, useEffect, useState, useTransition } from 'react';
import DropDownMenu from './InputVariants/DropDownMenu/DropDownMenu';
import { CLASS_OPTIONS } from './InputVariants/InputVariantsConstToUse';
import InputRadio from './InputVariants/Radio/InputRadio';
import { IChar } from '@/lib/models/char.interface';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Loading from '@/app/loading';
import { createPortal } from 'react-dom';

export default function EditCharModal({
  open,
  onClose,
  char,
}: {
  open: boolean;
  onClose: (open: boolean) => void;
  char: IChar;
}) {
  const [currentFraction, setCurrentFraction] = useState(char.fraction);
  const [currentClass, setCurrentClass] = useState(char.charclass);
  const [isRefreshing, startTransition] = useTransition();

  const router = useRouter();

  const [, formAction, isPending] = useActionState(handleSubmit, { success: true, error: null });

  async function handleSubmit(
    prevState: { success: boolean; error: Error | null },
    data: FormData,
  ) {
    const newData = {
      name: data.get('name')?.toString().trim() || char.name,
      charclass: currentClass,
      server: data.get('server')?.toString().trim() || char.server,
      fraction: currentFraction,
    };

    try {
      const res = await fetch('/api/edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ charid: char.charid, newCharData: newData }),
      });

      const resdata = await res.json();

      if (!resdata.success) {
        console.error('Edit error:', resdata.error);
        return {
          success: false,
          error: resdata.error,
        };
      } else {
        startTransition(() => {
          router.refresh();
          onClose(false);
        });
        return {
          success: true,
          error: null,
        };
      }
    } catch (e) {
      console.error('Edit error:', e);
      return {
        success: false,
        error: e,
      };
    } finally {
      onClose(false);
    }
  }

  useEffect(() => {
    console.log('isRefreshing', isRefreshing);
  }, [isRefreshing]);

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className='sm:max-w-[425px]' onPointerDownOutside={() => onClose(false)}>
          <DialogHeader>
            <DialogTitle className='text-xl text-center'>Edit Character</DialogTitle>
            <DialogDescription className='text-sm text-center'>
              Edit details of your character here.
            </DialogDescription>
          </DialogHeader>
          <form action={formAction} className='grid gap-6 py-4'>
            <div className='flex w-full items-center gap-4 relative'>
              <div className='flex w-full flex-col items-center gap-4'>
                <Label htmlFor='name' className='text-right'>
                  Name
                </Label>
                <Input id='name' className='col-span-3' name='name' defaultValue={char.name} />
              </div>
            </div>
            <div className='flex w-full items-center gap-4 relative'>
              <div className='flex w-full flex-col items-center gap-4'>
                <Label htmlFor='server' className='text-right'>
                  Server
                </Label>
                <Input
                  id='server'
                  className='col-span-3'
                  name='server'
                  defaultValue={char.server}
                />
              </div>
            </div>
            <div className='flex w-full items-center justify-center gap-4 relative mb-4'>
              <div className='flex flex-col items-center gap-4 relative h-10 mt-4 w-full'>
                <DropDownMenu
                  options={[...Object.values(CLASS_OPTIONS)]}
                  checked={currentClass}
                  setChecked={setCurrentClass}
                />
              </div>
            </div>
            <div className='flex flex-col items-center gap-4'>
              <div className='flex w-full items-end justify-center gap-4 relative'>Fraction</div>
              <InputRadio
                fractionChecked={currentFraction}
                setFractionChecked={setCurrentFraction}
              />
            </div>
            <hr />
            <div className='flex justify-center gap-4 mt-3'>
              <Button
                type='button'
                variant='outline'
                onClick={() => onClose(false)}
                className={` text-sm font-hachi ${
                  isPending ? 'text-background' : 'text-foreground_alt'
                }`}>
                Cancel
              </Button>
              <Button
                disabled={isPending}
                type='submit'
                className={` text-sm font-hachi ${
                  isPending ? 'text-background' : 'text-foreground'
                }`}>
                Edit
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      {(isPending || isRefreshing) && createPortal(<Loading />, document.body)}
    </>
  );
}
