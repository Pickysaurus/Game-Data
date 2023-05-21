import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import { getAllGames, IStaticGameEntry } from '@/util/NexusMods/nexusapi';
import { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import GameTile from '@/components/gameTile';

const staticCache = 15 * 60;

interface IGameListProps {
    games: IStaticGameEntry[];
    gamesError?: Error;
}

export async function getServerSideProps() {
    try {
        const games = await getAllGames();
        return { props: { games }, revalidate: staticCache };
    }
    catch(err) {
        return { props:{ games: [], gamesEror: err }, revalidate: 10 };
    }
}

export default function Games(props: IGameListProps) {
    const [filterQuery, setFilterQuery] = useState();
    const [pageOffset, setPageOffset] = useState(0);

    const displayableGames = filterQuery
    ? props.games.filter(g => g.name.toLowerCase().includes(filterQuery))
    : props.games;    

    const updateFilter = (event: ChangeEvent<any>) => setFilterQuery(event.currentTarget.value.toLowerCase())

    return (
        <div>
            <h1>Games ({displayableGames.length.toLocaleString()})</h1>
            <div><Form.Control 
                type='input'
                id='searchInput'
                onChange={updateFilter}
                placeholder='Search for a game by title or domain name.'
            /><hr/>
            </div>
            <Container>
                <Row>
                <Col><GameTile game={props.games[0]} /></Col>
                <Col><GameTile game={props.games[1]} /></Col>
                <Col><GameTile game={props.games[2]} /></Col>
                </Row>
            </Container>
        </div>
    )
}