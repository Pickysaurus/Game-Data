import Image from 'next/image';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { IStaticGameEntry } from '@/util/NexusMods/nexusapi';
import { useRouter } from 'next/router';
import StoreIcon from './StoreIcon';

interface IGameTileProps {
    game: IStaticGameEntry;
}

export default function GameTile(props: IGameTileProps) {
    const { game } = props;
    const router = useRouter();

    return (
        <div className='gametile-card' onClick={() => router.push(`/games/${game.domain_name}`)}>
            <Container>
                <Row className='g-2'>
                    <Col>
                    <Image src={game.image!} width={140} height={180} alt={game.name} />
                    </Col>
                    <Col>
                    <h4>{game.name}</h4>
                    <div>
                        <StoreIcon store='GOG' style={{margin: '4px 4px 4px 0'}} />
                        <StoreIcon store='Steam' />
                        <StoreIcon store='Epic' />
                        <StoreIcon store='Xbox' />
                        <StoreIcon store="EA"  disabled style={{margin: '4px 4px 4px 0'}}/>
                        <StoreIcon store="Ubisoft" disabled/>
                        <StoreIcon store="Amazon" disabled/>
                        <StoreIcon store="Rockstar" disabled/>
                        <StoreIcon store="Battlenet" disabled style={{margin: '4px 4px 4px 0'}}/>
                    </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
} 