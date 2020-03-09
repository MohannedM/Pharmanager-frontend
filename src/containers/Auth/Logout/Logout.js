import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { authLogout, auth } from '../../../store/actions';

class Logout extends Component{
    componentDidMount(){
        this.props.onAuthLogout(this.props.token);
    }

    render(){
        return <Redirect to="/" />
    }
}
const mapStateToProps = state => {
    return{
        token: state.auth.token
    }
}
const mapDispatchToProps = dispatch => {
    return{
        onAuthLogout: (token)=>dispatch(authLogout(token))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Logout);