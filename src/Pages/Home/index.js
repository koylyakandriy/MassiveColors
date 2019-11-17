import React, { Component } from "react";
import MiniPalette from "../../Components/MiniPalette";
import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";

const styles = {
	root: {
		backgroundColor: "blue",
		height: "100vh",
		display: "flex",
		alignItems: "flex-start",
		justifyContent: "center",
	},
	container: {
		width: "50%",
		display: "flex",
		alignItems: "flex-start",
		flexDirection: "column",
		flexWrap: "wrap",
	},
	nav: {
		display: "flex",
		width: "100%",
		justifyContent: "space-between",
		alignItems: "center",
		color: "white",
		"& a": {
			color: "white",
			textDecoration: "none",
		},
	},
	palettes: {
		boxSizing: "border-box",
		width: "100%",
		display: "grid",
		gridTemplateColumns: "repeat(3, 30%)",
		gridColumnGap: "5%",
	},
};

class Home extends Component {
	goToPalette = id => {
		const {
			history: { push },
		} = this.props;

		push(`/palette/${id}`);
	};
	render() {
		const { pallets, classes } = this.props;

		return (
			<div className={classes.root}>
				<div className={classes.container}>
					<nav className={classes.nav}>
						<h1>React Colors</h1>
						<Link to="/palette/new">Create new palette</Link>
					</nav>
					<div className={classes.palettes}>
						{Array.from(pallets, palette => (
							<MiniPalette
								key={palette.id}
								{...palette}
								handleClick={() => this.goToPalette(palette.id)}
							/>
						))}
					</div>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(Home);
