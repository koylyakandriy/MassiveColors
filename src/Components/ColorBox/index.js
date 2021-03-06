import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import chroma from "chroma-js";

import "./style.css";

class ColorBox extends Component {
	state = { copied: false };

	changeCopyState = () => {
		this.setState({ copied: true }, () => {
			setTimeout(() => this.setState({ copied: false }), 1500);
		});
	};

	render() {
		const { background, name, paletteId, id, showLink } = this.props;
		const { copied } = this.state;

		const isDarkColor = chroma(background).luminance() <= 0.05;
		const isLightColor = chroma(background).luminance() >= 0.5;

		return (
			<CopyToClipboard text={background} onCopy={this.changeCopyState}>
				<div style={{ background }} className="ColorBox">
					<div
						style={{ background }}
						className={`copy-overlay ${copied && "show"}`}
					/>
					<div className={`copy-msg ${copied && "show"}`}>
						<h1>Copied!</h1>
						<p className={isLightColor.toLocaleString() && "dark-text"}>
							{background}
						</p>
					</div>
					<div className="copy-container">
						<div className="box-content">
							<span className={isDarkColor ? "light-text" : undefined}>
								{name}
							</span>
						</div>
						<button className={`copy-button ${isLightColor && "dark-text"}`}>
							Copy
						</button>
					</div>
					{showLink && (
						<Link
							to={`/palette/${paletteId}/${id}`}
							onClick={e => e.stopPropagation()}
						>
							<span className={`see-more ${isLightColor && "dark-text"}`}>
								MORE
							</span>
						</Link>
					)}
				</div>
			</CopyToClipboard>
		);
	}
}

export default ColorBox;
