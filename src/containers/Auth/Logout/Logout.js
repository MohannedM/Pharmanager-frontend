import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { authLogout } from '../../../store/actions';

class Logout extends Component{
    componentDidMount(){
        this.props.onAuthLogout();
    }

    render(){
        return <Redirect to="/" />
    }
}
const mapDispatchToProps = dispatch => {
    return{
        onAuthLogout: ()=>dispatch(authLogout())
    }
}
export default connect(null, mapDispatchToProps)(Logout);