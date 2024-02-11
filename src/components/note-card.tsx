import { Root } from "@radix-ui/react-dialog"

interface NoteCardProps {
    note:{
        date: Date
        content: string
    }
}

export function NoteCard({note}: NoteCardProps) {
  return (

    <button className="rounded-md text-left bg-slate-800 p-5 space-y-3 outline-none overflow-hidden relative hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className='text-sm font-medium text-slate-300'>{note.date.toISOString()}</span>
        <p className='text-sm leading-6 text-slate-400'>
            {note.content}
        </p>
        <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none'/>
    </button>
  )
}
