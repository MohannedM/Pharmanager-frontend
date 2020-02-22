import React, {Component} from 'react';
import { Switch, Route} from 'react-router-dom'
import Reports from './Reports/Reports';
import AddMedicine from './Medicines/AddMedicine/AddMedicine';
import Medicines from './Medicines/Medicines';
import AdminLayout from '../../hoc/Layouts/AdminLayout/AdminLayout';

class Dashboard extends Component{
    getNavLinkClass = (path) => {
      return this.props.location.pathname === path ? 'active' : '';
    }
    render(){
        return(
                <AdminLayout>
                    <Switch>
                      <Route path="/medicines/create" component={AddMedicine} />
                      <Route path="/medicines" component={Medicines} />
                      <Route path="/" component={Reports} />
                    </Switch>
                </AdminLayout>

        
          
        )
    }
}

export default Dashboard;