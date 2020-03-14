import React, {Component} from 'react';
import MainLayout from '../../hoc/Layouts/MainLayout/MainLayout';
import BodyPart from './BodyPart/BodyPart';
import easyToUse from './images/easytouse.jpg';
import manage from './images/manage.jpg';
import knowYourPharm from './images/knowyour.jpg';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLaptopMedical} from '@fortawesome/free-solid-svg-icons';

class LandingPage extends Component{
    render(){
        return(
            <MainLayout>
                <header className="masthead text-center text-white">
                    <div className="masthead-content">
                    <div className="container">
                        <h1 className="masthead-heading mb-0"><FontAwesomeIcon icon={faLaptopMedical} /> Pharmanager</h1>
                        <h2 className="masthead-subheading mb-0">Will Make Managing Your Pharmacy a Breeze</h2>
                        <a href="#learnmore" className="btn btn-primary btn-xl rounded-pill mt-5">Learn More</a>
                    </div>
                    </div>
                    <div className="bg-circle-1 bg-circle"></div>
                    <div className="bg-circle-2 bg-circle"></div>
                    <div className="bg-circle-3 bg-circle"></div>
                    <div className="bg-circle-4 bg-circle"></div>
                </header>
                <BodyPart 
                pullLeft="order-lg-2"
                imgPath={manage}
                mainHeading="Get rid of all the nasty paper work..."
                />
                <BodyPart 
                imgPath={knowYourPharm}
                mainHeading="Know what is available in your pharmacy."
                />
                <BodyPart 
                pullLeft="order-lg-2"
                imgPath={easyToUse}
                mainHeading="User friendly!"
                />
            </MainLayout>
        );
    }
}

export default LandingPage;