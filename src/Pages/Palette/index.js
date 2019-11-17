import React, { Component } from "react";

import ColorBox from "../../Components/ColorBox";
import Navbar from "../../Components/Nevbar";
import PaletteFooter from "../../Components/PaletteFooter";

import "./style.css";

class Palette extends Component {
	state = {
		level: 500,
		format: "hex",
	};

	changeLevel = level => {
		this.setState({ level });
	};

	changeFormat = value => {
		this.setState({ format: value });
	};

	render() {
		const {
			palette: { colors, paletteName, emoji, id },
		} = this.props;
		const { level, format } = this.state;

		return (
			<div className="Palette">
				<Navbar
					level={level}
					changeLevel={this.changeLevel}
					changeFormat={this.changeFormat}
					showingColors
				/>
				<div className="Palette-colors">
					{colors[level].map(color => (
						<ColorBox
							key={color.id}
							background={color[format]}
							name={color.name}
							id={color.id}
							paletteId={id}
							showLink
						/>
					))}
				</div>
				<PaletteFooter paletteName={paletteName} emoji={emoji} />
			</div>
		);
	}
}

export default Palette;
