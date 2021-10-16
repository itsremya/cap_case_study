import React, {Component} from 'react';
import { Router } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import {Table,Button,Label,Input,Form,FormGroup,Col,Container,Row} from 'reactstrap';

class Login extends Component {
		constructor(props){
	        super(props);
		    this.state = {
		        loginResponse : {messageId:'',message:'',userId:''},
		        name : '',
		        password :'',
		    }
		    this.login = this.login.bind(this);		    
		    this.handleChangeName = this.handleChangeName.bind(this);
		    this.handleChangePassword = this.handleChangePassword.bind(this);
    	}
	
    handleChangeName(event)	{
    	this.setState({name: event.target.value});
    }
    handleChangePassword(event)	{
    	this.setState({password: event.target.value});
    }

	login(){
		 const cookies = new Cookies();

         fetch('http://localhost:8089/acccount/login',{
            method : 'POST',
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({
                name: this.state.name,
                password: this.state.password,
            })
        }).then((response) => response.json())
        .then((responseData) => {
		    
		    this.setState({
		    	loginResponse : responseData
		    });
		    console.warn(this.state.loginResponse.messageId);
		    if(this.state.loginResponse.messageId=== 200){
		    	cookies.set('key',this.state.loginResponse.userId,'/');
	       		this.props.history.push('/registerCustomer');
	    	} 
		    //return responseData;
   		 })
        .catch(error => console.warn(error));
    }    


	render(){
	    	const userKey = this.state.loginResponse.userId;
	    	console.warn(userKey);
			return(
				<Container className="App">
					
					<h2>Sign In</h2>
						
					<Form className="form">
					<Row>
						<Label>Name:  </Label>
					<Col xs="auto" sm="4">
        
			        	
				        	<Input type="text" value={this.state.name} onChange={this.handleChangeName} />

			        
					</Col>
					</Row>
				<Row>	<Label>Password:  </Label>
					<Col xs="auto" sm="4">
				        	
				        	<Input type="password"  value={this.state.password} onChange={this.handleChangePassword} />
				    	
			        	
						
             
			</Col>  
			</Row>  	
			<Button color="primary" size="sm" className="mr-2" onClick={this.login}>Register</Button>	
						<Button color="Danger" size="sm" >Cancel</Button>
			        	</Form>

		     	</Container>
		    );
			
	    
	}
}
export default Login;
