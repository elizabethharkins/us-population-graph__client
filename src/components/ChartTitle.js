

import React from "react"
import PropTypes from "prop-types";

const ChartTitle = ({ text }) => (
	<h4 style={ {textAlign: "center", marginBottom: "-1em"} }>{ text }</h4>
);

ChartTitle.propTypes = {
	text: PropTypes.string.isRequired
}

export default ChartTitle;