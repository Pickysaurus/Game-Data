import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Image from 'next/image';
import { Icon } from '@mdi/react'
import { mdiClose, mdiCloseBox, mdiCloseBoxOutline, mdiDelete, mdiViewGridPlus } from '@mdi/js'
import AddModModal from '@/components/AddModModal';

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
            console.log(result);

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
        const newMods = [newMod, ...mods];
        return setMods(newMods as any);
    }

    const removeMod = (deleteMod: IMod) => {
        console.log("Removing mod", deleteMod)
        const newMods = [...mods].filter(m => m !== deleteMod);
        return setMods(newMods);
    }

    return (
        <div>
            <div>
            <Form id='api-key-form'>
                <Form.Group className='mb-3' id='api-key-group'>
                    <Form.Control 
                        type='input'
                        id='apikey'
                        placeholder={savedKey || 'API key'}
                        value={keyInput}
                        onChange={(e) => setKeyInput(e.target.value)}
                    />
                    <Form.Text>
                        {savedKey ? <p>API key valid!</p> : keyError ? <p style={{color: 'red'}}>API key Error: {keyError}</p> : 'Enter your API key to use this feature.'}
                    </Form.Text>
                </Form.Group>
                <Button variant='primary' disabled={keyInput === '' || formDisabled} onClick={checkApiKey}>
                        Update
                </Button>
            </Form>
            </div>
            <div>
                <h1>Collection Builder</h1>
                <Table variant='dark' striped responsive>
                    <thead>
                        <tr>
                            <th style={{width: '100px'}}> </th>
                            <th>Mod Name</th>
                            <th>File Name</th>
                            <th>Version</th>
                            <th>Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mods.map(m => (
                        <tr key={`${m.mod.game.domainName}-${m.mod.modId}`}>
                            <td><Image src={m.mod.thumbnailUrl} alt={m.mod.name} width={80} height={50} /></td>
                            <td><div>{m.mod.name}</div><div>{m.mod.game.name}</div></td>
                            <td>{m.file.name}</td>
                            <td>{m.updatePolicy === 'latest' ? 'Latest' : m.file.mod_version}{m.updatePolicy === 'prefer' ? '+' : null}</td>
                            <td><Button variant='danger' onClick={() => removeMod(m)}><Icon path={mdiCloseBoxOutline} size={1}/></Button></td>
                        </tr>
                        ))}
                        <tr><td colSpan={4} style={{textAlign: 'center'}}><Button variant='primary' disabled={!savedKey} onClick={() => setAddModalView(!addModalview)}><Icon path={mdiViewGridPlus} size={1} /> Add a mod</Button></td></tr>
                    </tbody>
                </Table>
                <AddModModal apikey={savedKey} show={addModalview} setVisible={setAddModalView} addMod={addMod} />
            </div>
        </div>
    )
  }