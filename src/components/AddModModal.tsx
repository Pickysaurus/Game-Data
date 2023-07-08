import { useState, useMemo, useEffect, FormEvent } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Image from 'next/image';
import { Icon } from '@mdi/react'
import { mdiMagnify } from '@mdi/js';
import { IModFile, IModSearchResult, IStaticGameEntry, getAllGames } from '@/util/NexusMods/nexusapi';
import ModFilesPicker from './ModFilesPicker';
import debounce from 'lodash.debounce';

type ModalState = 'mod' | 'file';

interface IProps {
    show: boolean;
    setVisible: (status: boolean) => void;
    addMod: (mod: any) => void;
    apikey: string | undefined;
}

export default function AddModModal(props: IProps) {
    const [stage, setStage] = useState<ModalState>('mod');
    const { setVisible, show, apikey, addMod } = props;
    const [modPage, setModPage] = useState<IModSearchResult|undefined>(undefined);
    const [query, setQuery] = useState<string>('');
    const [searchResults, setSearchResults] = useState<IModSearchResult[]>([]);
    const [modFileOptions, setModFileOptions] = useState<IModFile[]|undefined>(undefined);
    const [games, setGames] = useState<(IStaticGameEntry[] | undefined | Error)>(undefined);
    const [gameFilter, setGameFilter] = useState<(IStaticGameEntry | undefined)>(undefined);

    useEffect(() => {
        if (!modPage) setStage('mod');
        else setStage('file');
    }, [modPage]);

    useMemo(async () => {
        if (!modPage) return setModFileOptions(undefined);
        const domain = modPage?.game.domainName;
        const id = modPage?.modId;
        const endpoint = '/api/modFileLookup?';

        const options: RequestInit = {
            method: 'GET',
            headers: {}
        }
        if (!!apikey) options.headers = {apikey};

        const params: URLSearchParams = new URLSearchParams({
            domain,
            id: id.toString(),
        });

        try {
            const response = await fetch(endpoint+params.toString(), options);
            if (!response.ok) {
                return console.error('File Search failed!', response.statusText);
            }
            const result: IModFile[] = await response.json();

            return setModFileOptions(result);
        }
        catch(err) {
            console.error('Fetch for file search failed', err);
        }

    }, [modPage, apikey]);

    useMemo(async () => {
        // if (!query || !apikey) setSearchResults([]);
        const endpoint = '/api/modSearch?';

        const options: RequestInit = {
            method: 'GET',
            headers: {}
        }
        if (!!apikey) options.headers = {apikey};

        const params: URLSearchParams = new URLSearchParams({
            term: query,
            gameId: `${gameFilter?.id ?? 0}`,
        });

        try {
            const response = await fetch(endpoint+params.toString(), options);
            if (!response.ok) {
                return console.error('Search failed!', response.statusText);
            }
            const result: IModSearchResult[] = await response.json();

            setSearchResults(result);
        }
        catch(err) {
            console.error('Fetch for mod search failed', err);
        }
    }, [query, gameFilter, apikey]);

    // Populate the games list
    useMemo(async () => {
        if (Array.isArray(games) && !games.length) {
            console.log('Fetching games list...');
            try {
                const gameList = await getAllGames();
                console.log('Got games', gameList)
                setGames(gameList);
            }
            catch(err) {
                console.error(err)
                setGames(new Error('Failed to fetch games.'));
            }
        }
    }, [games])

    const setNewQuery = (event: any) =>  {
        setQuery(event.target.value);
    }
    
    const dbQueryUpdate = useMemo(
        () => debounce(setNewQuery, 300),
        []
    );

    useEffect(() => {
        return () => { 
            dbQueryUpdate?.cancel()
        }
    }, []);

    const addModToCollection = (file: IModFile, updatePolicy?: 'exact' | 'latest' | 'prefer') => {
        addMod({updatePolicy: updatePolicy || 'prefer', file, mod: modPage});
        handleClose();
    }

    const handleClose = () => {
        setVisible(false);
        setModPage(undefined);
        setSearchResults([]);
        setModFileOptions(undefined);
        setStage('mod');
        setQuery('')
    };

    const showBody = () => {
        switch(stage) {
            case ('mod'): return modStage();
            case ('file'): return fileStage();
            default: return <p>Error!</p>
        }
    }

    const ignoreEnterSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    const modStage = () => {
        return (
            <>
            <div>
                <Form onSubmit={ignoreEnterSubmit}>
                    <InputGroup>
                    <InputGroup.Text id="basic-addon1"><Icon path={mdiMagnify} size={1} /></InputGroup.Text>
                    <Form.Control 
                        type='input'
                        id='searchquery'
                        placeholder={'Enter the mod page title'}
                        onChange={dbQueryUpdate}
                        autoFocus
                    />
                    </InputGroup>
                    <Form.Select value={gameFilter?.id} onChange={(e) => setGameFilter((games as IStaticGameEntry[])?.find(g => g.id === parseInt(e.target.value)))} onClick={() => !games ? setGames([]) : null}>
                        <option>All Games</option>
                        {
                            (games as Error && !Array.isArray(games))
                            ? <option disabled={true}>Failed to fetch games list</option>
                            : (!games || !(games as IStaticGameEntry[]).length) 
                            ? <option disabled={true}>Loading Games...</option>
                            : (games as IStaticGameEntry[]).map(g => (<option key={g.id} value={g.id}>{g.name}</option>))
                        }
                    </Form.Select>
                </Form>
                <div style={{height: '50vh', overflowY: 'scroll', marginTop: '8px'}}>
                    { searchResults.length 
                    ? searchResults.map(modPreview)
                    : 'No results' }
                </div>
            </div>
            </>
        )
    }

    const modPreview = (mod: IModSearchResult, idx: number) => {
        return (
            <div key={mod.name+idx} onClick={() => setModPage(mod)}>
                <Row>
                    <Col style={{maxWidth: 90}}>
                    <Image src={mod.thumbnailUrl} alt={mod.name} width={80} height={60}/>
                    </Col>
                    <Col>
                    <div><b>{mod.name}</b></div>
                    <div className='game-name'>{mod.game.name}</div>
                    </Col>
                </Row>
            </div>
        )
    }

    const fileStage = () => {
        return (
            <>
            <div>
                <h3>{modPage?.name}</h3>
                <div style={{height: '50vh', overflowY: 'auto', marginTop: '8px'}}>
                    <ModFilesPicker options={modFileOptions} addMod={addModToCollection} />
                </div>
                <Button onClick={() => setModPage(undefined) }>Clear Mod</Button>
            </div>
            </>
        )
    }

    return (
        <Modal show={show} centered backdrop='static'>
            <Modal.Header>
                <h2>Add a Mod</h2>
            </Modal.Header>
            <Modal.Body>
                {showBody()}
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={handleClose}>Close</Button>
                <Button variant='primary'>Next</Button>
            </Modal.Footer>
        </Modal>
    )
}