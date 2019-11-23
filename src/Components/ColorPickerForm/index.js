import React, { useEffect, useState } from "react";
import { ChromePicker } from "react-color";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

import styles from "../../styles/ColorPickerForm";

const ColorPickerForm = ({ classes, colors, setColors, paletteIsFull }) => {
	const [currentColor, setCurrentColor] = useState("teal");
	const [colorName, setColorName] = useState("");

	useEffect(() => {
		ValidatorForm.addValidationRule("isColorNameUnique", value => {
			colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase());
		});
	});

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
	return (
		<>
			<ChromePicker
				className={classes.picker}
				color={currentColor}
				onChangeComplete={updateCurrentColor}
			/>
			<ValidatorForm onSubmit={addNewColor}>
				<TextValidator
					margin="normal"
					variant="filled"
					placeholder="Color Name"
					className={classes.colorNameInput}
					value={colorName}
					onChange={handleNameChange}
					validators={["required"]}
					errorMessages={["this field is required"]}
				/>
				<Button
					className={classes.addColor}
					type="submit"
					variant="contained"
					color="primary"
					style={{ background: paletteIsFull ? "grey" : currentColor }}
					disabled={paletteIsFull}
				>
					{paletteIsFull ? "Palette is Full" : "Add Color"}
				</Button>
			</ValidatorForm>
		</>
	);
};

export default withStyles(styles)(ColorPickerForm);
