import React from 'react';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';

class SideMenu extends React.Component {
	state = {
		anchorEl: null,
	};

	handleClick = event => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	render() {
		const { anchorEl } = this.state;

		return (
			<div>
				<Button
					aria-owns={anchorEl ? 'simple-menu' : null}
					aria-haspopup="true"
					onClick={this.handleClick}
				>
					Menu
				</Button>
				<Menu
					id="simple-menu"
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					onClose={this.handleClose}
				>
					<MenuItem onClick={this.handleClose}>Assignments</MenuItem>
					<MenuItem onClick={this.handleClose}>Billing</MenuItem>
					<MenuItem onClick={this.handleClose}>Settings</MenuItem>
				</Menu>
			</div>
		);
	}
}

export default SideMenu;
