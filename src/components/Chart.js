

import React from "react";
import LineChart from "./LineChart";
import Label from "./AxisLabel";
import ChartTitle from "./ChartTitle";


const Chart = ({ list }) => {

	const add_X_Values = (arr) => {
	  	return arr.map( (obj, index) => {
	    	return Object.assign({}, obj, { x: index });
	  	});
	};

	const chartDataInput = 
		list
			.sort((a, b) => (a.year > b.year) ? 1 : -1)
			.map(item => { return { label: item.year.toString(), y: item.population } });
	
	const chart_data = add_X_Values(chartDataInput);

	const chart_styles = {
  		chartComponentsContainer: {
    		display: "grid", 
    		gridTemplateColumns: "max-content 700px", 
    		alignItems: "center",
    		margin: "4em auto",
    		width: "50em",
    		background: "#fff",
    		padding: "1%",
    		borderRadius: "var(--standard-radius)",
    		boxShadow: "var(--box-shadow-sharp)"
  		},
  		chartWrapper: { 
  			maxWidth: 700, 
  			alignSelf: "flex-start" 
  		}
	}

	return (

		<div style={ chart_styles.chartComponentsContainer }>
			<div></div>
	    	<ChartTitle text="State Population"/>
	      	<Label text="Population" rotate/>
	      	<div style={ chart_styles.chartWrapper }>
	        	<LineChart
	        		width={ 500 }
	          		height={ 300 }
	          		data={ chart_data }
	          		horizontalGuides={ 6 }
	          		precision={ 0 }
	          		verticalGuides={ 1 }
	        	/>
	      	</div>
		    <div></div>
	    	<Label text="Year"/>
	    </div>

	);

};


export default Chart;

