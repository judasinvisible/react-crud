import React ,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'

class TableRow extends Component {
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }
    delete() {
        axios.get('http://localhost:4000/persons/delete/'+this.props.obj.id)
            .then(console.log('Deleted'))
            .catch(err => console.log(err))
    
    }


    render(){
        return (
            <tr>
                <td>{this.props.obj.name}</td>
                <td>{this.props.obj.company}</td>
                <td>{this.props.obj.age}</td>
                <td><Link to={"/edit/"+this.props.obj.id} className='btn btn-warning'>Edit</Link></td>
                <td><Link to={'/delete/'+this.props.obj.id} className='btn btn-danger' onClick={this.delete}>Delete</Link></td>
            </tr>
        );
    }
    
}

export default TableRow
