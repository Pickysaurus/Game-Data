import React, { ReactNode, PropsWithChildren } from 'react'
import Header from '../header';
import Footer from '../footer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from './sidebar';

export function LayoutOld({children}: { children: ReactNode }) {
    return (
        <>
            <Header onMenuButtonClick={() => null} />
            <Container fluid id='content'>
            <main>
                {children}
            </main>
            </Container>
            <Footer />
        </>

    )
}

export default function Layout(props: PropsWithChildren) {
    const { children } = props;
    const [showSidebar, setShowSidebar] = React.useState(true);

    const toggleSideBar = () => setShowSidebar(!showSidebar);

    return (
        <>
        <Header onMenuButtonClick={toggleSideBar} />
        <Container fluid>
            <Row className='g-2'>
            <Col id='sidebar' xs='2' lg={showSidebar ? '3' : '1'} md={showSidebar ? '3' : '1'} xl={showSidebar ? '2' : '1'}>
                <Sidebar expanded={showSidebar} />
            </Col>
            <Col>
                <main>
                {children}
                </main>
            </Col>
            </Row>
        </Container>
        <Footer />
        </>
    )
}