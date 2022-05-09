import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'


function ActionPlan() {
    const [data, setdata] = useState([]);

    const loadData=async ()=>{
        const response=await axios.get("http://localhost:3001/readingactionplan");
        setdata(response.data)
    }
    
    useEffect(()=>{
        loadData();
    },[])

  return (
    <div style={{marginTop:'150px'}}>
        <table className='styled-table'>
            <thead>
            <tr>
                <th style={{textAlign:'center'}}>No.</th>
                <th style={{textAlign:'center'}}>Date</th>
                <th style={{textAlign:'center'}}>Plan</th>
                <th style={{textAlign:'center'}}>Name</th>
            </tr>
            </thead>
            <tbody>
                {data.map((item,index)=>{
                    return(
                        <tr key={item.id}>
                            <th scope='row'>{index+1}</th>
                            <td>{id.id}</td>
                            <td>{id.date}</td>
                            <td>{id.plan}</td>
                            <td>{id.name}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
  )
}

export default ActionPlan