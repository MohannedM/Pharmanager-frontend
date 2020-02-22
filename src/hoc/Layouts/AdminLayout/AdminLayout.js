import React, {Component} from 'react';
import { withRouter} from 'react-router-dom'
import AdminFooter from '../../../components/AdminFooter/AdminFooter';
import AdminSidebar from '../../../components/AdminSidebar/AdminSidebar';
import AdminNavbar from '../../../components/AdminNavbar/AdminNavbar';

class AdminLayout extends Component{
    getNavLinkClass = (path) => {
        return this.props.location.pathname === path ? 'active' : '';
      }
    render(){
        return(
        <div id="wrapper">
        <AdminSidebar />
    
        <div id="content-wrapper" className="d-flex flex-column">
    

            <div id="content">
    
            <AdminNavbar />
    
            <div className="container-fluid">
                    {this.props.children}      
            </div>
            </div>
                <AdminFooter />
            </div>
          </div>
        );
    }
}


export default withRouter(AdminLayout);