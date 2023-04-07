import useSWR from 'swr';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import Error from 'next/error';

export default function ArtworkCard(props) {
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`);    
    if(data){
        return(
            <>
                <Card>
                    <Card.Img src={data.primaryImageSmall? data.primaryImageSmall : 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]'}></Card.Img>
                    <Card.Body>
                        <Card.Title>{data.title? data.title : "N/A"}</Card.Title>
                        <Card.Text>
                            <strong>Date:</strong> &nbsp;{data.objectDate? data.objectDate : "N/A"} <br/>
                            <strong>Classification:</strong> &nbsp;{data.classification? data.classification : "N/A"}<br/> 
                            <strong>Medium:</strong> &nbsp;{data.medium ? data.medium : "N/A"} <br/>
                        </Card.Text>
                        <Link href={`/artwork/${props.objectID}`} passHref><Button type="button" variant="outline-secondary">{props.objectID}</Button></Link>
                    </Card.Body>
                </Card>
            </>
        )
    }
    else if (error){
        return(
            <Error statusCode={404} />
        )
    }
    else{
        return(
            null
        )
    }
}