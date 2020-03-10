import React, {Component} from 'react';
import { Switch, Route} from 'react-router-dom'
import Reports from './Reports/Reports';
import MedicineForm from './Medicines/MedicineForm/MedicineForm';
import Medicines from './Medicines/Medicines';
import AdminLayout from '../../hoc/Layouts/AdminLayout/AdminLayout';
import { connect } from 'react-redux';
import OrderMedicines from './OrderMedicines/OrderMedicines';
import { getCart } from '../../store/actions';
import Cart from './Cart/Cart';
import Orders from './Orders/Orders';

class Dashboard extends Component{
  componentDidMount(){
    if(this.props.companyType === 'pharmacy'){
      this.props.onGetCart(this.props.token);
    }
  }
    getNavLinkClass = (path) => {
      return this.props.location.pathname === path ? 'active' : '';
    }
    render(){
      let routes = (
        <Switch>
          <Route path="/medicines" component={Medicines} />
          <Route path="/orders/medicines" component={OrderMedicines} />
          <Route path="/cart" component={Cart} />
          <Route path="/orders" component={Orders} />
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
    companyType: state.auth.companyType,
    token: state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onGetCart: (token) => dispatch(getCart(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);