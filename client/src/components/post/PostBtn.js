import React, { Component } from 'react';
import { Card, CardBody, CardText, CardImg, Button, Tooltip } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class PostBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tooltipOpen: false
    }

    this.toggleTooltip = this.toggleTooltip.bind(this);
    this.toggleAction = this.toggleAction.bind(this);
  }

  toggleTooltip() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  toggleAction() {
    this.props.toggleAction();
  }


  render() {
    return (
      <span>
        <Button id={this.props.btnId + this.props.post.id} className={this.props.active ? "post-btn active" : "post-btn"} outline color="primary" size="sm" onClick={this.toggleAction}>
           <span>
             <FontAwesomeIcon icon={this.props.icon}/> {this.props.count}
           </span>
        </Button>
        <Tooltip placement="top" isOpen={this.state.tooltipOpen} target={this.props.btnId + this.props.post.id} toggle={this.toggleTooltip} delay={{ show: 500, hide: 0 }}>
          {this.props.active ? this.props.activeText : this.props.inactiveText}
        </Tooltip>
      </span>
    )
  }
}
export default PostBtn;
