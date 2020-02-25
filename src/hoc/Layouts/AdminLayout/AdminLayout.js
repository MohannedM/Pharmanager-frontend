import React, {Component} from 'react';
import { withRouter} from 'react-router-dom'
import AdminFooter from '../../../components/AdminFooter/AdminFooter';
import AdminSidebar from '../../../components/AdminSidebar/AdminSidebar';
import AdminNavbar from '../../../components/AdminNavbar/AdminNavbar';
import { connect } from 'react-redux';

class AdminLayout extends Component{
    getNavLinkClass = (path) => {
        return this.props.location.pathname === path ? 'active' : '';
      }
    render(){
        return(
        <div id="wrapper">
        <AdminSidebar companyType={this.props.companyType} />
    
        <div id="content-wrapper" className="d-flex flex-column">
    

            <div id="content">
    
            <AdminNavbar  username={this.props.username} isPharmacy={this.props.companyType === "pharmacy" } />
    
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
const mapStateToProps = state => {
  return{
    username: state.auth.name,
    companyType: state.auth.companyType
  }
}

export default connect(mapStateToProps)(withRouter(AdminLayout));