import React,{useContext} from 'react'
import NoteContext from '../context/notes/NoteContext'
import { useNavigate } from 'react-router-dom';
const Caritem = (props) => {
    const context = useContext(NoteContext);
    const{deleteNote} = context;
    const {note,updateNote} = props;

    const carid = note._id;
    const carname = note.name;
    const cardescription = note.description;
    const carcost = note.cost;
    const carphoto = note.photo;

    let navigate = useNavigate();
    const handleBookNow = () => {
    navigate(`/booking/${note._id}`,{state:{carid:carid , carname:carname , cardescription:cardescription,carcost:carcost,carphoto:carphoto}});
  };
    
  return (
    <div className='col-md-3 mx-5 '>
        <div className="card mx-3 my-3" style={{"width": "22rem"}}>
        {localStorage.getItem('id')===note.user?<span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:"100%",zIndex:"1"}}>
                your Car
                </span>:""}
        <img src={note.photo} class="card-img-top1" alt="Photo"/>
            <div className="card-body">
                <h5 className="card-title1">{note.name}</h5>
                <p className="card-text">{note.description}</p>
                <p className="card-text">{note.cartype}</p>
                <p className="card-title1">Charges/day : {note.cost}</p>
                {/* {localStorage.getItem('id')===note.user?<i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id) ; props.showAlert("Deleted successfully","success")}}></i>:""} */}
                {localStorage.getItem('id')===note.user?<i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>:""}
                {localStorage.getItem('id')!==note.user?<button type="button" class="btn btn-outline-secondary" onClick={handleBookNow}>Select</button>:""}
            </div>
        </div>
    </div>
  )
}

export default Caritem