import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { withRouter } from "react-router-dom";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

const PaletteForm = ({ savePalette, colors, history, hideForm }) => {
	const [stage, setStage] = useState("form");
	const [newInputPaletteName, setNewInputPaletteName] = useState("");

	useEffect(() => {
		ValidatorForm.addValidationRule("isColorNameUnique", value => {
			colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase());
		});
	});

	const handleSavePalette = emoji => {
		let newName = newInputPaletteName;
		const newPaletteName = {
			paletteName: newName,
			colors,
			id: newName.toLowerCase().replace(/ /g, "-"),
			emoji: emoji.native,
		};
		savePalette(newPaletteName);
		history.push("/");
	};

	const handleInputChange = ({ target }) => {
		setNewInputPaletteName(target.value);
	};

	const showEmojiPicker = () => {
		setStage("emoji");
	};

	return (
		<div>
			<Dialog open={stage === "emoji"} onClose={hideForm}>
				<DialogTitle id="form-dialog-title">Choose a Palette Emoji</DialogTitle>

				<Picker title="Pick a palette emoji" onSelect={handleSavePalette} />
			</Dialog>
			<Dialog
				open={stage === "form"}
				onClose={hideForm}
				aria-labelledby="form-dialog-title"
			>
				<ValidatorForm onSubmit={() => showEmojiPicker()}>
					<DialogContent>
						<DialogContentText>
							Please enter a name for your new beautiful palette
						</DialogContentText>

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
		</div>
	);
};

export default withRouter(PaletteForm);
