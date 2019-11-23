import React, { useState } from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import DraggableBoxList from "../../Components/DraggableBoxList";
import { arrayMove } from "react-sortable-hoc";

import PaletteFormNav from "../../Components/PaletteFormNav";
import ColorPickerForm from "../../Components/ColorPickerForm";
import seedColors from "../../helpers/seedColors";
import styles from "../../styles/PaletteForm";


const PaletteForm = ({ savePalette, palettes }) => {
	const classes = styles();
	const [colors, setColors] = useState(seedColors[0].colors);
	const [open, setOpen] = useState(true);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
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
				<div className={classes.container}>
					<Typography variant="h4" gutterBottom>
						Design Your Palette
					</Typography>
					<div className={classes.buttons}>
						<Button
							className={classes.button}
							variant="contained"
							color="secondary"
							onClick={clearPalette}
						>
							Clear Palette
						</Button>
						<Button
							className={classes.button}
							variant="contained"
							color="primary"
							onClick={addRandomColor}
							disabled={paletteIsFull}
						>
							Random Color
						</Button>
					</div>
					<ColorPickerForm
						palettes={palettes}
						colors={colors}
						setColors={setColors}
						paletteIsFull={paletteIsFull}
					/>
				</div>
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
