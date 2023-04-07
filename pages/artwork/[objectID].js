import { Col, Row } from "react-bootstrap";
import ArtworkCardDetail from "@/components/ArtworkCardDetail";
import { useRouter } from "next/router";

export default function objectID(props) {
    const router = useRouter();
    const { id } = router.query;
    return(
        <Row>
            <Col>
                <ArtworkCardDetail objectID={id} />
            </Col>
        </Row>
    )
    
}