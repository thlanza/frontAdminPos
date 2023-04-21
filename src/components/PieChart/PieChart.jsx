import React from 'react'
import { useEffect } from 'react';
import * as d3 from 'd3';

const PieChart = ({ data, outerRadius, innerRadius }) => {
  const margin = {
    top: 250,
    right: 50,
    bottom: 50,
    left: 370
  };

  console.log(data)

  const width = 2 * outerRadius + margin.left + margin.right;
  const height = 2 * outerRadius + margin.top + margin.bottom;

  const colorScale = d3
                        .scaleSequential()
                        .interpolator(d3.interpolatePlasma)
                        .domain([0, data.length]);

  useEffect(() => {
    drawChart();
  }, [data]);

  function drawChart() {
        d3
            .select('#pie-container')
            .select('svg')
            .remove()

    const svg = d3
                    .select('#pie-container')
                    .append('svg')
                    .attr('width', width)
                    .attr('height', height)
                    .append('g')
                    .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const arcGenerator = d3
                            .arc()
                            .innerRadius(innerRadius)
                            .outerRadius(outerRadius);

    const pieGenerator = d3
                            .pie()
                            .padAngle(0)
                            .value((d) => d.valor);

    const arc = svg
                    .selectAll()
                    .data(pieGenerator(data))
                    .enter();

    arc
        .append('path')
        .attr('d', arcGenerator)
        .style('fill', (_, i) => colorScale(i))
        .style('stroke', '#FFFFFF')
        .style('stroke-width', 0);

    let tots = d3.sum(data, function (d) {
       return d.valor 
    });

    data.forEach(function (d) {
        d.percentage = d.valor / tots;
    });

    let percentageFormat = d3.format(".1%");
  
   
    arc
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')
        .text((d) => `${d.data.chave}: ${percentageFormat(d.data.percentage)}`)
        .style('fill', 'white')
        .attr('transform', (d) => {
            const [x, y] = arcGenerator.centroid(d);
            return "translate(" + x*2.2 + "," + y*2.2 + ")";
        })

  }
  return (
    <div id="pie-container" />
  )
}

export default PieChart