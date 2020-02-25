import React, {Component} from 'react';
import { Switch, Route} from 'react-router-dom'
import Reports from './Reports/Reports';
import MedicineForm from './Medicines/MedicineForm/MedicineForm';
import Medicines from './Medicines/Medicines';
import AdminLayout from '../../hoc/Layouts/AdminLayout/AdminLayout';
import { connect } from 'react-redux';
import OrderMedicines from './OrderMedicines/OrderMedicines';

class Dashboard extends Component{
    getNavLinkClass = (path) => {
      return this.props.location.pathname === path ? 'active' : '';
    }
    render(){
      let routes = (
        <Switch>
          <Route path="/medicines" component={Medicines} />
          <Route path="/orders/medicines" component={OrderMedicines} />
          <Route path="/" component={Reports} />
        </Switch>
      );
      if(this.props.companyType === "supplier"){
        routes = (
          <Switch>
            <Route path="/medicines/create" component={MedicineForm} />
            <Route path="/medicines/edit" component={MedicineForm} />
            <Route path="/medicines" component={Medicines} />
            <Route path="/" component={Reports} />
          </Switch>
        );
      }
        return(
                <AdminLayout>
                  {routes}
                </AdminLayout>
        );
    }
}

const mapStateToProps = state => {
  return{
    companyType: state.auth.companyType
  }
}

export default connect(mapStateToProps)(Dashboard);