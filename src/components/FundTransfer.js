import React, {Component} from 'react';
import Cookies from 'universal-cookie';

class FundTransfer extends Component {
		constructor(props){
	        super(props);
	        this.getKey=this.getKey.bind(this);
    	}

    getKey(){
    	const cookies = new Cookies();
    	return cookies.get('key');
    }	

	render(){
			const key = this.getKey();
			console.warn('Got Key' + key);			
	    	return (
	    		<div>
	    		<h2>Transfer Fund {key}</h2>
	    		</div>
	    	);
	    
	}
}
export default FundTransfer;
