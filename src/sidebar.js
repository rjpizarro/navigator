import React, { Component} from 'react';
import PropTypes from 'prop-types';
import Navigator from './Navigator'
import Typography from 'material-ui/Typography';
import {withStyles} from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';
import Sidebar from 'react-sidebar';
import Color from 'color';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';

const styles = {
    listTextWithIcon: {
        display: 'flex',
        alignItems: 'center'
    },
    borderSection: {
        borderBottomWidth: '0.125rem',
        width: 300,
        borderStyle: 'ridge',
    },
    childItem: {
        paddingLeft: 25,
    }
};

class AppSidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {};
        this.collapseBgColor = Color(props.sidebarBackground).lighten(0.3);
    }

    render() {
        return (
            <Sidebar {...this.getSidebarProps()}>
                {this.props.children}
            </Sidebar>
        )
    }

    renderSidebarContent = () => {
        return (
            <List>
                {this.props.routes.map(this.renderMenuOptions)}
            </List>
        )
    };

    renderMenuOptions = (routeToRender, index) => {
        const {title, route, icon, children, containerStyle } = routeToRender;
        const labelStyle = routeToRender.labelStyle || {};
        const listItemProps = routeToRender.listItemProps || {};
        const colorStyle = {color: this.props.textColor, fontSize: this.props.textSize, ...labelStyle};
        const collapseIsOpen = !!this.state[route];

        const Label = <Typography type="subheading" style={colorStyle}>{title}</Typography>;
        const ListTextWithIcon = (
            <div className={this.props.classes.listTextWithIcon}>
                {(icon) ? <ListItemIcon children={icon} /> : null}
                <ListItemText inset={icon} primary={Label} />
            </div>
        );

        let item;
        const commonListItemProps = {
            className: (this.props.showDivider) ? this.props.classes.borderSection : null,
            button: true,
            key: `${route}-${index}`,
            style: containerStyle,
            ...listItemProps,
        };

        if (children) { //generate a list with menu inside
            item = (
                <div>
                    <ListItem
                      {...commonListItemProps}
                      onClick={() => this.toggleNested(route)}
                    >
                        {ListTextWithIcon}
                        {(collapseIsOpen) ? <ExpandLess style={colorStyle}/> : <ExpandMore style={colorStyle}/>}
                    </ListItem>
                    <Collapse in={collapseIsOpen} style={{backgroundColor: this.collapseBgColor}}
                              classes={{wrapperInner: this.props.classes.childItem}}>
                        {children.map(this.renderMenuOptions)}
                    </Collapse>
                </div>
            );
        } else {
            item = (
                <ListItem
                  {...commonListItemProps}
                  onClick={() => this.navToRoute(route)}
                >
                    {ListTextWithIcon}
                </ListItem>
            )
        }

        return item;
    };

    getSidebarProps = () => {
        return {
            docked: this.props.showSidebar,
            sidebar: this.renderSidebarContent(),
            styles: {
                sidebar: {
                    width: this.props.sizeSidebar,
                    backgroundColor: this.props.sidebarBackground,
                    paddingTop: this.props.offsetTop,
                },
                content: {
                    backgroundColor: this.props.pageBackground,
                }
            },
        }
    };

    toggleNested = (routeKey) => {
        this.setState({
            [routeKey]: !this.state[routeKey],
        })
    };

    navToRoute = (route) => {
        Navigator.push(route);
    }
}

AppSidebar.defaultProps = {
    offsetTop: 65,
    sidebarBackground: '#FFF',
    pageBackground: '#859BA9',
    textColor: 'inherit',
    showDivider: false,
    textSize: 16,
    sizeSidebar: 240,
};

AppSidebar.propTypes = {
    showSidebar: PropTypes.bool,
    showDivider: PropTypes.bool,
    routes: PropTypes.arrayOf(PropTypes.shape({
        containerStyle: PropTypes.object,
        labelStyle: PropTypes.object,
        route: PropTypes.string,
        title: PropTypes.string.isRequired,
        icon: PropTypes.element,
        children: PropTypes.array,
        listItemProps: PropTypes.object,
    })).isRequired,
    pageBackground: PropTypes.string,
    sidebarBackground: PropTypes.string,
    textColor: PropTypes.string,
    offsetTop: PropTypes.number,
    textSize: PropTypes.number,
    sizeSidebar: PropTypes.number,
};

export default withStyles(styles)(AppSidebar);
