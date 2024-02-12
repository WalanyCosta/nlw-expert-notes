import { ChangeEvent, useState } from 'react';
import logo from './assets/logo-nlw-expert.svg'
import { NewNoteCard } from './components/new-note-card';
import { NoteCard } from './components/note-card'

interface Note{
  id: string,
  date: Date,
  content: string
}

export function App(){
  const [search, setSearch] = useState('')
  const [notes, setNotes] = useState<Note[]>(()=> {
    const notesOnStorage = localStorage.getItem('notes')

    if(notesOnStorage){
      return JSON.parse(notesOnStorage)
    }

    return []
  })

  function onNoteCreated(content: string){
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content
    }

    const noteArray = [newNote,...notes]

    setNotes(noteArray)

    localStorage.setItem('notes', JSON.stringify(noteArray))
  }

  function onNoteDeleted (id: string){
    const notesArray = notes.filter(note => {
      return note.id !== id
    })

    setNotes(notesArray)
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>){
    const query = event.target.value

    setSearch(query)
  }

  const filteredNotes = search !== '' 
    ? notes.filter(note => note.content.toLowerCase().includes(search.toLowerCase()))
    : notes

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6 px-5">
      <img src={logo} alt="NLW Expert"/>
      <form className="w-full">
        <input 
          type="text" 
          placeholder='Busque em suas notas'
          className='w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-slate-500'
          onChange={handleSearch}
        />
      </form>

      <div className='h-px bg-slate-700' /> 

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard onNoteCreated={onNoteCreated}  />
        
       {filteredNotes.map( note =>
          <NoteCard key={note.id} note={note} onNoteDeleted={onNoteDeleted}/>
        )}
      </div>
    </div>
  );
} 

