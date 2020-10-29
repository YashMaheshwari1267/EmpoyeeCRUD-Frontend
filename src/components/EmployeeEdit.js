import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';

class EmployeeEdit extends Component {

    emptyItem = {
      id:'',  
      name: '',
      designation: '',
      isPermanent: 0,
      profilePic:'',
      resume:'',
      video:'',
      salary: 0,
      dateOfJoining: new Date()
    };
  
    constructor(props) {
      super(props);
      this.state = {
        item: this.emptyItem,
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
      if (this.props.match.params.id !== 'new') {
        const employee = await (await fetch(`http://localhost:8080/api/employee/${this.props.match.params.id}`)).json();
        this.setState({item: employee});
      }
    }
  
    handleChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
      let item = {...this.state.item};
      item[name] = value;
      this.setState({item:item});
    }
  
    async handleSubmit(event) {
      event.preventDefault();
      const {item} = this.state;
  
      await fetch('http://localhost:8080/api/employee', {
        method: (item.id) ? 'PUT' : 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item),
      });
      this.props.history.push('/');
    }
  
    render() {
      const {item} = this.state;
      const title = <h2>{item.id ? 'Edit Employee' : 'Add Employee'}</h2>;
  
      return <div>
        <Container>
          {title}
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
            <Label for="id">ID</Label>
              <Input type="id" name="id" id="id" value={item.id || ''}
                 onChange={this.handleChange} autoComplete="id"/>
            </FormGroup>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input type="text" name="name" id="name" value={item.name || ''}
                     onChange={this.handleChange} autoComplete="name"/>
            </FormGroup>
            <FormGroup>
              <Label for="designation">Designation</Label>
              <Input type="text" name="designation" id="designation" value={item.designation || ''}
                     onChange={this.handleChange} autoComplete="designation"/>
            </FormGroup>
            Is Permanent
            <FormGroup check>
              <Label for="isPermanent" check>
              <Input type="radio" name="isPermanent" value="1"
                     onChange={this.handleChange}/> Yes
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>        
              <Input type="radio" name="isPermanent" value="0"
                     onChange={this.handleChange}/> No 
               </Label>           
            </FormGroup>
            <div className="row">
              <FormGroup className="col-md-4 mb-3">
                <Label for="salary">Salary</Label>
                <Input type="text" name="salary" id="salary" value={item.salary || ''}
                       onChange={this.handleChange} autoComplete="salary"/>
              </FormGroup>
              <FormGroup className="col-md-5 mb-3">
                <Label for="dateOfJoining">Date Of Joining</Label>
                <Input type="date" name="dateOfJoining" id="dateOfJoining" value={item.dateOfJoining || ''}
                       onChange={this.handleChange} autoComplete="Date Of Joining"/>
              </FormGroup>
              <FormGroup className="col-md-5 mb-3">
                <Label for="profilePic">Profile Pic</Label>
                <Input type="url" name="profilePic" id="profilePic" value={item.profilePic || ''}
                       onChange={this.handleChange} autoComplete="profilePic"/>
              </FormGroup>
              <FormGroup className="col-md-5 mb-3">
                <Label for="resume">Resume</Label>
                <Input type="url" name="resume" id="resume" value={item.resume || ''}
                       onChange={this.handleChange} autoComplete="Resume"/>
              </FormGroup>
              <FormGroup className="col-md-5 mb-3">
                <Label for="video">Video</Label>
                <Input type="url" name="video" id="video" value={item.video || ''}
                       onChange={this.handleChange} autoComplete="Video"/>
              </FormGroup>
            </div>
            <FormGroup>
              <Button color="primary" type="submit">Save</Button>{' '}
              <Button color="secondary" tag={Link} to="/">Cancel</Button>
            </FormGroup>
          </Form>
        </Container>
      </div>
    }
  }
  
  export default withRouter(EmployeeEdit);