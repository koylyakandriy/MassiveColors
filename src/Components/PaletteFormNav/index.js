import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Link, withRouter } from "react-router-dom";

const drawerWidth = 400;

const styles = makeStyles(theme => ({
	appBar: {
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
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
}));

const PaletteFormNav = ({
	savePalette,
	palettes,
	history,
	handleDrawerOpen,
	open,
}) => {
	const classes = styles();
	const [colors, setColors] = useState(palettes[0].colors);
	const [newInputPaletteName, setNewInputPaletteName] = useState("");

	const handleSavePalette = () => {
		let newName = newInputPaletteName;
		const newPaletteName = {
			paletteName: newName,
			colors,
			id: newName.toLowerCase().replace(/ /g, "-"),
		};
		savePalette(newPaletteName);
		history.push("/");
	};

	const handleInputChange = ({ target }) => {
		setNewInputPaletteName(target.value);
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
				<Toolbar>
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
					<ValidatorForm onSubmit={() => handleSavePalette()}>
						<TextValidator
							label="Palette Name"
							value={newInputPaletteName}
							onChange={handleInputChange}
							validators={["required"]}
							errorMessages={["this field is required"]}
						/>
						<Button type="submit" variant="contained" color="primary">
							Save Palette
						</Button>
						<Link to="/">
							<Button variant="contained" color="secondary">
								Go Back
							</Button>
						</Link>
						{/*<Button variant="contained" color="secondary">
							Delete Palette
						</Button>*/}
					</ValidatorForm>
				</Toolbar>
			</AppBar>
		</>
	);
};

export default withRouter(PaletteFormNav);
