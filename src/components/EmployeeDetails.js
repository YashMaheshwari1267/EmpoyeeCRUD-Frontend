import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Table } from 'reactstrap';
import EmployeeService from '../services/EmployeeService';
import './Employee.css';

let order = 'desc';

class EmployeeDetails extends Component {

    constructor(props){
        super(props)
        this.state = {
                id:'',
                name:'',
                designation: '',
                isPermanent: 0,
                profilePic:'',
                resume:'',
                video:'',
                salary: 0,
                dateOfJoining: new Date()
        }
    }

    componentDidMount(){
        EmployeeService.getEmployee(this.props.match.params.id).then((response) => {
            this.setState({
                id : response.data.id,
                name : response.data.name,
                designation : response.data.designation,
                isPermanent : response.data.isPermanent,
                profilePic : response.data.profilePic,
                resume : response.data.resume,
                video : response.data.video,
                salary : response.data.salary,
                dateOfJoining : response.data.dateOfJoining
            })
        })
    }

    handleBtnClick = () => {
        if (order === 'desc') {
          this.refs.table.handleSort('asc', 'name');
          order = 'asc';
        } else {
          this.refs.table.handleSort('desc', 'name');
          order = 'desc';
        }
      }
  
    render() {
      const title = <h2>Employee Details</h2>;
  
      return <div>
        <Container>
          {title}
          <Table>
          <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Designation</th>
            <th>Is Permanent</th>
            <th>Salary</th>
            <th>Profile Pic</th>
            <th>Resume</th>
            <th>Video</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>{this.state.id}</td>
            <td>{this.state.name}</td>
            <td>{this.state.designation}</td>
            <td>{this.state.isPermanent}</td>
            <td>{this.state.salary}</td>
            <td><img className="zoom" src={this.state.profilePic} alt=""/></td>
            <td><a href={this.state.resume}>Resume</a></td>
            <td><video className="zoom" width="100" height="100" controls><source src={this.state.video} type="video/webm" /></video></td>
          </tr>
          </tbody>
        </Table>
        <Button color="success" tag={Link} to="/"> Home </Button>
        </Container>
      </div>
    }
  }
  
  export default withRouter(EmployeeDetails);