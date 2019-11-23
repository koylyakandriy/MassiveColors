import React, { useState } from "react";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import Button from "@material-ui/core/Button";
import { Link, withRouter } from "react-router-dom";

import PaletteForm from "../PaletteForm";
import seedColors from "../../helpers/seedColors";
import styles from "../../styles/PaletteFormNav";

const PaletteFormNav = ({ savePalette, palettes, handleDrawerOpen, open }) => {
	const [colors] = useState(seedColors[0].colors);
	const [formShowing, setFormShowing] = useState(false);

	const classes = styles();

	const showForm = () => {
		setFormShowing(true);
	};

	const hideForm = () => {
		setFormShowing(false);
	};

	return (
		<>
			<CssBaseline />
			<AppBar
				color="default"
				position="fixed"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open,
				})}
			>
				<Toolbar className={classes.toolBar}>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						className={clsx(classes.menuButton, open && classes.hide)}
					>
						<AddToPhotosIcon />
					</IconButton>
					<Typography variant="h6" noWrap>
						Persistent drawer
					</Typography>

					<div className={classes.navBtn}>
						<Link to="/" className={classes.link}>
							<Button
								className={classes.button}
								variant="contained"
								color="secondary"
							>
								Go Back
							</Button>
						</Link>
						<Button
							className={classes.button}
							variant="contained"
							color="primary"
							onClick={showForm}
						>
							Save
						</Button>
					</div>
				</Toolbar>
			</AppBar>

			{formShowing && (
				<PaletteForm
					hideForm={hideForm}
					savePalette={savePalette}
					palettes={palettes}
					colors={colors}
				/>
			)}
		</>
	);
};

export default withRouter(PaletteFormNav);
