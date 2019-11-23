import React, { Component } from "react";
import ColorBox from "../../Components/ColorBox";
import Navbar from "../../Components/Nevbar";
import PaletteFooter from "../../Components/PaletteMateFooter";
import { Link } from "react-router-dom";

class SingleColorPalette extends Component {
	state = {
		format: "hex",
	};
	gatherShades = (palette, colorToFilterBy) => {
		let shades = [];
		let allColors = palette.colors;

		for (let key in allColors) {
			shades = shades.concat(
				allColors[key].filter(color => color.id === colorToFilterBy),
			);
		}
		return shades.slice(1);
	};

	changeFormat = value => {
		this.setState({ format: value });
	};

	render() {
		const { format } = this.state;
		const { palette, colorId } = this.props;
		const { paletteName, emoji, id } = palette;

		const _shades = this.gatherShades(palette, colorId);

		return (
			<div className="SingleColorPalette Palette">
				<Navbar changeFormat={this.changeFormat} showingColors={false} />
				<div className="Palette-colors">
					{_shades.map(color => (
						<ColorBox
							key={color.name}
							name={color.name}
							background={color[format]}
							showLink={false}
						/>
					))}
					<div className="go-back ColorBox">
						<Link className="back-button" to={`/palette/${id}`}>
							Go Back
						</Link>
					</div>
				</div>
				<PaletteFooter paletteName={paletteName} emoji={emoji} />
			</div>
		);
	}
}

export default SingleColorPalette;
