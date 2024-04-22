import React,{useContext, useEffect,useRef,useState} from 'react'
import NoteContext from '../context/notes/NoteContext'

import Caritem from './Caritem';

export default function Suv(props) {
  const context = useContext(NoteContext);
  const{notes,getNotes,editNote} = context;
  const [note, setNote] = useState({id: "", ename: "", edescription: "", ecost: "" ,ecartype:"", ephoto: ""})
  const ref = useRef(null)
  const refClose = useRef(null)
  

  useEffect(()=>{
    getNotes();
    // eslint-disable-next-line 
  },[])

  const updateNote =(currentNote)=>{
    ref.current.click();
    setNote({id: currentNote._id, ename: currentNote.name, edescription: currentNote.description, ecost:currentNote.cost ,ecartype:currentNote.cartype, ephoto: currentNote.photo})
    
  }


  const handleClick=(e)=>{
      //avoiding page reload.
      console.log("Updating the Note" , note)
      editNote(note.id, note.ename, note.edescription, note.ecost ,note.ecartype, note.ephoto)
      refClose.current.click();
      props.showAlert("Updated Successfully","success");

  }

  const onchange = (e)=>{
      setNote({
          //... is a spread operator: keep other items of note as it is but change the values which are written after ...note.
          ...note ,[e.target.name]:e.target.value
      })
  }

  return (
    <>
    <button ref ={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Editing Modal
        </button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Edit MPVs Details</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Name</label>
                        <input type="text" className="form-control" id="ename" name="ename" aria-describedby="emailHelp" value={note.ename} onChange={onchange} minLength={5} required/>
                    
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onchange} minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Cost(Rs/day)</label>
                        <input type="text" className="form-control" id="ecost" name="ecost" value={note.ecost} onChange={onchange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Type</label>
                        <input type="text" className="form-control" id="ecartype" name="ecartype" value={note.ecartype} onChange={onchange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Car Image(URL)</label>
                        <input type="text" className="form-control" id="ephoto" name="ephoto" value={note.ephoto} onChange={onchange}/>
                    </div>
                </form>
                </div>
                <div className="modal-footer">
                    <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button disabled={note.ename.length<5 || note.edescription.length <5} type="button" className="btn btn-outline-success" onClick={handleClick}>Update Note</button>
                </div>
                </div>
            </div>
        </div>
    <div className="row my-3">
      <h2 style={{"textAlign":"center"}}>Magic MPVs</h2>
      {notes.filter((note) => note.cartype === 'MPV').map((note) =>{
          return <Caritem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note}/>
      })}
    </div>
    </>
  )
}

