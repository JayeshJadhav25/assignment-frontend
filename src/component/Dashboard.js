import React,{useState,useEffect} from 'react';
import NavBar from './Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {useHistory } from 'react-router-dom';


const Dashboard=()=> { 

    let history = useHistory();

    const [data, setData] = useState({
        images: []
    })
    const config = {
        headers: {
            'Content-Type':'application/json',
            'Authorization': localStorage.getItem("token")
        }
    }
    const getImages = () => {
        try {
            axios.get("http://localhost:3001/upload/getprofile",config).then((res) => {
                setData({images: res.data})
            })
        } catch(err) {
           
        }
       
    }

    useEffect(() => {
        getImages()
    },[])

    const ondelete=async (e,id) => {
        e.preventDefault();
        if(window.confirm('Are You Sure You want to delete?')) 
        {
            axios.delete("http://localhost:3001/upload/deletefile/"+id,config).then((res) => {
                getImages()
            })
        } 
    }

    const ondownload = (e,uniquecode,fileUrl) => {
        e.preventDefault();
        const ucode = prompt('Please enter your code')
        if(ucode) {
            if(ucode == uniquecode) {
                console.log('downl')
                axios({
                    url:fileUrl,
                    method:'GET',
                    responseType:'blob'
                }).then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response.data]))

                    const link =document.createElement('a')

                    link.href = link

                    link.setAttribute('download',fileUrl)
                    document.body.appendChild(link)
                    link.click()
                })
            } else {
                alert('Uniquecode Is Invalid... Can not download')
            }
           
        } 
       
    }

    return (
        <div>
            <NavBar/>
            <Link to = "/upload" id="topm" className="btn btn-primary">Upload File</Link>
            <table id="topm" class="table table-hover">
            <thead>
          <tr>
            <th>Title</th>
            <th>File</th>
            <th>Unique Code </th>
            <th>Download</th>
            <th></th>
          </tr>
            </thead>
            <tbody>
            {data.images.map(item => (

                <tr key={item.id}>
                <td>{item.title}</td>
                  <td><img src={item.fileUrl} alt="Item Image"/></td>
                  <td>{item.unicode}</td>
                  <td><button className="btn btn-success" onClick={(e) => ondownload(e,item.unicode,item.fileUrl)}>Download</button></td>
                  <td><button className="btn btn-danger" onClick={(e) => ondelete(e,item.id)}>Delete</button></td>
                </tr>
                ))}
         

            </tbody>
        </table>
        </div>
    )

}

export default Dashboard; 