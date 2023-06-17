import { useRouter } from 'next/router';
import { getAllGames, IStaticGameEntry } from '@/util/NexusMods/nexusapi';
import GameHeader from '@/components/gameHeader';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Icon } from '@mdi/react'
import { mdiPlusBoxMultiple, mdiPlusBox, mdiStore, mdiRelationManyToOne } from '@mdi/js'
import GameStoreData from '@/components/gameStoreData';

export async function getServerSideProps(context: any): Promise<{props: IGameDetailsProps}> {
    const { gameDomain } = context.query;
    try {
        const games = await getAllGames();
        const game = games.find(g => g.domain_name === gameDomain);
        console.log('Found game', {game, gameDomain})
        return { props: { game: game ?? null } };
    }
    catch(err) {
        console.warn(err)
        return { props:{ game: null, } };
    }
}

interface IGameDetailsProps {
    game: IStaticGameEntry | null;
}

const GameDetails = (props: IGameDetailsProps) => {
    const router = useRouter();
    const { gameDomain } = router.query;

    return (
        <div>
            <GameHeader game={props.game} />
            <Tabs
                defaultActiveKey='stores'
                id='gametabs'
                className='mb-3'
                
            >
                <Tab eventKey={'stores'} title={<><Icon path={mdiStore} size={1}/> Game Stores</>}>
                    <GameStoreData />
                </Tab>
                <Tab eventKey={'dlcs'} title={<><Icon path={mdiPlusBoxMultiple} size={1}/> DLCs</>}>
                    <div>
                        <div><b><Icon path={mdiPlusBox} size={1} /> Standalone DLCs</b></div>
                        <div>No data.</div>
                    </div>
                    <div>
                        <div><b><Icon path={mdiPlusBoxMultiple} size={1} /> DLC Bundles</b></div>
                        <div>No data.</div>
                    </div>
                </Tab>
                <Tab eventKey={'names'} title={<><Icon path={mdiRelationManyToOne} size={1}/> Alternative Names</>}>
                    Names
                </Tab>
            </Tabs>
        </div>
    )
}

export default GameDetails