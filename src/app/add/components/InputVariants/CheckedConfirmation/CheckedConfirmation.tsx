import { X, Check } from 'lucide-react'

export default function CheckedConfirmation({ ok, className }: { ok: boolean, className?: string }) {
    return (
        <div
            className={`flex items-end gap-2 w-10 h-10 relative justify-center  ${ok ? 'text-green-500' : 'text-red-500'} ${className}`}>
            {ok ? <Check size={24} /> : <X size={24} />}
        </div>
    )
}
