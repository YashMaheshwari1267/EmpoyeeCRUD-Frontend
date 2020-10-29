import React from 'react';
import EmployeeService from '../services/EmployeeService';
import { Button} from 'reactstrap';
import {Link, withRouter} from 'react-router-dom';
import 'C:/Users/yash/Desktop/EmployeeCRUDFrontend/employee-crud-frontend/node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css'

class EmployeeComponent extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            employees:[]
        }
    }

    componentDidMount(){
        EmployeeService.getEmployees().then((response) => {
            this.setState({
                employees: response.data
            })
        })
    }

    insertHandler = () => {
        EmployeeService.insertEmployee();
    }

    deleteHandler = (id) => {
        EmployeeService.deleteEmployee(id);
        this.props.history.push('/');
    }

    render(){
        const columns= [
            {
                Header: "ID",
                accessor: "id"
            },
            {
                Header: "Name",
                accessor: "name"
            },
            {
                Header: "Designation",
                accessor: "designation"
            },
            {
                Header: "Is Permanent",
                accessor: "isPermanent",
                filterable: false
            },
            {
                Header: "Salary",
                accessor: "salary",
                filterable: false
            },
            {
                Header: "Action",
                Cell: props =>{
                    return (
                        <Button  tag={Link} to={`/employee/view/${props.original.id}`}>View</Button>
                    )
                },
                filterable: false
            },
            {
                Header: "Action",
                Cell: props =>{
                    return (
                        <Button  tag={Link} to={`/employee/${props.original.id}`}>Edit</Button>
                    )
                },
                filterable: false
            },
            {
                Header: "Action",
                Cell: props =>{
                    return (
                        <button onClick={() => this.deleteHandler(props.original.id)}>Delete</button>
                    )
                },
                filterable: false
            },
        ]
        return (
            <div>
                <h1 className = "text-center"> Employee List </h1>
                <Button color="success" tag={Link} to="/employee/new">Add Employee</Button>
                <ReactTable 
                    data={this.state.employees} 
                    columns={columns}
                    filterable 
                    defaultPageSize={5}>
                </ReactTable>
                
            </div>
        )
    }
}

export default withRouter(EmployeeComponent);