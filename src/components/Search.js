

import React, { useState, useEffect } from "react";
import { updateLocation } from "../Services";


const Search = (props) => {

	// input, search, results
	let [input, setInput] = useState("");
	const [filtered, setFiltered] = useState([]);
	const [isShowing, setIsShowing] = useState(false);
	// highlight on search
	const [active, setActive] = useState(0);
	// provide alert/messaging
	const [alert, setAlert] = useState(false);  	

	useEffect( () => {
		if (alert) {
			setTimeout( () => {
				setAlert(false);
			}, 1000)
		}
	}, [alert])

	// handlers
	const handleSubmit = (e) => {
		e.preventDefault();

		updateLocation(input)
			.then( () => {
				setInput('');
				setAlert(true);
			})
	};

	const onChange = (e) => {
		const { suggestions } = props;
		const input = e.currentTarget.value;
		const newFilteredSuggestions = suggestions
			.filter(suggestion => suggestion.toLowerCase()
			.indexOf(input.toLowerCase()) > -1);
		setActive(0);
		setFiltered(newFilteredSuggestions);
		setIsShowing(true);
		setInput(e.currentTarget.value)
  	};

  	const onClick = (e) => {
		setActive(0);
		setFiltered([]);
		setIsShowing(false);
		setInput(e.currentTarget.innerText)
  	};

  	const onKeyDown = (e) => {
	    if (e.keyCode === 13) { 
	      	setActive(0);
	      	setIsShowing(false);
	      	setInput(filtered[active])
	    }
	    else if (e.keyCode === 38) { 
	      	return (active === 0) ? null : setActive(active - 1);
	    }
	    else if (e.keyCode === 40) { 
	      	return (active - 1 === filtered.length) ? null : setActive(active + 1);
	    }
	};

  	// 13 enter; 38 up; 40 down
  	/*
  	const onKeyDown = (e) => {
  		switch (e.keyCode) {
			case 13:
		    	setActive(0);
	  			setIsShowing(false);
	  			setInput(filtered[active])
		    	break;
		  	case 38:
		    	return (active === 0) ? null : setActive(active - 1);
		    	break;
		  	case 40:
		    	return (active - 1 === filtered.length) ? null : setActive(active + 1);
		    	break;
		    default:
		    	console.log("default");
		    	break;
		}
  	}
  	*/

  	// render search
	const renderSearchResults = () => {
		if (isShowing && input) {
	  		if (filtered.length) {
				return (
					<ul className="autocomplete">
						{ filtered.map((suggestion, index) => {
							
							let className;

							if (index === active) {
								className = "active";
							}
							return (
								<li className={ className } key={ index } onClick={ onClick }>
									{ suggestion }
								</li>
							);

						}) }
					</ul>
				);
			} else {
				return (
				  	<section className="no-autocomplete">
						<p className="fineprint">No results. Check your spelling and search again!</p>
				  	</section>
				);
			}
		}
		
		return <div></div>;
		
	}  

	// form
	return (
		<form onSubmit={ handleSubmit }>
			<label>
				<h3>Select a state to chart population</h3>
		  		<input
					type="text"
					onChange={ onChange }
					onKeyDown={ onKeyDown }
					value={ input }
					placeholder="Enter a State"
		  		/>
		  	</label>
		  	{ renderSearchResults() }
		  	<button type="submit">
        		{ !alert && "Submit" }
        		{ alert && "Loading" }
      		</button>
      		{ alert && <p className="message">Success!</p> }
		</form>
  	);

}

export default Search;

