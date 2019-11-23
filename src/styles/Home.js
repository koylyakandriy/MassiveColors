import bg from "../styles/bg.svg";

const styles = {
	root: {
		backgroundColor: "#4469a8",
		backgroundImage: `url(${bg})`,
		height: "100vh",
		display: "flex",
		alignItems: "flex-start",
		justifyContent: "center",
		"@media (max-width: 500px)": {
			overflow: "scroll",
		},
	},
	container: {
		width: "50%",
		display: "flex",
		alignItems: "flex-start",
		flexDirection: "column",
		flexWrap: "wrap",
		"@media (max-width: 990px)": {
			width: "80%",
		},
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
		"@media (max-width: 990px)": {
			gridTemplateColumns: "repeat(2, 50%)",
		},
		"@media (max-width: 500px)": {
			gridTemplateColumns: "repeat(1, 100%)",
			root: { overflow: "scroll" },
		},
	},
};

export default styles;
