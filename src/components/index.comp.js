import React, {Component} from 'react'
import Axios from 'axios';
import TableRow from './TableRow';

export default class Index extends Component {

    constructor(props){
        super(props);
        this.state = {persons: []};
    }
    componentDidMount(){
        Axios.get('http://localhost:4000/persons').then(response =>{
            console.log(response.data);
            this.setState({persons: response.data.data});
        }).catch(err=>{
            console.log(err);
        });
    }

    tabRow(){
        return this.state.persons.map(function(object,i){
            return <TableRow obj={object} key={i}/>;
        });
    }

    render(){
        return(
            <div>
                <h3 align= 'center'>Persons List</h3>
                <table className='table table-striped'style={{marginTop: 20}}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Company</th>
                            <th>Age</th>
                            <th colSpan='2'>Action</th>
                        </tr>
                    </thead>
                    <tbody>{this.tabRow()}</tbody>
                </table>
            </div>
        )
    }
}