import useSWR from 'swr';
import Card from 'react-bootstrap/Card';
import Error from 'next/error';
import { favoritesAtom } from '@/store';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { addToFavourites } from '@/lib/userData';
import { removeFromFavourites } from '@/lib/userData';
import { useEffect } from 'react';


export default function ArtworkCardDetail(props) {   
    const { data, error } = useSWR(props.objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}` : null);
    const [favoritesList, setFavoritesList] = useAtom(favoritesAtom);
    const [showAdded, setShowAdded] = useState(false);
    useEffect(()=>{
        setShowAdded(favoritesList?.includes(props.objectID));
       }, [favoritesList])
       
    async function favoritesCLicked(){
        if(showAdded){
            setFavoritesList(await removeFromFavourites(props.objectID));
            setShowAdded(false);          
        }
        else{
            console.log("ok1")
            setFavoritesList(await addToFavourites(props.objectID));
            setShowAdded(true);          
        }
    }
    if(data){       
        return(
            <>
                <Card>
                    {data.primaryImage? <Card.Img src={data.primaryImage}/> : "" }
                    <Card.Body>
                        <Card.Title>{data.title? data.title : "N/A"}</Card.Title>
                        <Card.Text>
                            <strong>Date:</strong> &nbsp;{data.objectDate? data.objectDate : "N/A"} <br/>
                            <strong>Classification:</strong> &nbsp;{data.classification? data.classification : "N/A"} <br/>
                            <strong>Medium:</strong> &nbsp;{data.medium ? data.medium : "N/A"} 
                            <br/>
                            <br/>
                            <strong>Artist:</strong> &nbsp; {data.artistDisplayName ?  data.artistDisplayName : "N/A" } {data.artistDisplayName ? <>( <a href={data.artistWikidata_URL} target="_blank" rel="noreferrer">wiki</a> ) </> : "" }<br/>
                            <strong>Credit Line:</strong>&nbsp; {data.creditLine ? data.creditLine : "N/A"} <br/>
                            <strong>Dimensions:</strong>&nbsp; {data.dimensions ? data.dimensions : "N/A"} <br/><br/>
                            <Button variant={showAdded? "primary" : "outline-primary"} onClick={favoritesCLicked}>{(showAdded && "+ Favourite (added)") || "+ Favourite"}</Button>     
                                 
                        </Card.Text> 
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