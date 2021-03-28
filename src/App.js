

import React, { useEffect, useState } from "react";
import { getList } from "./Services";
import "./App.css";
import Header from "./components/Header";
import Search from "./components/Search";
import stateDictionary from "./data/States";
import defaultState from "./data/DefaultState";
import Chart from "./components/Chart";


const App = () => {

	let [list, setList] = useState([]);
	const [loading, setLoading] = useState(true);
  	const [errorMessage, setErrorMessage] = useState(null);

	useEffect( () => {
		let mounted = true;
		setLoading(true);
		setErrorMessage(null);

		if (!list.length) {
			return;
		}

		getList() 
			.then(items => {
				if (mounted) {
					setList(items)
					setLoading(false);
					setErrorMessage(null);
				}
			})

		setLoading(false);
		setErrorMessage("No results.");

		return () => mounted = false;
	}, [list])

	list = list.length ? list : defaultState;

	return (

		<section className="wrapper">
			<Header text="U.S. Populations by State" />
			<Search suggestions={ stateDictionary } />
			<div>
				<h4 className="results-title">Results for { list[0].name }</h4>
				<ul className="results">
			        { 
			        	loading && !errorMessage 
			        	? (<span>loading...</span>) 
			        	: errorMessage 
			        	? (<div className="errorMessage">{ errorMessage }</div>) 
			        	: (list
							.sort((a, b) => (a.year > b.year) ? 1 : -1)
							.map(item => 
								<li key={ item.population }>
									{ item.year } : { item.population.toLocaleString("en-US") }
								</li>
							)
			        	)
			    	}
			    </ul>
				{ /*<ul className="results">
					{ 						
						list
							.sort((a, b) => (a.year > b.year) ? 1 : -1)
							.map(item => 
								<li key={ item.population }>
									{ item.year } : { item.population.toLocaleString("en-US") }
								</li>
							)
					}
				</ul> */}
			</div>
			<Chart list={ list }/>
		</section>

	);

}


export default App;


