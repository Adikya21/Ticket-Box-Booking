import { Row, Col } from "react-bootstrap";
import ChechoutCorn from '../assets/corn.png';
import codeimg from '../assets/code.jpg'
export default function CheckOut(){
    return(
        <div>
            <Row>
                <Col style={{paddingLeft: 200, paddingTop:90}}>
                    <img src={ChechoutCorn} alt="" height={400}/>
                    <h2 style={{marginTop:30}}>Tickets Confirmed!</h2>
                    <p>Enjoy your Movie</p>
                </Col>
                <Col style={{padding: 110}}>
                    <img src={codeimg} alt="" height={400}/>
                </Col>
            </Row>
        </div>
    )
}