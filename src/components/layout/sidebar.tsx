import React from 'react'
import { Icon } from '@mdi/react'
import { mdiHome, mdiGamepad, mdiSend, mdiStore, mdiStarCog, mdiEngine } from '@mdi/js'
import SidebarAccount from './sidebar-account'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface ISidebarProps {
    expanded: boolean;
}

const Sidebar = (props: ISidebarProps) => {

    const pathname = usePathname();
    const isActive = (href: string) => pathname?.startsWith(href) ? ' active' : '';
    const isExpanded = props.expanded;

    const listItem = (href: string, title: string, iconPath: string, allowActive = true) => (
        <li>
            <Link className={`sidebar-item${allowActive ? isActive(href) : ''}`}  href={href}>
                <Icon path={iconPath} size={1} />{isExpanded && title}
            </Link>
        </li>
    )


    return (
    <div aria-expanded={props.expanded}>
        <div style={{paddingBottom: '4rem'}}>
        <ul className='sidebar-list'>
            {listItem('/', 'Home', mdiHome, false)}
        </ul>
        <div className='sidebar-header' style={{display: props.expanded ? '' : 'none'}}>Games</div>
        <ul className='sidebar-list'>
            {listItem('/games', 'Browse Games', mdiGamepad)}
            {listItem('/submit', 'Submit Metadata', mdiSend)}
        </ul>
        <div className='sidebar-header' style={{display: props.expanded ? '' : 'none'}}>Admin</div>
        <ul className='sidebar-list'>
            {listItem('/admin/stores', 'Game Stores', mdiStore)}
            {listItem('/admin/publishers', 'Publishers', mdiStarCog)}
            {listItem('/admin/engines', 'Engines', mdiEngine)}
        </ul>
        </div>
        <SidebarAccount expanded={isExpanded} />
    </div>
    
    );
};

export default Sidebar;