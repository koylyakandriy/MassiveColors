import React from "react";
import { withStyles } from "@material-ui/styles";

const styles = {
	root: {
		position: "relative",
		display: "inline-block",
		width: "20%",
		height: "25%",
		margin: "0 auto -3.5px",
		cursor: "pointer",
	},
};

const DraggableBox = ({ color, classes, name }) => {
	return (
		<div className={classes.root} style={{ backgroundColor: color }}>
			{color}
			{' '}
			{name}
		</div>
	);
};

export default withStyles(styles)(DraggableBox);
