import { useAtom } from "jotai";
import { favoritesAtom } from "@/store";
import Col from "react-bootstrap/Col";
import Card  from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import ArtworkCard from "@/components/ArtworkCard";


export default function Favourites(){
    const [favoritesList, setFavoritesList] = useAtom(favoritesAtom);
    if(!favoritesList) return null;
    return(
        <>               
            <Row className="gy-4">                   
                {favoritesList.length > 0 ? favoritesList.map((artwork)=> (
                    <Col lg={3} key={artwork}><ArtworkCard objectID={artwork} /></Col>
                ))  : <Card>
                        <Card.Body>
                        <h4>Nothing Here</h4>
                        Try adding some new artwork to the list.
                        </Card.Body>
                    </Card>}     
                    </Row>                
        </>
    )
    
}

