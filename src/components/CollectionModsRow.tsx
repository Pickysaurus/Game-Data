import Image from 'next/image';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import { Icon } from '@mdi/react'
import { mdiCloseBoxOutline, mdiDragVertical } from '@mdi/js'

interface IRowProps {
    mod: IMod;
    index: number;
    removeMod: (idx: number) => void;
    updateMod: (idx: number, mod: IMod) => void;
}

interface IMod {
    mod: any;
    file: any;
    updatePolicy: string;
}

const updatePolicies: {[key: string]: { title: (v: string) => string, description: string }} = {
    prefer: {
        title: (version: string) => `${version} if available (Prefer)`,
        description: 'Use this version if available. Otherwise use the latest non-archived version.'
    },
    latest: {
        title: (version: string) => `${version} or newest (Latest)`,
        description: 'Always use the newest version of this file.'
    },
    exact: {
        title: (version: string) => `${version} only (Exact)`,
        description: 'Use this version even if it has been archived.'
    }
}

export default function CollectionModsRow(props: IRowProps) {
    const { mod, index, removeMod, updateMod } = props;

    const setUpdatePolicy = (policy: 'prefer' | 'latest' | 'exact') => {
        const newMod: IMod  = {...mod};
        newMod.updatePolicy = policy;
        updateMod(index, newMod);
    }

    const versionOptions = Object.keys(updatePolicies).map((k) => {
        const value = updatePolicies[k];
        return (
        <Dropdown.Item key={k} onClick={() => setUpdatePolicy(k as 'prefer' | 'latest' | 'exact')} title={value.description}>{value.title(mod.file.mod_version)}</Dropdown.Item>
        );
    });

    return (
        <tr key={`${mod.mod.game.domainName}-${mod.mod.modId}`}>
            <td style={{verticalAlign: 'middle'}}>
                <div style={{display: 'flex', alignContent: 'space-evenly', flexWrap: 'revert'}}>
                <Form.Check disabled={true} title={'Batch selection not implemented'} /> 
                <Icon path={mdiDragVertical} size={1} title={'Drag and drop is not currently functional'}/>
                </div>
            </td>
            <td>
                <Image src={mod.mod?.thumbnailUrl} alt={mod.mod.name} width={80} height={50} />
            </td>
            <td>
                <div>{mod.mod.name}</div>
                <div className='game-name'>{mod.mod.game.name}</div>
            </td>
            <td>
                {mod.file.name}
            </td>
            <td>
                <Dropdown data-bs-theme="dark">
                <Dropdown.Toggle variant="dark">
                    {updatePolicies[mod.updatePolicy]?.title(mod.file.mod_version) ?? null}
                </Dropdown.Toggle>
                <Dropdown.Menu variant="dark">
                    {versionOptions}
                </Dropdown.Menu>
                </Dropdown>
            </td>
            <td>
                <Button variant='danger' onClick={() => removeMod(index)}><Icon path={mdiCloseBoxOutline} size={1}/></Button>
            </td>
        </tr>
    )
}