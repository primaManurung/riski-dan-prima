import { useState, useEffect } from "react"
import axios from "axios"
import { useHistory, useParams } from "react-router-dom"
// import { duration } from "@mui/material"

const MovieForm = ()=>{
    let history = useHistory()
    let {id} = useParams()
    let initalForm ={
        title: "",
        description: "",
        genre:"",
        year: 0,
        duration:0,
        rating:0,
        review:"",
        image_url:""
    }
    const url = "https://backendexample.sanbersy.com"
    const [input, setInput] = useState(initalForm) // state
    const [currentId, setCurrentId] = useState(null) // state for currentId (for handleEdit function)

    const fetchData = async ()=>{
        let result = await axios.get(`${url}/api/movie/${id}`)
        let {title, description, genre, year, duration, rating, review, image_url} = result.data 

        setInput({title, description, genre, year, duration, rating, review, image_url})
        setCurrentId(id)
    }

    useEffect(()=>{
        if (id){
            fetchData()
        }
    },[id])

    
    const handleSubmit = (event)=>{
        event.preventDefault()

        if (currentId === null){
            // create section
            axios.post(`${url}/api/movie`, {...input}).then((res)=>{
                history.push('/movie')
            })
        }else{
            // update section
            axios.put(`${url}/api/movie/${currentId}`, {...input}).then(()=>{
                history.push('/movie')
            })
        }

        // clear form
        setCurrentId(null)
        setInput(initalForm)
    }


    const handleChange = (event)=>{
        let {name, value} = event.target
        setInput({...input, [name]: value})
    }

    return(
        <div className="App">
            <h1>Data of Movie</h1>
            <div className="custom-form">
                <form onSubmit={handleSubmit}>
                    <div className="custom-input">
                        <label htmlFor="name">Judul</label>
                        <input required autoComplete="off" type="text" name="title" value={input.title} onChange={handleChange} placeholder="Masukkan Judul"/>
                    </div>
                    <div className="custom-input">
                        <label htmlFor="name">Description</label>
                        <textarea required className="inputDescription" autoComplete="off" type="text" name="description" value={input.description} onChange={handleChange} placeholder="Masukkan Description"/>
                    </div>
                    <div className="custom-input">
                        <label htmlFor="name">Genre</label>
                        <input required autoComplete="off" type="text"  name="genre" value={input.genre} onChange={handleChange} placeholder="Masukkan Genre"/>
                    </div>
                    <div className="custom-input">
                        <label htmlFor="name">Tahun</label>
                        <input required autoComplete="off" type="number"  name="year" value={input.year} onChange={handleChange} placeholder="Masukkan Tahun"/>
                    </div>
                    <div className="custom-input">
                        <label htmlFor="name">Duration</label>
                        <input required autoComplete="off" type="number"  name="duration" value={input.duration} onChange={handleChange} placeholder="Masukkan Durasi"/>
                    </div>
                    <div className="custom-input">
                        <label htmlFor="name">Rating</label>
                        <input required autoComplete="off" type="number"  name="rating" value={input.rating} onChange={handleChange} placeholder="Masukkan Rating"/>
                    </div>
                    <div className="custom-input">
                        <label htmlFor="name">Review</label>
                        <input required autoComplete="off" type="text"  name="review" value={input.review} onChange={handleChange} placeholder="Masukkan Review
                        "/>
                    </div>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        </div>
    )
}

export default MovieForm
