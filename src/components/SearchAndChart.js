

import React, { useEffect, useState } from "react";
import { getList, setItem, updateLocation } from "../Services";
import LineChart from "./LineChart";
import Label from "./AxisLabel";
import ChartTitle from "./ChartTitle";

const SearchAndChart = (props) => {

	// input, search, results
	const [input, setInput] = useState("");
	const [filtered, setFiltered] = useState([]);
	const [isShowing, setIsShowing] = useState(false);
	// highlight on search
	const [active, setActive] = useState(0);
	// provide alert/messaging
	const [alert, setAlert] = useState(false);
	// incoming
	const [list, setList] = useState([]);

	// hooks
	useEffect( () => {
		let mounted = true;

		if (!list.length & !alert) {
			return;
		}

		getList() 
			.then(items => {
				if (mounted) {
					setList(items)
				}
			})

		return () => mounted = false;
	}, [alert, list])

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

		// updateLocation(input);
	};

	const onChange = (e) => {
		const { suggestions } = props;
		const input = e.currentTarget.value;
		const newFilteredSuggestions = suggestions.filter(suggestion => suggestion.toLowerCase().indexOf(input.toLowerCase()) > -1);
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

  	// test
  	const chart_data = [
  		{ label: "2014", x: 0, y: 0 },
  		{ label: "2015", x: 1, y: 400 },
  		{ label: "2016", x: 2, y: 300 },
  		{ label: "2017", x: 3, y: 100 },
  		{ label: "2018", x: 4, y: 400 },
  		{ label: "2019", x: 5, y: 500 },
  		{ label: "2020", x: 6, y: 400 }
	];

	const chart_styles = {
  		chartComponentsContainer: {
    		display: "grid", 
    		gridTemplateColumns: "max-content 700px", 
    		alignItems: "center",
    		margin: "2em auto",
    		width: "50em",
    		background: "#fff",
    		padding: "1%"
  		},
  		chartWrapper: { 
  			maxWidth: 700, 
  			alignSelf: "flex-start" 
  		}
	}

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
		<section className="wrapper">
			<h1>U.S. Populations by State</h1>
			<form onSubmit={ handleSubmit }>
				<label>
					<h3>- Select a state to chart population -</h3>
			  		<input
						type="text"
						onChange={ onChange }
						onKeyDown={ onKeyDown }
						value={ input }
						placeholder="Enter a State"
			  		/>
			  	</label>
			  	{ renderSearchResults() }
			  	<button type="submit">Submit</button>
			</form>
			{ alert && <p className="message">Success!</p> }
			<div>
				<h4 className="history-title">Your Search</h4>
				<ul className="history">
					{ list
						.sort((a, b) => (a.year > b.year) ? 1 : -1)
						.map(item => 
							<li key={ item.population }>
								{ item.name } - { item.year } : { item.population.toLocaleString("en-US") }
							</li>
					) }
				</ul>
			</div>

			<div style={ chart_styles.chartComponentsContainer }>
				<div></div>
		    	<ChartTitle text="State Population"/>
		      	<Label text="Population" rotate/>
		      	<div style={ chart_styles.chartWrapper }>
		        	<LineChart
		        		width={ 500 }
		          		height={ 300 }
		          		data={ chart_data }
		          		horizontalGuides={ 5 }
		          		precision={ 2 }
		          		verticalGuides={ 1 }
		        	/>
		      	</div>
			    <div></div>
		    	<Label text="Year"/>
		    </div>
		</section>
  	);

}

export default SearchAndChart;

