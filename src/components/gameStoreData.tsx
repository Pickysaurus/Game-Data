import StoreIcon from "@/components/StoreIcon"
import Accordion from 'react-bootstrap/Accordion'

const GameStoreData = () => {
    return (
        <Accordion flush>
            <Accordion.Item eventKey="0">
                <Accordion.Header><b><StoreIcon store="Steam" /> Steam</b></Accordion.Header>
                <Accordion.Body>
                    fsdfgdsf
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header><b><StoreIcon store="GOG" /> GOG.com</b></Accordion.Header>
                <Accordion.Body></Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
                <Accordion.Header><b><StoreIcon store="Epic" /> Epic Games</b></Accordion.Header>
                <Accordion.Body></Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
                <Accordion.Header><b><StoreIcon store="Xbox" /> Xbox</b></Accordion.Header>
                <Accordion.Body></Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
                <Accordion.Header><b><StoreIcon store="EA" /> EA</b></Accordion.Header>
                <Accordion.Body></Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="5">
                <Accordion.Header><b><StoreIcon store="Ubisoft" /> UPlay</b></Accordion.Header>
                <Accordion.Body></Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="6">
                <Accordion.Header><b><StoreIcon store="Amazon" /> Amazon Games</b></Accordion.Header>
                <Accordion.Body></Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="7">
                <Accordion.Header><b><StoreIcon store="Rockstar" /> Rockstar</b></Accordion.Header>
                <Accordion.Body></Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="8">
                <Accordion.Header><b><StoreIcon store="Battlenet" /> Battle.net</b></Accordion.Header>
                <Accordion.Body></Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default GameStoreData;