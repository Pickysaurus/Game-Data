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

interface IGameListProps {
    games: IStaticGameEntry[];
    gamesError?: Error;
}

export async function getServerSideProps() {
    try {
        const games = await getAllGames();
        return { props: { games } };
    }
    catch(err) {
        return { props:{ games: [], gamesEror: err } };
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
                // size='lg'
                onChange={updateFilter}
                placeholder='Search for a game by title or domain name.'
            /><hr/>
            </div>
            <div>{displayableGames.slice(pageOffset, pageOffset + 20).map(g => (<Link href={`/games/${g.domain_name}`} id={g.id.toString()}><Image src={g.image!} width={70} height={90} alt={g.name} /></Link>))}</div>
            <Button onClick={() => setPageOffset(pageOffset - 20)} disabled={pageOffset === 0}>{'<'}</Button><Button onClick={() => setPageOffset(pageOffset + 20)}>{'>'}</Button>
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