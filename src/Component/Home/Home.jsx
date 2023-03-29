
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import swal from 'sweetalert';
import Modal from '../Model/Model.jsx';
import AOS from 'aos';
import 'aos/dist/aos.css';


export default function Home() {
    useEffect(()=>{
      AOS.init();

        getAllNote()
    },[])
   
    const [note,setNote] =useState([])
    const [newNote,setNewNote] =useState({title:'',desc:''})
    const [userId,setUserId] =useState('')
    const token = localStorage.getItem('token')
    // get all note 
    const getAllNote = async ()=>{
        var decoded = jwt_decode(token);
        setUserId(decoded._id)
        
         const {data} = await axios.get('https://route-movies-api.vercel.app/getUserNotes',{
            headers:{
                token,userID:decoded._id
            }
         })
         
         if (data.message=='no notes found') {
         
            setNote('no notes found')
         }else{
            
            setNote(data.Notes)
            
         }
    }

    /// -- alert -- befor -- delete
    const alertBeforDelete =async(id)=>{
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          deleteNote(id)
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
        } else {
          console.log('dsadas');
          swal("Your imaginary file is safe!");
        }
      });

    }
    // delete note 
    const deleteNote =async(id)=>{
      const {data}= await axios.delete('https://route-movies-api.vercel.app/deleteNote',{
          data:{
              NoteID:id,
              token:localStorage.getItem('token')
          }
      })
      
      if (data.message=='deleted') {
          getAllNote()
      }
        }
    const getNoteFromUser = ({target})=>{

      setNewNote({...newNote,[target.name]:target.value})

      
    }
    // ---- add note
    const addNote = async()=>{
       const {data} = await axios.post('https://route-movies-api.vercel.app/addNote',{
         ...newNote,
         userID:userId,
         token:token
       })
       swal("Note Added", "You clicked the button!", "success");

       if (data.message=='success') {
        getAllNote()
       }
    }

    // ----get id of note
    const getIdOfNote =(index)=>{
      
      document.querySelector('#updateModal input').value=note[index].title
      document.querySelector('#updateModal textarea').value=note[index].desc
      setNewNote({...newNote,"title":note[index].title,"desc":note[index].desc,NoteID:note[index]._id})
   
     
    
    }

    // --- update note
    const updateNote = async(e)=>{
   const {data} =await axios.put('https://route-movies-api.vercel.app/updateNote',{
    ...newNote,token:token
   })
   swal("Note Updated ", "You clicked the ok!", "success");

    getAllNote()
      
    }

    // --- get note from user to update
    const getNoteAfterUpdate = ({target})=>{
      setNewNote({...newNote,[target.name]:target.value})
     
    }

  
  return <>

{note===[]?  <div className="loadSpinner">
  <span class="loader"></span>

  </div>:  
  <div className="container">
    <div className="row justify-content-end mt-5">
        <div className="col-md-2">
    <Modal getNoteFromUser={getNoteFromUser} addNote={addNote}/>
    </div>
    </div>
    <div className="row mt-5">

    {note=='no notes found'?<div className="mt-5  d-flex justify-content-center align-item-center fs-1">not found any note</div>
:note.map((elm,index)=><div key={elm._id}   data-aos-duration="1500" data-aos='fade-up' className="col-md-4  mb-4">
<div className="cont shadoww rounded note p-2">
<div className="line1 rounded-3 p-3  d-flex justify-content-between align-items-center  my-4 ">
<div className=" title fs-3">
<p className='mb-0'>{elm.title}</p>

</div>
<div className=" d-flex justify-content-center align-items-center w-50   ">
    <button  onClick={()=>{alertBeforDelete(elm._id)}}><i className="icon-d-u  me-4 fs-4 text-danger fa-solid fa-trash-can"></i></button>
    <button onClick={()=>{getIdOfNote(index)}} type="button" className="btn-newNode " data-bs-toggle="modal" data-bs-target="#updateModal">
<i className="icon-d-u iconUpdate  fa-regular fs-4  fa-pen-to-square"></i>
</button>


</div>
</div>
<div className="line2 fs-5 my-3 ms-2 text-start text-dark">
    <p>{elm.desc}</p>
</div>
</div>
</div>)
  
}
 
    
  </div>
  </div> }



{/* update model */}
  
  <div className="modal fade " id="updateModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false">
  <div className="modal-dialog modal-xl">
    <div className="modal-content bg-dark">
    <div className="modal-header d-flex justify-content-between">
        <div data-bs-dismiss="modal" className="icon-close fs-3"> </div>
       
      </div>
        <form   className='p-4'>
    <input onChange={getNoteAfterUpdate}  type="text" name='title' placeholder='Enter Title note' className='form-control  p-3 mb-3' />
    <textarea  onChange={getNoteAfterUpdate}   name='desc' placeholder='Enter Description Note' className='form-control border-danger p-3'  id="" cols="30" rows="10"></textarea>
    </form>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button  onClick={updateNote} type="button"  data-bs-dismiss="modal" className="btn btn-primary">update Note</button>
      </div>
    </div>
  </div>
</div>



  </>
}
