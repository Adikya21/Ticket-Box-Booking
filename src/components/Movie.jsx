import { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
export default function Movie() {

    const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";
    const TIMINGS = ["10:30 AM", "03:00 PM", "06:00 PM", "09:00 PM"]
    const location = useLocation();
    // console.log(location)
    const { title, overview, poster_path } = location.state;
    const navigate = useNavigate();
    const [latlng, setlatlng] = useState({});
    const [theatres, setTheatres] = useState([]);

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                // console.log(position.coords.latitude, position.coords.longitude)
                setlatlng({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                })
            })
        }
    }, [])
    // console.log(latlng)
    useEffect(() => {
        if (Object.keys(latlng).length > 0) {
            const geoAPI = `https://api.geoapify.com/v2/places?categories=entertainment.cinema&filter=circle:${latlng.lng},${latlng.lat},5000&bias=proximity:78.4371616,17.3713207&limit=20&apiKey=1d4bd7ac4ae843f39487e490bda7245f`;
            axios.get(geoAPI).then(res => {
                const featureArr = res.data.features;
                const names = [];
                featureArr.map((feature) => names.push(feature.properties.name))
                setTheatres(names.slice(0,8))
            })
        }

    }, [latlng])
    return (
        <div>
            <Row>
                <Col>
                    <div style={{ padding: 70 }}>
                        <img style={{ borderRadius: 8, marginBottom: 24 }} alt="" src={IMG_BASE_URL + poster_path} height={300} width={250} />
                        <h2>{title}</h2>
                        <h5>{overview}</h5>
                    </div>

                </Col>
                <Col >
                    <div style={{ padding: 70 }}>
                        {
                            theatres.map((theatre, index) => {
                                return (
                                    <div key={index} style={{marginBottom:20}}>
                                        <h4 style={{marginBottom:10}}>{theatre}</h4>
                                        {
                                            TIMINGS.map((time, indx) => {
                                                return <Button onClick={() =>{
                                                    navigate('/select', {state: {title:title}})
                                                }} style={{marginRight: 20}} key={indx}>{time}</Button>
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </Col>
            </Row>
        </div>
    )
}