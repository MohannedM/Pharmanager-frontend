import React from 'react';
import Auxiliary from '../../Auxiliary/Auxiliary';
import MainNavbar from '../../../components/MainNavbar/MainNavbar';
import './MainLayout.css';
import Footer from '../../../components/Footer/Footer';

const MainLayout = props => {
    return(
        <Auxiliary>
            <MainNavbar></MainNavbar>
            <main>
                {props.children}
            </main>
            <Footer></Footer>            
        </Auxiliary>
    );
}

export default MainLayout;