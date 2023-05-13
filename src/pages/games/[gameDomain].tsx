import { useRouter } from 'next/router';

const GameDetails = () => {
    const router = useRouter();
    const { gameDomain } = router.query;

    return <p>GameDomain: {gameDomain}</p>
}

export default GameDetails