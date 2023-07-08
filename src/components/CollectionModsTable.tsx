import Image from 'next/image';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { Icon } from '@mdi/react'
import { mdiCloseBoxOutline, mdiExport, mdiInformation, mdiViewGridPlus } from '@mdi/js'
import CollectionModsRow from './CollectionModsRow';

interface IMod {
    mod: any;
    file: any;
    updatePolicy: string;
}

interface ICollectionModsTableProps {
    mods: IMod[];
    savedKey: string;
    addModalview: boolean;
    setAddModalView: (state: boolean) => void;
    removeMod: (mod: number) => void;
    updateMod: (idx: number, mod: IMod) => void;
}

export default function CollectionModsTable (props: ICollectionModsTableProps) {
    const { mods, removeMod, updateMod, setAddModalView, savedKey, addModalview} = props;

    

    return (
        <Table variant='dark' striped>
                    <thead>
                        <tr>
                            <th style={{width: '50px'}}> </th>
                            <th style={{width: '100px'}}> </th>
                            <th>Mod Name</th>
                            <th>File Name</th>
                            <th>Version  <Icon path={mdiInformation} size={1} title={'Title!'}/></th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {mods.map((m, i) => (<CollectionModsRow mod={m} index={i} removeMod={removeMod} updateMod={updateMod} />))}
                        <tr>
                            <td colSpan={6} style={{textAlign: 'center'}}>
                                <Button variant='primary' disabled={!savedKey} onClick={() => setAddModalView(!addModalview)}>
                                    <Icon path={mdiViewGridPlus} size={1} /> Add a mod
                                </Button>
                                <Button variant='secondary' disabled={true} onClick={() => null}>
                                    <Icon path={mdiExport} size={1} /> Create Collection
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
    )
}