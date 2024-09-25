import axios from "axios";
import { useEffect, useState } from "react";
import { CardBody, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Home(){
    const MOVIE_API = `https://api.themoviedb.org/3/movie/now_playing?api_key=ddd8e88d2fc8e84209529693b67663e2&language=en-US&page=1`;
    const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500"

    const [movies, setMovies] = useState([])
    const navigate  = useNavigate()
    useEffect(()=>{
        axios.get(MOVIE_API).then((resp)=>{
            console.log(resp.data.results)
            setMovies(resp.data.results)
        })
    },[MOVIE_API])

    const handleClick =(movie) =>{
            navigate('/movies/'+movie.id, {state: movie})
    }
    
    return(
        <div style={{display:'flex', flexWrap:'wrap', paddingLeft:170, backgroundColor:'orangeRed', width:'100%'}}>
            {
                movies.map((movie)=>{
                    return(
                        <div key={movie.id}>
                            <Card onClick={() => handleClick(movie)} style={{display:'flex', flexWrap:'wrap', width: 300, height:350, margin:20}}>
                                <Card.Img src={`${IMG_BASE_URL}${movie.poster_path}`} height={200} />
                                <CardBody>
                                    <Card.Title>{movie.title}</Card.Title>
                                    <Card.Text>{movie.overview.slice(0,90)}</Card.Text>
                                </CardBody>
                            </Card>
                        </div>
                    )
                })
            }
        </div>
    )
}