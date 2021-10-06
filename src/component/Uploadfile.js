import React,{useState} from 'react';
import NavBar from './Navbar';
import {useHistory } from 'react-router-dom';

import axios from 'axios';

const Uploadfile = () => {

    let history = useHistory();

    const [formData,setFormData] = useState({
        title:'',
    })
    const { title,file } = formData;
    const onChange = e => setFormData({...formData,[e.target.name]:e.target.value})
    
    const onFileChange = (e) =>{
        // console.log(e.target.files[0])
        setFormData({...formData,file:e.target.files[0]})
    }


    const onsubmit=async (e) => {
        try {
            e.preventDefault();
        
            var bodyFormData = new FormData();

            bodyFormData.append("title",title)
            bodyFormData.append("files",file)


            console.log('----')
            const config = {
                headers: {
                    'Content-Type':'application/json',
                    'Authorization': localStorage.getItem("token")
                }
            }
            
            const res = await axios.post('http://localhost:3001/upload/file',bodyFormData , config)

            history.push('/dashboard')
        } catch(err) {
            if(err.response.status === 400) {
                alert('server error')
            } 
        }
    }
    return (
        <div>
        <NavBar />
        <section class="container-fluid bg">
        <section class="row justify-content-center">
          <section class="col-12 col-sm-6 col-md-3"> 
            <div class="container">
                <form class="form-container" action="login_teacher.php" method="POST">
                    <div class="form-group">
                    <label for="exampleInputEmail1">Title</label>
                    <input type="text"
                     required 
                     class="form-control"
                     id="exampleInputEmail1" 
                     name='title'
                     value={title}
                     onChange={e=>onChange(e)}

                     >
                     </input>
                    </div>

                    
                        <label for="img">Select image:</label>
                        <input 
                            type="file" 
                            id="img" 
                            name="itemImage"
                            onChange = {e => onFileChange(e)}
                            accept="image/*"
                            >
                        </input> 
                    
                  <hr></hr>
                  <button type="submit" className="btn btn-success btn-block" onClick={(e) => onsubmit(e)}>Upload</button>

                  </form>  
            </div>
          </section>
          </section>
          </section>
        
        </div>
    )
}

export default Uploadfile;