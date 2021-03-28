

import React from "react";
import PropTypes from "prop-types";


const title_styles = {
	textAlign: "center", 
	marginBottom: "-1em", 
	width: "fit-content",
	margin: "1em auto -2em auto",
}

const ChartTitle = ({ text }) => (
	<h4 style={ title_styles }>{ text }</h4>
);

ChartTitle.propTypes = {
	text: PropTypes.string.isRequired
}

export default ChartTitle;

