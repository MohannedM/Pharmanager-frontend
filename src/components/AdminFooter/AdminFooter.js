import React, {Component} from 'react';


class AdminFooter extends Component{
    render(){
        return(
            <footer className="sticky-footer bg-white">
            <div className="container my-auto">
              <div className="copyright text-center my-auto">
                <span>Copyright &copy; Pharmanger 2019</span>
              </div>
            </div>
          </footer>
        )
    }
}

export default AdminFooter;