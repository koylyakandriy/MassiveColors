const styles = {
	root: {
		position: "relative",
		display: "inline-block",
		width: "20%",
		height: "25%",
		margin: "-2px auto -3.5px",
		cursor: "pointer",
		"&:hover svg": {
			color: "#fff",
			transform: "scale(1.4)",
		},
		"@media (max-width: 990px)": {
			width: "50%",
			height: "10%",
		},
		"@media (max-width: 500px)": {
			width: "100%",
			height: "5%",
		},
	},
	boxContent: {
		fontSize: "12px",
		position: "absolute",
		bottom: "0",
		left: "0",
		width: "100%",
		padding: "10px",
		letterSpacing: "1px",
		textTransform: "uppercase",
		display: "flex",
		justifyContent: "space-between",
		color: "rgba(0, 0, 0, 0.5)",
	},
	deleteIcon: {
		transition: "all .3s ease",
	},
};

export default styles;
