import { gql, request } from 'graphql-request';
import { query } from 'gql-query-builder';
export const v2API: string = 'https://api.nexusmods.com/v2/graphql';
export const v1API: string = 'https://api.nexusmods.com/v1/';
const staticGames = 'https://data.nexusmods.com/file/nexus-data/games.json';

export interface IStaticGameEntry {
    id: number;
    name: string;
    name_lower: string;
    forum_url: string;
    nexusmods_url: string;
    genre: string;
    file_count: number;
    downloads: number;
    domain_name: string;
    approved_date: number;
    mods: number;
    collections: number;
    image?: string;
}

export interface IModSearchResult {
    gameId: number;
    game: {
        name: string;
        domainName: string;
    }
    name: string;
    thumbnailUrl: string;
    modId: number;
}

export interface IModFile {
    category_id: number;
    category_name: string;
    changelog_html: string | null;
    content_preview_link: string;
    description: string;
    external_virus_scan_url: string | null;
    file_id: number;
    file_name: string;
    id: number[];
    is_primary: boolean;
    mod_version: string;
    name: string;
    size: number;
    size_in_bytes: number;
    size_kb: number;
    uid: number;
    uploaded_time: Date;
    uploaded_timestamp: number;
    version: string;
}

export async function validateAPIkey(key: string): Promise<any> {
    try {
        // console.log('Checking API key', key);
        const url = v1API+'users/validate.json';
        const req = await fetch(url, { headers: { apikey: key } });
        if (req.ok) {
            return req.json();
        }
        else { 
            throw req;
        };
    }
    catch(err) {
        throw err;
    }
}

export async function getAllGames(): Promise<IStaticGameEntry[]> {
    try {
        const req = await fetch(staticGames);
        if (req.ok) {
            const list: IStaticGameEntry[] =  await req.json();
            return list.map(g => ({ image: `https://staticdelivery.nexusmods.com/Images/games/4_3/tile_${g.id}.jpg`,   ...g}))
            .sort((a,b) => a.downloads > b.downloads ? -1 : 1);
        }
        else throw new Error('Request failed: '+req.statusText);
    }
    catch(err) {
        console.error('Could not get game list', err);
        throw err;
    }
}

export async function modSearch(term: string, apikey: string, game?: number): Promise<IModSearchResult[]> {
    const filter: any = {
        name: {
            value: term,
            op: 'WILDCARD'
        }
    };

    const header: Record<string, string> = { apikey };

    const sort = { endorsements: { direction: 'DESC' }};

    if (game && game > 0) filter.gameId = [ { value: game?.toString(), op: 'EQUALS' } ]

    const modSearchQuery = query({
        operation: 'mods',
        variables: {
            filter: {
                type: 'ModsFilter',
                name: 'filter',
                value: filter
            },
            sort: {
                type: 'ModsSort!',
                list: true,
                name: 'sort',
                value: sort
            },
            first: 10
        },
        fields: [
            {
                nodes: [
                   'gameId',
                   {
                    game: [ 'name', 'domainName' ]
                   },
                   'name',
                   'thumbnailUrl',
                   'modId'
                ]
            },

        ]
    }, null, { operationName: 'ModSearch' });

    try {
        const newVars = { filter, sort, first: 10 }
        const search = await request(v2API, modSearchQuery.query, newVars, header);
        return (search as any)?.mods?.nodes ?? [];
    }
    catch(err) {
        throw err;
    }
}

export async function modFileLookup(gameDomain: string, modId: number, key: string): Promise<IModFile[]> {
    try {
        // console.log('Checking API key', key);
        const url = v1API+`games/${gameDomain}/mods/${modId}/files.json`;
        const req = await fetch(url, { headers: { apikey: key } });
        if (req.ok) {
            return (await req.json()).files;
        }
        else { 
            throw req;
        };
    }
    catch(err) {
        throw err;
    }
    return []
}

