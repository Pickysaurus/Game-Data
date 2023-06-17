import { IModFile } from "@/util/NexusMods/nexusapi";
import Icon from "@mdi/react";
import { mdiPlus } from '@mdi/js';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';

interface IProps {
    options: IModFile[] | undefined;
    addMod: (mod: IModFile, updatePolicy: 'exact' | 'latest' | 'prefer') => void;
}

const fileCategories: Record<string, IFileCategory> = {
    'UPDATE' : 'Updates',
    'MAIN' : 'Main',
    'OLD_VERSION': 'Old Versions',
    'MISCELLANEOUS': 'Miscellaneous',
    'OPTIONAL': 'Optional',
    'ARCHIVED' : 'Archived',

}

interface IModFilesSorted {
    Updates?: IModFile[];
    Main?: IModFile[];
    'Old Versions'?: IModFile[];
    Miscellaneous?: IModFile[];
    Optional?: IModFile[];
    Archived?: IModFile[];
}

type IFileCategory = 'Updates' | 'Main' | 'Old Versions' | 'Miscellaneous' | 'Optional' | 'Archived';

export default function ModFilesPicker(props: IProps) {
    const { options, addMod } = props;
    if (!options) return <p>Loading...</p>
    if (!options.length) return <p>No Files.</p>;
    
    const sorted: IModFilesSorted = options.sort((a,b) => a.file_id > b.file_id ? -1 : 1).reduce((prev: IModFilesSorted, cur: IModFile) => {
        if (cur.category_name === null) return prev;
        const catName: IFileCategory = fileCategories[cur.category_name];
        if (!catName) {
            console.error('No category name matching', cur.category_name);
        }
        if (!prev[catName]) prev[catName] = [];
        prev[catName]?.push(cur);
        return prev;
    }, {});

    const addButton = (file: IModFile) => {
        return (
        <Dropdown data-bs-theme="dark">
            <Dropdown.Toggle variant="dark">
                <Icon path={mdiPlus} size={1} />
            </Dropdown.Toggle>
            <Dropdown.Menu variant="dark">
                <Dropdown.Item onClick={() => addMod(file, 'prefer')} title="Use this version if available. Otherwise use the latest non-archived version.">Default</Dropdown.Item>
                <Dropdown.Item onClick={() => addMod(file, 'latest')} title="Always use the newest version of this file.">Latest version</Dropdown.Item>
                <Dropdown.Item onClick={() => addMod(file, 'exact')} title="Use this version even if it has been archived.">Exact version</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
        )
    }

    const sections = Object.values(fileCategories).map(name => {
        const files = sorted[name];
        if (!files) return null;
        return (
            <div key={name}>
            <h4>{name}</h4>
            <Table variant="dark" striped>
                <thead>
                    <tr>
                        <th>File Name</th>
                        <th>Version</th>
                        <th>Add</th>
                    </tr>
                </thead>
                <tbody>
                    {files.map(f => <tr><td>{f.name}</td><td>{f.mod_version}</td><td>{addButton(f)}</td></tr>)}
                </tbody>
            </Table>
            </div>
        )
    });

    return <>{sections}</>;
    

}