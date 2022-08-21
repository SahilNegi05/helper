import React, { useEffect, useState } from 'react'
import { informationDetails } from '../../services/api/api.service'
import { useParams } from 'react-router-dom'

export default function AboutUs(props) {
    const { pid } = useParams()
    const [title, setTitle] = useState(null)
    const [data, getdata] = useState([])
    useEffect(() => {
        informationDetails(pid)
            .then((res) => {
                if (res.data.status == 200) {
                    getdata(res.data.data[0].content)
                    setTitle(res.data.data[0].title)
                } else {
                    getdata([])
                }
            })
    }, [pid])

    return (
        <div className='container_fluid content_page'>
            <div className='container'>
                <h2>{title}</h2>
            <div dangerouslySetInnerHTML={{ __html: data }} />
            </div>
        </div>
    )
}
