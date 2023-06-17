import Image from 'next/image';
import { IStaticGameEntry } from '@/util/NexusMods/nexusapi';

interface IGameHeaderProps {
    game: IStaticGameEntry | null
}

const GameHeader = (props: IGameHeaderProps) => {
    const { game } = props;

    if (!game) return (
        <div><h1>Not Found</h1></div>
    )

    const { name, domain_name, id, genre, file_count, downloads, mods, collections, image } = game;
    const blurredImage = image?.replace('4_3/', '4_3/b/');

    return (
        <div 
            className='game-header' 
            style={{
                background: `center / cover no-repeat url(${blurredImage})`, 
            }}
        >
            <div className='game-header-content' >
                <Image src={image!} alt={`Game artwork for ${name}`} width={96} height={120}  />
                <span className='title'>
                    <h1>{name}</h1>
                    <div>ID: {id} | Genre: {genre} | Engine: <i>Unknown</i></div>
                    <div>Developer: <i>Unknown</i> | Publisher: <i>Unknown</i></div>
                </span>
            </div>
        </div>
    )

}

export default GameHeader;