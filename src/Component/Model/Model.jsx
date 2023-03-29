import React, { useEffect } from 'react'

export default function Modal({addNote,getNoteFromUser}) {


  return <>
  
        <button type="button" className='d-flex bg-dark p-2 fs-4 text-white rounded shadoww'  data-bs-toggle="modal" data-bs-target="#exampleModal">
    <div className="iconAdd rounded-circle ">
    <i className="  fa-solid fa-plus"></i>
    </div>
    <div className="textAddNote ">
      <p className='mb-0'>Add Note</p>
    </div>

  
</button>

<div className="modal fade " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false">
  <div className="modal-dialog modal-xl">
    <div className="modal-content bg-dark">
    <div className="modal-header d-flex justify-content-between">
        <div data-bs-dismiss="modal" className="icon-close fs-3"> </div>
       
      </div>
        <form  className='p-4'>
    <input onChange={getNoteFromUser} type="text" name='title' placeholder='Enter Title node' className='form-control p-3 mb-3' />
    <textarea onChange={getNoteFromUser}  name='desc' placeholder='Enter Node' className='form-control p-3'  id="" cols="30" rows="10"></textarea>
    </form>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button onClick={addNote}  type="button"  data-bs-dismiss="modal" className="btn btn-primary">Add Note</button>
      </div>
    </div>
  </div>
</div>
  </>
}
