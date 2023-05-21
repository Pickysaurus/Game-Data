import React from 'react'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import { signIn, signOut, useSession } from "next-auth/react"

interface ISidebarAccountProps {
    expanded: boolean;
}

const SidebarAccount = (props: ISidebarAccountProps) => {
    const { data: session, status } = useSession()

    const logIn = (e: any) => {
        e.preventDefault()
        signIn('discord', { redirect: false })
    }

    const endSession = (e: any) => {
        e.preventDefault()
        signOut({ redirect: false })
    }

    const customToggle = (
        <Image 
        roundedCircle 
        src={session?.user?.image ?? 'https://www.nexusmods.com/assets/images/default/avatar.png'} 
        style={{maxHeight: '2rem', paddingRight: '8px'}} 
        />
    )

    const loggedOut = (
        <div className='loggedOut'>
            <Button style={{display: props.expanded ? '' : 'none'}} variant='outline-secondary' className='secondary-button' onClick={logIn}>Log In</Button>
            <Button variant='primary' className='primary-button' disabled={!props.expanded}>Register</Button>
        </div>
    )

    return (
        <div id='sidebar-account' className='sidebar-list'>
            {!session && (
                loggedOut
            )}
            {session?.user && (
                <div style={{display: 'flex', columnGap: '.25rem', alignItems: 'center'}}>
                    <div>{customToggle}</div>
                    <div style={{display: props.expanded ? '' : 'none'}}>
                        <div>{session?.user?.name}</div>
                        <a className='signout' href={'/api/auth/signout'} onClick={endSession}>Sign Out</a>
                    </div>
                </div>
            )}
        </div>
    )

}

export default SidebarAccount;