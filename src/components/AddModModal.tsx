import { useState, useMemo, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Image from 'next/image';
import { Icon } from '@mdi/react'
import { mdiMagnify } from '@mdi/js';
import { IModFile, IModSearchResult } from '@/util/NexusMods/nexusapi';
import ModFilesPicker from './ModFilesPicker';

type ModalState = 'mod' | 'file';

interface IProps {
    show: boolean;
    setVisible: (status: boolean) => void;
    addMod: (mod: any) => void;
    apikey: string | undefined;
}

export default function AddModModal(props: IProps) {
    const [stage, setStage] = useState('mod');
    const { setVisible, show, apikey, addMod } = props;
    const [modPage, setModPage] = useState<IModSearchResult|undefined>(undefined);
    const [modFile, setModFile] = useState(undefined);
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState<IModSearchResult[]>([]);
    const [modFileOptions, setModFileOptions] = useState<IModFile[]|undefined>(undefined);

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

    }, [modPage])

    useMemo(async () => {
        // This should be debounced!
        if (!query) return setSearchResults([]);
        const endpoint = '/api/modSearch?';

        const options: RequestInit = {
            method: 'GET',
            headers: {}
        }
        if (!!apikey) options.headers = {apikey};

        const params: URLSearchParams = new URLSearchParams({
            term: query,
            gameId: `${0}`,
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

    }, [query, apikey]);

    const addModToCollection = (file: IModFile, updatePolicy: 'exact' | 'latest' | 'prefer') => {
        addMod({updatePolicy, file, mod: modPage});
        handleClose();
    }

    const handleClose = () => {
        setVisible(false);
        setModPage(undefined);
        setModFile(undefined);
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

    const modStage = () => {
        return (
            <>
            <div>
                <Form>
                    <InputGroup>
                    <InputGroup.Text id="basic-addon1"><Icon path={mdiMagnify} size={1} /></InputGroup.Text>
                    <Form.Control 
                        type='input'
                        id='apikey'
                        placeholder={'Enter the mod page title'}
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                    />
                    </InputGroup>
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
            <div id={mod.name+idx} onClick={() => setModPage(mod)}>
            <Image src={mod.thumbnailUrl} alt={mod.name} width={80} height={60}/>
            <b>{mod.name}</b>
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