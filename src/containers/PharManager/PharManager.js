import React, {Component} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LandingPage from '../LandingPage/LandingPage';
import asyncComponent from '../../hoc/asyncComponent/asyncComponent';
import { connect } from 'react-redux';
import Logout from '../Auth/Logout/Logout';
import { authInit } from '../../store/actions';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import NotFound from '../NotFound/NotFound';

const Auth = asyncComponent(()=>{
  return import('../Auth/Auth');
});
const Dashboard = asyncComponent(()=>{
  return import('../Dashboard/Dashboard');
});

class PharManager extends Component{
  componentDidMount(){
    this.props.onInitAuth();
  }
  render(){
    let routes = (
        <Switch>
          <Route path="/login" component={Auth} />
          <Route path="/signup" component={Auth} />
          <Route path="/" exact component={LandingPage} />
          <Route path="/" component={NotFound} />
        </Switch>
    );
    if(this.props.isAuth){
      routes = (
        <Auxiliary>
          <Switch>
            <Route path="/logout" component={Logout} />
            <Route path="/" component={Dashboard} />
          </Switch>
          <Redirect to="/" />
        </Auxiliary>
    );
    }
    // if(this.props.isAuth && this.props.isSupplier){
    //   routes = (
    //     <Auxiliary>
    //       <Switch>
    //         <Route path="/medicines/create" component={AddMedicine} />
    //         <Route path="/dashboard" component={Dashboard} />
    //         <Route path="/logout" component={Logout} />
    //         <Route path="/" component={LandingPage} />
    //       </Switch>
    //       <Redirect to="/dashboard" />
    //     </Auxiliary>
    // );
    // }
    return (
      <div className="App">
        {routes}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return{
    isAuth: state.auth.token !== null,
    isSupplier: state.auth.companyType === 'supplier'
  }
}
const mapDispatchToProps = dispatch => {
  return{
    onInitAuth: () => dispatch(authInit())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PharManager);
