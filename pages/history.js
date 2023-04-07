import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { useRouter } from "next/router";
import { Card } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import styles from '@/styles/History.module.css';
import {Button} from "react-bootstrap";
import { removeFromHistory } from "@/lib/userData";
import { Fragment } from "react";

export default function History(){
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const router = useRouter();
    if(!searchHistory) return null;

    let parsedHistory = [];
    searchHistory.forEach(h => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
    });
    function historyClicked(e, index){
        e.preventDefault();        
        let url = `/artwork?${searchHistory[index]}`;
        router.push(url);
    }
    async function removeHistoryClicked(e, index){
        e.stopPropagation(); // stop the event from trigging other events
        setSearchHistory(await removeFromHistory(searchHistory[index]));
    }
    return (
        <>                             
            {parsedHistory.length > 0 ? <ListGroup> {parsedHistory.map((history, index)=> (
                                                   
                    <ListGroup.Item className={styles.historyListItem} key={index} onClick={e =>{historyClicked(e, index)}}>{Object.keys(history).map(key => (<Fragment key={key}>{key}: <strong>{history[key]}</strong>&nbsp;</Fragment>))}
                    <Button className="float-end" variant="danger" size="sm" onClick={e => removeHistoryClicked(e, index)}>&times;</Button>
                    </ListGroup.Item>                    
            ))}  </ListGroup> : <Card>
                    <Card.Body>
                        <h4>Nothing Here</h4>
                        Try searching for some artwork.
                    </Card.Body>
                </Card>}  
        </>
    )
}