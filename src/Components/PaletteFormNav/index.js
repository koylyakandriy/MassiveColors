import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import { Link, withRouter } from "react-router-dom";

import PaletteForm from "../PaletteForm";

const drawerWidth = 400;

const styles = makeStyles(theme => ({
	appBar: {
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		flexDirection: "row",
		justifyContent: "space-between",
		height: "64px",
		alignItems: "center",
	},

	toolBar: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
	},

	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	hide: {
		display: "none",
	},
	navBtn: {
		marginRight: "1rem",
	},
	button: {
		margin: "0 0.5rem",
	},
	link: {
		textDecoration: "none",
	},
}));

const PaletteFormNav = ({ savePalette, palettes, handleDrawerOpen, open }) => {
	const [colors] = useState(palettes[0].colors);
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
						<MenuIcon />
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
