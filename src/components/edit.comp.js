import React, {Component} from 'react'
import axios from 'axios';

export default class Edit extends Component {

    constructor(props){
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCompany = this.onChangeCompany.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name:'',
            company:'',
            age:''
        }
    }

    componentDidMount(){
        console.log('abc');
        axios.get('http://localhost:4000/persons/edit/'+this.props.match.params.id)
        .then(response =>{
            console.log(response.data);
            this.setState({
                name: response.data.Item.name,
                company: response.data.Item.company,
                age:response.data.Item.age
            })
        }).catch(err=>{
            console.log(err);
        })
    }

    onChangeAge(e){
        this.setState({
            age: e.target.value
        })
    }

    onChangeName(e){
        this.setState({
            name: e.target.value
        })
    }

    onChangeCompany(e){
        this.setState({
            company:e.target.value
        })
    }

    async onSubmit(e){
        e.preventDefault();
        const obj={
            name: this.state.name,
            company: this.state.company,
            age: this.state.age
        }

        await axios.post('http://localhost:4000/persons/update/'+this.props.match.params.id, obj).then(res=>{
            console.log(res.data);
        })
        this.props.history.push('/index');
    }

    render(){
        return(
            <div>
                <div style={{marginTop:10}}>
                    <h3>Update A Person</h3>
                    <form onSubmit= {this.onSubmit}>
                        <div className='form-group'>
                            <label>Add Person Name : </label>
                            <input type='text' className='form-control'placeholder='Name'
                                value={this.state.name} onChange={this.onChangeName}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Add Business Name : </label>
                            <input type='text' className='form-control'placeholder='Company'
                                value={this.state.company} onChange = {this.onChangeCompany}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Add GTS Number : </label>
                            <input type='text' className='form-control'placeholder='Age'
                                value={this.state.age} onChange={this.onChangeAge}
                            />
                        </div>
                        <div className='form-group'>
                            <input type='submit' value="Update" className='form-control'
                            
                            />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}