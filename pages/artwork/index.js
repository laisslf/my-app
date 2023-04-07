import { useRouter } from "next/router";
import {useState} from 'react';
import { useEffect } from "react";
import Col from "react-bootstrap/Col";
import Card  from "react-bootstrap/Card";
import Pagination from 'react-bootstrap/Pagination';
import Row from "react-bootstrap/Row";
import useSWR from "swr";
import ArtworkCard from "@/components/ArtworkCard";
import Error from "next/error";
import validObjectIDList from '@/public/data/validObjectIDList.json'


const PER_PAGE = 12;
export default function Artwork() {
    const [page, setPage] = useState(1);
    const [artworkList, setArtworkList] = useState([]);
    const router = useRouter();
    let finalQuery = router.asPath.split('?')[1];
    let url = `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`
    const { data, error } = useSWR(url);
    
    useEffect(() => {                      
        if(data) {    
            let filteredResults = validObjectIDList.objectIDs.filter(x => data.objectIDs?.includes(x));              
            const results = [];
            for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
                const chunk = filteredResults.slice(i, i + PER_PAGE);
                results.push(chunk);
            }                            
            setArtworkList(results);
            setPage(1);                    
        }
        
    }, [data])   
    function previousPage() {
        if(page > 1){
          setPage(x => x - 1);
        }
    };
    function nextPage() {
        if(page < artworkList.length){
            setPage(x => x + 1);
        }        
    };
       
   
    if(error){
        return(
            <Error statusCode={404} />
        )
    }
    else {
        return(
            <>               
                <Row className="gy-4">                   
                    {artworkList.length > 0 ? artworkList[page - 1]?.map((artwork)=> (
                        <Col lg={3} key={artwork}><ArtworkCard objectID={artwork} /></Col>
                    ))  : <Card>
                            <h4>Nothing Here</h4>
                            Try searching for something else.
                        </Card>}                     
                
                        </Row>
                {artworkList.length > 0 ? 
                    <Col>
                        <Pagination>
                            <Pagination.Prev onClick={previousPage}/>
                            <Pagination.Item>{page}</Pagination.Item>
                            <Pagination.Next onClick={nextPage}/>
                    </Pagination>
                    </Col>
                    :
                <></>} 
            </>
        )
    }     
}