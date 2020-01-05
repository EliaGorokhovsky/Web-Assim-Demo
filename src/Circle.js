import React, { Component } from 'react';
import * as d3 from 'd3';

export default class Circle extends Component {

    createCircle() {
        d3.select(this.circ)
            .attr("cx", this.props.xScale(this.props.center.time))
            .attr("cy", this.props.yScale(this.props.center.state))
            .attr("r", this.props.radius);
    }

    componentDidMount() {
        this.createCircle();
    }

    componentDidUpdate() {
        this.createCircle();
    }

    render() {
        return <circle ref={path => this.circ = path} fill={this.props.color} stroke="#000" strokeWidth="1"/>
    }

}