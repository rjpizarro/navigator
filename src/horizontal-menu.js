import React, { Component} from 'react';
import PropTypes from 'prop-types';
import Navigator from './Navigator'
import Typography from 'material-ui/Typography';
import {withStyles} from 'material-ui/styles';
import Menu from 'material-ui/Menu';
import Button from 'material-ui/Button';

const styles = {
    menuContainer: {
        display: 'inline-block',
    },
    buttonContainer: {
        textAlign: 'center',
        maxHeight: 36,
        verticalAlign: 'middle',
    },
    buttonLabel: {
        textTransform: 'capitalize'
    },
    childMenuContainer: {
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
    },
    listTextWithIcon: {
        display: 'flex',
    },
    childItem: {
        paddingLeft: 25,
    }
};

class HorizontalMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null,
            open: false,
        };
    }

    render() {
        return (
            <div className={this.props.classes.menuContainer}>
                {this.props.routes.map(this.renderMenuOptions)}
            </div>
        )
    }

    renderMenuOptions = (routeToRender, index) => {
        const {title, route, icon, children} = routeToRender;
        const colorStyle = {color: this.props.textColor};

        const ListTextWithIcon = (
            <div className={this.props.classes.listTextWithIcon}>
                {(icon) ? icon : null}
                <Typography style={colorStyle} align="center">{title}</Typography>
            </div>
        );

        let item;

        if (children) { //generate a list with menu inside
            item = (
                <span>
                    <Button {...this.getButtonProps('parent', route, index )}>
                        {ListTextWithIcon}
                    </Button>
                    <Menu
                        open={this.state.open}
                        onClose={this.handleClose}
                        anchorEl={this.state.anchorEl}
                        MenuListProps={{
                            onMouseLeave: this.handleClose,
                            className: this.props.classes.childMenuContainer,
                        }}
                    >
                        {children.map(this.renderMenuOptions)}
                    </Menu>
                </span>
            );
        } else {
            item = (
                <Button {...this.getButtonProps('children', route, index )}>
                    {ListTextWithIcon}
                </Button>
            )
        }

        return item;
    };

    getButtonProps = (type, route, index) => {
        const propsByType = {
            parent: {
                onClick: this.handleOpen,
                onMouseOver: this.handleOpen,
            },
            children: {
                onClick: () => Navigator.push(route)
            }
        };

        return {
            raised: true,
            key: `${route}-${index}`,
            classes: {
                root: this.props.classes.buttonContainer,
                label: this.props.classes.buttonLabel,
            },
            ...propsByType[type]
        }
    };

    handleOpen = (event) => {
        this.setState({
            open: true,
            anchorEl: event.currentTarget
        })
    };

    handleClose = () => {
        this.setState({
            open: false,
        })
    };
}

HorizontalMenu.defaultProps = {
    offsetTop: 65,
    sidebarBackground: '#FFF',
    pageBackground: '#859BA9',
    textColor: 'inherit',
};

HorizontalMenu.propTypes = {
    routes: PropTypes.arrayOf(PropTypes.shape({
        route: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        icon: PropTypes.element,
        children: PropTypes.array,
    })).isRequired,
    textColor: PropTypes.string,
};

export default withStyles(styles)(HorizontalMenu);
