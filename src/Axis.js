import React, { Component } from 'react';
import * as d3 from 'd3';

export default class Axis extends Component {

    axisFnType() {
        const { orient } = this.props;
        switch (orient) {
            case 'top':
                return d3.axisTop;
            case 'bottom':
                return d3.axisBottom;
            case 'left':
                return d3.axisLeft;
            case 'right':
                return d3.axisRight;
        }
    }

    updateAxis() {
        const { height, scale } = this.props;
        const axis = this.axisFnType();
        d3.select(this.axis)
            .call(this.axisFnType()(scale));
    }

    componentDidMount() {
        this.updateAxis();
    }

    componentDidUpdate() {
        this.updateAxis();
    }

    render() {
        let position = 0;
        if (this.props.orient == 'bottom') {
            position = this.props.translate;
        }
        return (
            <g ref={axis => this.axis = axis} transform={`translate(${this.props.translateLeft}, ${this.props.translateTop})`}/>
        );
    }

}