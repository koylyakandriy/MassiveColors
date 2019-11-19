import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { ChromePicker } from "react-color";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withRouter } from "react-router-dom";
import DraggableBoxList from "../../Components/DraggableBoxList";
import { arrayMove } from "react-sortable-hoc";
import PaletteFormNav from "../../Components/PaletteFormNav";

const drawerWidth = 400;

const styles = makeStyles(theme => ({
	root: {
		display: "flex",
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerHeader: {
		display: "flex",
		alignItems: "center",
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
		justifyContent: "flex-end",
	},
	content: {
		flexGrow: 1,
		height: "calc(100vh - 64px)",
		padding: theme.spacing(3),
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: -drawerWidth,
	},
	contentShift: {
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},
}));

const PaletteForm = ({ savePalette, palettes }) => {
	const classes = styles();
	const [open, setOpen] = useState(true);
	const [currentColor, setCurrentColor] = useState("teal");
	const [colors, setColors] = useState(palettes[0].colors);
	const [colorName, setColorName] = useState("");

	useEffect(() => {
		ValidatorForm.addValidationRule("isColorNameUnique", value => {
			colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase());
		});
	});

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const updateCurrentColor = newColor => {
		setCurrentColor(newColor.hex);
	};

	const addNewColor = () => {
		const newColor = { color: currentColor, name: colorName };
		setColors([...colors, newColor]);
		setColorName("");
	};

	const handleNameChange = ({ target }) => {
		setColorName(target.value);
	};

	const removeColor = colorName => {
		setColors(colors.filter(color => color.name !== colorName));
	};

	const onSortEnd = ({ oldIndex, newIndex }) => {
		setColors(colors => arrayMove(colors, oldIndex, newIndex));
	};

	const clearPalette = () => {
		setColors([]);
	};

	const addRandomColor = () => {
		const allColors = palettes.map(palette => palette.colors).flat();
		let rand = Math.floor(Math.random() * allColors.length);
		const randomColor = allColors[rand];
		setColors([...colors, randomColor]);
	};

	const maxColors = 20;
	const paletteIsFull = colors.length >= maxColors;

	return (
		<div className={classes.root}>
			<PaletteFormNav
				savePalette={savePalette}
				palettes={palettes}
				open={open}
				handleDrawerOpen={handleDrawerOpen}
			/>
			<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="left"
				open={open}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawerClose}>
						<ChevronLeftIcon />
					</IconButton>
				</div>
				<Divider />
				<Typography variant="h4">Design Your Palette</Typography>
				<div>
					<Button variant="contained" color="secondary" onClick={clearPalette}>
						Clear Palette
					</Button>
					<Button
						variant="contained"
						color="primary"
						onClick={addRandomColor}
						disabled={colors.length >= maxColors}
					>
						Random Color
					</Button>
				</div>
				<ChromePicker
					color={currentColor}
					onChangeComplete={updateCurrentColor}
				/>
				<ValidatorForm onSubmit={addNewColor}>
					<TextValidator
						value={colorName}
						onChange={handleNameChange}
						validators={["required"]}
						errorMessages={["this field is required"]}
					/>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						style={{ background: paletteIsFull ? "grey" : currentColor }}
						disabled={paletteIsFull}
					>
						{paletteIsFull ? "Palette is Full" : "Add Color"}
					</Button>
				</ValidatorForm>
			</Drawer>
			<main
				className={clsx(classes.content, {
					[classes.contentShift]: open,
				})}
			>
				<div className={classes.drawerHeader} />
				<DraggableBoxList
					colors={colors}
					removeColor={removeColor}
					axis="xy"
					onSortEnd={onSortEnd}
				/>
			</main>
		</div>
	);
};

export default withRouter(PaletteForm);
