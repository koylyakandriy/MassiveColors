import React from "react";
import { withStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { SortableElement } from "react-sortable-hoc";

const styles = {
	root: {
		position: "relative",
		display: "inline-block",
		width: "20%",
		height: "25%",
		margin: "0 auto -3.5px",
		cursor: "pointer",
		"&:hover svg": {
			color: "#fff",
			transform: "scale(1.4)",
		},
	},
	boxContent: {
		fontSize: "12px",
		position: "absolute",
		bottom: "0",
		left: "0",
		width: "100%",
		padding: "10px",
		letterSpacing: "1px",
		textTransform: "uppercase",
		display: "flex",
		justifyContent: "space-between",
		color: "rgba(0, 0, 0, 0.5)",
	},
	deleteIcon: {
		transition: "all .3s ease",
	},
};

const DraggableBox = SortableElement(props => {
	const { color, classes, name, handleClick } = props;
	return (
		<div className={classes.root} style={{ backgroundColor: color }}>
			<div className={classes.boxContent}>
				<span>{name}</span>
				<DeleteIcon className={classes.deleteIcon} onClick={handleClick} />
			</div>
		</div>
	);
});

export default withStyles(styles)(DraggableBox);
