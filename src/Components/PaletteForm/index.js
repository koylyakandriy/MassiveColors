import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

const styles = {
	formValidator: {},
};

const PaletteForm = ({ savePalette, colors, history, classes, hideForm }) => {
	const [open] = useState(true);
	const [newInputPaletteName, setNewInputPaletteName] = useState("");

	useEffect(() => {
		ValidatorForm.addValidationRule("isColorNameUnique", value => {
			colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase());
		});
	});

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
		<Dialog open={open} onClose={hideForm} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
			<ValidatorForm
				onSubmit={() => handleSavePalette()}
				className={classes.formValidator}
			>
				<DialogContent>
					<DialogContentText>
						Please enter a name for your new beautiful palette
					</DialogContentText>

					<Picker />

					<TextValidator
						margin="normal"
						fullWidth
						label="Palette Name"
						value={newInputPaletteName}
						onChange={handleInputChange}
						validators={["required"]}
						errorMessages={["this field is required"]}
					/>
				</DialogContent>

				<DialogActions>
					<Button onClick={hideForm} color="primary">
						Cancel
					</Button>
					<Button type="submit" variant="contained" color="primary">
						Save Palette
					</Button>
				</DialogActions>
			</ValidatorForm>
		</Dialog>
	);
};

export default withStyles(styles)(withRouter(PaletteForm));
