import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

class Pagination extends Component{
    render(){
        const hasNext = 9 * this.props.page < this.props.totalMedicinesCount;
        const hasPrevious = this.props.page > 1;
        const nextPage = this.props.page + 1;
        const previousPage = this.props.page - 1;
        const lastPage = Math.ceil(this.props.totalMedicinesCount / 9)


        let firstPage = this.props.page !== 1 && previousPage !== 1 ? <li className="page-item" onClick={() => this.props.pageChanged(1)}><a className="page-link" href="#1">1</a></li> : null;
        let thePreviousPage = hasPrevious ? <li className="page-item" onClick={() => this.props.pageChanged(previousPage)}><a className="page-link" href={"#"+ previousPage}>{previousPage}</a></li> : null;
        let currentPage = <li className="page-item active"><a className="page-link" href={"#"+ this.props.page}>{this.props.page}</a></li>;
        let theNextPage = hasNext ?  <li className="page-item" onClick={() => this.props.pageChanged(nextPage)}><a className="page-link" href={"#"+ nextPage}>{nextPage}</a></li> : null;
        let theLastPage = lastPage !== nextPage && lastPage !== this.props.page ?  <li className="page-item" onClick={() => this.props.pageChanged(lastPage)}><a className="page-link" href={"#" + lastPage}>{lastPage}</a></li> : null; 
        return(
            <Auxiliary>
                {firstPage}
                {thePreviousPage}
                {currentPage}
                {theNextPage}
                {theLastPage}
            </Auxiliary>
        );
    }
}

export default Pagination;