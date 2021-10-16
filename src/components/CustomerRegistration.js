import React, {Component} from 'react';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import {Button,Form, FormGroup, Label, Input, FormText, Container,Row,Col} from 'reactstrap';

class CustomerRegistration extends Component {
		constructor(props){
	        super(props);
	        this.state = {
				loginResponse : {messageId:'',message:'',userId:''},
				userId:'',
		        fName : '',
				mName :'',
				lName :'',
				email :'',
				age :'',
				address :'',
				contactNumber :'',

			}
			this.personalInfo = this.personalInfo.bind(this);		    
		    this.handleChangeFName = this.handleChangeFName.bind(this);
			this.handleChangeMName = this.handleChangeMName.bind(this);
			this.handleChangeLName =this.handleChangeLName.bind(this);
			this.handleChangeEmail=this.handleChangeEmail.bind(this);
			this.handleChangeage=this.handleChangeage.bind(this);
			this.handleChangeAddress=this.handleChangeAddress.bind(this);
			this.handleChangeContactNumber=this.handleChangeContactNumber.bind(this);
		}
		handleChangeFName(event)	{
			this.setState({fName: event.target.value});
		}
		handleChangeMName(event)	{
			this.setState({mName: event.target.value});
		}
		handleChangeLName(event)	{
			this.setState({lName: event.target.value});
		}
		handleChangeEmail(event)	{
			this.setState({email: event.target.value});
		}
		handleChangeage(event)	{
			this.setState({age: event.target.value});
		}
		handleChangeAddress(event)	{
			this.setState({address: event.target.value});
		}
		handleChangeContactNumber(event)	{
			this.setState({contactNumber: event.target.value});
		}
		personalInfo(){
			const cookies = new Cookies();
   
			fetch('http://localhost:8089/acccount/userRegistration',{
			   method : 'POST',
			   headers : {
				   'Accept' : 'application/json',
				   'Content-Type' : 'application/json',
			   },
			   body : JSON.stringify({
				   userId:this.getKey(),
				   fName: this.state.fName,
				   mName:this.state.mName,
				   lName:this.state.lName,
				   email:this.state.email,
				   age:this.state.age,
				   address:this.state.address,
				   contactNumber:this.state.contactNumber,
			   })
		   }).then((response) => response.json())
		   .then((responseData) => {
			   
			   this.setState({
				   loginResponse : responseData
			   });
			   console.warn('Resgister Details: '+this.state.loginResponse.messageId);
			   if(this.state.loginResponse.messageId=== 200){
				   cookies.set('key',this.state.loginResponse.userId,'/');
					  this.props.history.push('/addpayee');
			   } 
			   //return responseData;
			   })
		   .catch(error => console.warn(error));
	   }    
    getKey(){
    	const cookies = new Cookies();
    	return cookies.get('key');
    }	

	render(){
			const key = this.getKey();
			console.warn('Got Key' + key);			
	    	return (
	    		<Container className="App">
					
						<h2>Personal Deatils</h2>
						<Form className="form">
					<Col>
            <FormGroup>
			        	<Label> First Name:</Label>
				        	<Input type="text" value={this.state.fName} onChange={this.handleChangeFName} />
					
            </FormGroup>
			</Col>
			<Col>
            <FormGroup>
							<Label> Middle Name:</Label>
				        	<Input type="text" value={this.state.mName} onChange={this.handleChangeMName} /></FormGroup>
			</Col>
							<Col>
            <FormGroup><Label> Last Name:</Label>
				        	<Input type="text" value={this.state.lName} onChange={this.handleChangeLName} /></FormGroup>
			</Col>

			      <Col>
            <FormGroup> <Label> Email:</Label>
				        	<Input type="text" value={this.state.email} onChange={this.handleChangeEmail} /></FormGroup>
			</Col>
							<Col>
            <FormGroup>	<Label> Age:</Label>
				        	<Input type="text" value={this.state.age} onChange={this.handleChangeage} /></FormGroup>
			</Col>
							<Col>
            <FormGroup><Label> Address:</Label>
				        	<Input type="text" value={this.state.address} onChange={this.handleChangeAddress} /></FormGroup>
			</Col>
							<Col>
            <FormGroup><Label> Contact Number:</Label>
				        	<Input type="text" value={this.state.contactNumber} onChange={this.handleChangeContactNumber} /></FormGroup>
			</Col>

				       
				    	
			        	<Button color="primary" onClick={this.personalInfo}>Register Details</Button>			                	
			        	
					
						</Form>
                </Container>
		     	
	    	);
	    
	}
}
export default CustomerRegistration;
