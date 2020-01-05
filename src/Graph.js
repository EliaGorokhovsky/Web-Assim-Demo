import React, { Component } from 'react';
import Line from './Line';
import Circle from './Circle';
import * as d3 from 'd3';
import Axis from './Axis.js';

export default class Graph extends Component {

    state = {
        xScale: d3.scaleLinear().range([0, this.props.width - this.props.margin.left - this.props.margin.right]).domain(this.props.timescale),
        yScale: d3.scaleLinear().range([this.props.height - this.props.margin.top - this.props.margin.bottom, 0]).domain(this.props.domain)
    };

    updateLines() {
        const { innerWidth, innerHeight } = this.getInnerSize();
        this.setState({
            xScale: d3.scaleLinear().range([0, innerWidth]).domain(this.props.timescale),
            yScale: d3.scaleLinear().range([innerHeight, 0]).domain(this.props.domain)
        });
    }
    
    transpose(array) {
        if (array.length == 0) return [];
        let out = array[0].ensembles.map(a => []);
        array.forEach((element, i) => {
            element.ensembles.forEach((point, j) =>
                out[j].push({
                    time: element.time,
                    state: point 
                })
            )
        });
        return out;
    }

    componentDidMount() {
        setInterval(() => {
            this.updateLines()
        });
    }

    getInnerSize() {
        const { width, height, margin } = this.props;
        const { top, bottom, left, right } = margin;
        return {
            innerWidth: width - left - right,
            innerHeight: height - top - bottom
        }
    }

    mean(numbers) {
        let total = 0;
        for (let i = 0; i < numbers.length; i++) {
            total += numbers[i];
        }
        return total / numbers.length;
    }
    

    render() {
        const { margin } = this.props;
        const { top, left } = margin;
        const { innerHeight, innerWidth } = this.getInnerSize();
        return (
            <svg 
                width={this.props.width} 
                height={this.props.height} 
                ref={graph => this.graph = graph} 
                id="graph"
                style={{
                    backgroundColor: "white",
                    border: "1px solid gray"
                }}
            >
                <g transform={`translate(${left}, ${top})`} ref={g => this.g = g}>
                    <Line 
                        points={this.props.truth} 
                        innerHeight={innerHeight} 
                        innerWidth={innerWidth} 
                        xScale={this.state.xScale} 
                        yScale={this.state.yScale}
                        color={'#000'}
                    />
                    {
                    this.transpose(this.props.ensembles).map(trajectory =>
                            <Line 
                                points={trajectory} 
                                innerHeight={innerHeight} 
                                innerWidth={innerWidth} 
                                xScale={this.state.xScale} 
                                yScale={this.state.yScale}
                                color={'#FF0000'}
                            />
                        )
                    }
                    <Line 
                        points={this.props.ensembles.map(it => ({
                            time: it.time,
                            state: this.mean(it.ensembles)
                        }))} 
                        innerHeight={innerHeight} 
                        innerWidth={innerWidth} 
                        xScale={this.state.xScale} 
                        yScale={this.state.yScale}
                        color={'#0000FF'}
                    />
                    {
                        this.props.observations.map(point =>
                            <Circle 
                                center={point}
                                radius={2}
                                innerHeight={innerHeight} 
                                innerWidth={innerWidth} 
                                xScale={this.state.xScale} 
                                yScale={this.state.yScale}
                                color={'#00FF00'}
                            />
                        )
                    }
                </g>
                <Axis scale={this.state.xScale} orient='bottom' height={innerHeight} width={innerWidth} translateTop={top + innerHeight} translateLeft={left}/>
                <Axis scale={this.state.yScale} orient='left' height={innerHeight} width={innerWidth} translateTop={top} translateLeft={left}/>
            </svg>
        );
    }

}
 