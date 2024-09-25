import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";

export default function SelectSeat(){
    const navigate = useNavigate();
    const location = useLocation();
    const {title} = location.state;
    const [seatsMatrix, setSeatsMatrix] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);

    const handleSelect = (newSeat) =>{
        setSelectedSeats([...selectedSeats, newSeat]);
    }

    const createSeats = () =>{
        let totalRows = 8;
        let numberOFSeatsInaRow = 10;
        let tempSeats = [];
        let row = 0;
        let ch = 'A'
        while(row < totalRows){
            let col = 1;
            let rowArr = [];
            while(col < numberOFSeatsInaRow){
                rowArr.push(ch+col);
                col++;
            }
            tempSeats.push(rowArr);
            row++;
            ch = String.fromCharCode(ch.charCodeAt(0)+1);
            }
            setSeatsMatrix(tempSeats)
    }
    useEffect(()=>{
        createSeats();
    },[])
    return(
        <div style={{padding:50}}>
            <div>
            <h3 className="d-inline-block">{title}</h3>
            <div style={{marginLeft:500}} className="d-inline-block">Screen this side</div>
            </div>
            <div style={{marginTop:30}}>
                {
                    seatsMatrix.map((seatsArr, idx)=>{
                        return (
                            <Row key={idx} style={{marginBottom:20}}>
                                {seatsArr.map((seat)=>{
                                    let isSelected = selectedSeats.indexOf(seat) > -1;                                return (
                                    <Col key={seat}>
                                        <Button style={{backgroundColor: isSelected ?'green' : 'grey', border:'none'}} onClick={() => handleSelect(seat)}>{seat}</Button>
                                    </Col>)
                            })}
                            </Row>
                            
                        )
                    })
                }
            </div>
            <div style={{marginTop: 45}}>
                {
                    selectedSeats.length> 0 ? 
                    <div>{selectedSeats.map((seat)=>{
                        return <span style={{marginRight:20}} key={seat}>{seat}</span>
                    })}
                    seats selected 
                    <div>
                        <h4>Total: Rs.{selectedSeats.length * 200}</h4>
                        <Button onClick={() => navigate('/success')} >Checkout</Button>
                    </div>
                    </div> : 
                    <div>No Seats Selected</div>
                }
            </div>
        </div>
    )
}