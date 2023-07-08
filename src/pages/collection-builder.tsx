import { FormEvent, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AddModModal from '@/components/AddModModal';
import CollectionModsTable from '@/components/CollectionModsTable';

interface IMod {
    mod: any;
    file: any;
    updatePolicy: string;
}

export default function CollectionBuilder() {

    const [keyInput, setKeyInput] = useState('');
    const [keyError, setKeyError]= useState('');
    const [formDisabled, setFormDisabled] = useState(false);
    const [savedKey, setSavedKey] = useState('');
    const [mods, setMods] = useState<IMod[]>([]);
    const [addModalview, setAddModalView] = useState(false);

    const checkApiKey = async (event: any) => {
        setFormDisabled(true);
        setKeyError('');
    
        const endpoint = '/api/validate';

        const options = {
            method: 'POST',
            headers: {
                apiKey: keyInput,
            }
        }

        try {
            const response = await fetch(endpoint, options);
            if (!response.ok) {
                console.error('Validation failed!', response.statusText);
                setKeyError(response.statusText);
                return setFormDisabled(false);
            }
            const result = await response.json();
            // console.log(result);

            setSavedKey(result.key);
            setKeyInput('');

            setFormDisabled(false);
        }
        catch(err) {
            console.error('Validate failed', err);
            setKeyError(`${err}`);
            setFormDisabled(false);
        }
    }

    const addMod = (newMod: IMod) => {
        const newMods = [...mods, newMod];
        return setMods(newMods as any);
    }

    const updateMod = (idx: number, newMod: IMod) => {
        if (idx === -1) return console.error('Invalid index', idx, newMod);
        const newMods = [...mods];
        newMods[idx] = newMod;
        return setMods(newMods);
    }

    const removeMod = (idx: number) => {
        const newMods = [...mods];
        const removed = newMods.splice(idx, 1);
        console.log("Removing mod", removed, idx);
        return setMods(newMods);
    }

    const ignoreEnterSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }


    return (
        <div>
            <div>
            <Form id='api-key-form' onSubmit={ignoreEnterSubmit}>
                <Form.Group className='mb-3' id='api-key-group'>
                    <Form.Control 
                        type='input'
                        id='apikey'
                        placeholder={savedKey || 'API key'}
                        value={keyInput}
                        onChange={(e) => setKeyInput(e.target.value)}
                    />
                    <Form.Text>
                        {savedKey ? <p>API key valid!</p> : keyError ? <p style={{color: 'red'}}>API key Error: {keyError}</p> : <p>Enter your <a href='https://www.nexusmods.com/users/myaccount?tab=api#personal_key' target='_blank'>API key</a> to use this feature.</p>}
                    </Form.Text>
                </Form.Group>
                <Button variant='primary' disabled={keyInput === '' || formDisabled} onClick={checkApiKey}>
                        Update
                </Button>
            </Form>
            </div>
            <div>
                <h1>Collection Builder</h1>
                <CollectionModsTable
                    mods={mods}
                    savedKey={savedKey}
                    removeMod={removeMod}
                    setAddModalView={setAddModalView}
                    addModalview={addModalview}
                    updateMod={updateMod}
                />
                <AddModModal apikey={savedKey} show={addModalview} setVisible={setAddModalView} addMod={addMod} />
            </div>
        </div>
    )
  }