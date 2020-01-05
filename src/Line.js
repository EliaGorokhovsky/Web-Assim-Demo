import React, { Component } from 'react';
import * as d3 from 'd3';

export default class Line extends Component {

    createLine() {
        const { innerHeight, innerWidth } = this.props;
        const line = d3.line()
            .x(point => this.props.xScale(point.time))
             .y(point => this.props.yScale(point.state));
        d3.select(this.line)
            .data([this.props.points])
            .attr('d', line);
    }

    componentDidMount() {
        this.createLine();
    }

    componentDidUpdate() {
        this.createLine();
    }

    render() {
        return <path ref={path => this.line = path} stroke={this.props.color} fill="transparent"/>
    }

}