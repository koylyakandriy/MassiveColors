import React, { Component } from "react";
import MiniPalette from "../../Components/MiniPalette";
import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Dialog } from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Red from "@material-ui/core/colors/red";
import Blue from "@material-ui/core/colors/blue";

import styles from "../../styles/Home";

class Home extends Component {
	state = {
		openDeleteDialog: false,
		deletingId: "",
	};

	openDialog = id => {
		this.setState({ openDeleteDialog: true, deletingId: id });
	};

	closeDialog = () => {
		this.setState({ openDeleteDialog: false, deletingId: "" });
	};

	goToPalette = id => {
		const {
			history: { push },
		} = this.props;

		push(`/palette/${id}`);
	};

	handleDelete = () => {
		const { deletingId } = this.state;
		const { deletePalette } = this.props;

		deletePalette(deletingId);
		this.closeDialog();
	};
	render() {
		const { openDeleteDialog } = this.state;
		const { pallets, classes } = this.props;

		return (
			<div className={classes.root}>
				<div className={classes.container}>
					<nav className={classes.nav}>
						<h1>React Colors</h1>
						<Link to="/palette/new">Create new palette</Link>
					</nav>
					<TransitionGroup className={classes.palettes}>
						{Array.from(pallets, palette => (
							<CSSTransition key={palette.id} classNames="fade" timeout={200}>
								<MiniPalette
									{...palette}
									handleClick={() => this.goToPalette(palette.id)}
									openDialog={this.openDialog}
									id={palette.id}
								/>
							</CSSTransition>
						))}
					</TransitionGroup>
				</div>
				<Dialog
					open={openDeleteDialog}
					aria-labelledby="delete-dialog-title"
					onClose={this.closeDialog}
				>
					<DialogTitle id="delete-dialog-title">
						Delete this palette?
					</DialogTitle>
					<List>
						<ListItem button onClick={this.handleDelete}>
							<ListItemAvatar>
								<Avatar
									style={{ backgroundColor: Blue[100], color: Blue[600] }}
								>
									<CheckIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary="Delete" />
						</ListItem>
						<ListItem button onClick={this.closeDialog}>
							<ListItemAvatar>
								<Avatar style={{ backgroundColor: Red[100], color: Red[600] }}>
									<CloseIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary="Close" />
						</ListItem>
					</List>
				</Dialog>
			</div>
		);
	}
}

export default withStyles(styles)(Home);
