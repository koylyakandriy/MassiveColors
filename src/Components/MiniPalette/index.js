import React from "react";
import { withStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";

import styles from "../../styles/MiniPalette";

const MiniPalette = ({
	classes,
	paletteName,
	emoji,
	colors,
	handleClick,
	openDialog,
	id,
}) => {
	const deletePalette = e => {
		e.stopPropagation();
		openDialog(id);
	};

	return (
		<div className={classes.root} onClick={handleClick}>
			<div className={classes.delete}>
				<DeleteIcon onClick={deletePalette} className={classes.deleteIcon} />
			</div>
			<div className={classes.colors}>
				{Array.from(colors, color => (
					<div
						className={classes.miniColor}
						key={color.name}
						style={{ backgroundColor: color.color }}
					/>
				))}
			</div>
			<h5 className={classes.title}>
				{paletteName}
				<span className={classes.emoji}>{emoji}</span>
			</h5>
		</div>
	);
};

export default withStyles(styles)(MiniPalette);
