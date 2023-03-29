import React from 'react'

export default function UpdateModel({id}) {
  return <>
  
  <button type="button" className="btn-newNode " data-bs-toggle="modal" data-bs-target="#exampleModal">


  <i className="icon-d-u iconUpdate  fa-regular fs-4  fa-pen-to-square"></i>
</button>

<div className="modal fade " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false">
<div className="modal-dialog modal-xl">
<div className="modal-content">
<div className="modal-header d-flex justify-content-between">
  <div data-bs-dismiss="modal" className="icon-close fs-3"> </div>
 
</div>
{console.log(id)}
  <form  className='p-4'>
<input  type="text" name='title'  placeholder='Enter Title node' className='form-control p-3 mb-3' />
<textarea   name='desc'  placeholder='Enter Node' className='form-control p-3'  id="" cols="30" rows="10"></textarea>
</form>
<div className="modal-footer">
  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
  <button  type="button"  data-bs-dismiss="reset" className="btn btn-primary">Uptade Note</button>
</div>
</div>
</div>
</div>
</>
}
