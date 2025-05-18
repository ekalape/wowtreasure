import { Button } from '@/components/ui/button';

export default function Alert({ message, onConfirm }: { message: string; onConfirm: () => void }) {
  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center z-10 justify-center bg-black bg-opacity-50 backdrop-blur-sm '>
      <div className='bg-background rounded-md shadow-lg border-2 border-background_alt flex flex-col gap-6 p-8'>
        <p className='text-red-500 font-hachi text-xl '>{message}</p>
        <Button onClick={onConfirm}>Ok</Button>
      </div>
    </div>
  );
}
