import React, {Component} from 'react';
import Cookies from 'universal-cookie';
import { Router } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import {Button,Form, FormGroup, Label, Input, FormText, Container,Row,Col} from 'reactstrap';

class AddBenificiary extends Component {
		constructor(props){
	        super(props);
	        this.state = {
				loginResponse : {messageId:'',message:'',userId:''},
				userId:'',
                payeeName:'',
                payeeAccountNumber:'',
                payeeLimitAmount:'',
                benificiaryLimitAmount:'',
			}
			this.addPayeeDeatails = this.addPayeeDeatails.bind(this);		    
		    this.handleChangeBName = this.handleChangeBName.bind(this);
			this.handleChangeBAccountNum = this.handleChangeBAccountNum.bind(this);
			this.handleChangeBBank =this.handleChangeBBank.bind(this);
			this.handleChangeTLimit=this.handleChangeTLimit.bind(this);
			
		}
		handleChangeBName(event)	{
			this.setState({payeeName: event.target.value});
		}
		handleChangeBAccountNum(event)	{
			this.setState({payeeAccountNumber: event.target.value});
		}
		handleChangeBBank(event)	{
			this.setState({payeeBank: event.target.value});
		}
		handleChangeTLimit(event)	{
			this.setState({benificiaryLimitAmount: event.target.value});
		}
		
		addPayeeDeatails(){
			const cookies = new Cookies();
   
			fetch('http://localhost:8083/acccount/addpayee',{
			   method : 'POST',
			   headers : {
				   'Accept' : 'application/json',
				   'Content-Type' : 'application/json',
			   },
			   body : JSON.stringify({
				   userId:this.getKey(),
				   payeeName: this.state.payeeName,
				   payeeAccountNumber:this.state.payeeAccountNumber,
				   payeeBank:this.state.payeeBank,
				   payeeLimitAmount:this.state.payeeLimitAmount,
				   
			   })
		   }).then((response) => response.json())
		   .then((responseData) => {
			   
			   this.setState({
				   loginResponse : responseData
			   });
			   console.warn('Add Beneficiary : '+this.state.loginResponse.messageId);
			   if(this.state.loginResponse.messageId=== 200){
				   cookies.set('key',this.state.loginResponse.userId,'/');
					  this.props.history.push('/transferFund');
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
			console.warn('Add Payee in render - key :' + key);			
	    	return (
                <Container className="App">
                    
                    <h2> Add Payee</h2>
                        
                    <Form className="form">
             
					<Col>
						<FormGroup>
							<Label> Payee Name:</Label>
								<Input type="text" value={this.state.payeeName} onChange={this.handleChangeBName} /></FormGroup></Col>
										<Col>
							<FormGroup><Label> Payee Account Num:</Label>
								<Input type="text" value={this.state.payeeAccountNumber} onChange={this.handleChangeBAccountNum} /></FormGroup></Col>
										<Col>
							<FormGroup><Label> Payee Bank:</Label>
								<Input type="text" value={this.state.payeeBank} onChange={this.handleChangeBBank} /></FormGroup></Col>

										<Col>
							<FormGroup> <Label> Transfer Limit:</Label>
								<Input type="text" value={this.state.payeeLimitAmount} onChange={this.handleChangeTLimit} /></FormGroup></Col>
													
												
								<Button color="primary" onClick={this.addPayeeDeatails}>Register Details</Button>                
									
										
					</Form>
				</Container>
		     	
	    	);
	    
	    
	}
}
export default AddBenificiary;
