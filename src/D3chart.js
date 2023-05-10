import React, {useState, useRef, useEffect} from 'react';
import * as d3 from 'd3';
import './index.css';
import dataSet from "./data.json";

function D3Chart() {
// data variable, grabbing info using useState, an array of values (mockdata) to display the barchart
const [data] = useState(dataSet);

  const svgRef = useRef(); // this will be used to create our SVG using d3

  // as a dependency we are putting the data that we have, so whenever we recieve the data each time, so we can reder our svg everytime our data changes
  // Everything written in useEffect has to be relevent to d3 code
  useEffect(() => {
    // setting up svg container
    const w = 600;
    const h = 350;
    
    const svg = d3.select(svgRef.current)
      .attr('width', w)
      .attr('height', h)
      .attr("role", "img")
      .style('overflow', 'visible')
      .style('margin-top', '75px')
      .style('fill', '#0367E1')

    // setting the scaling
    const xScale = d3.scaleBand() // allows us to get a barchart scale
      .domain(data.map((d) => d.month)) // using our data we are mapping it, value i, the index value. The x scale determines the datapoint we will have
      .range([0, w])
      .padding(0.5);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, (d) => d.number)])
      .range([h, 0]); // we always start from topLeft svo that is why we go from height to 0

    // setting up the axes: ticks and anotation that is relevent knowing what the data represents
    const xAxis = d3.axisBottom(xScale)
      .tickFormat((d) => d)
      .ticks(data.length) // this represents the number of values that we have listed in the data
      .tickSize(0);

   
    const yAxis = d3.axisLeft(yScale)
      .ticks(6) // look at documentation for the tick value, the 5 hear is hard coded
      .tickSize(-w);
      
    svg.append('g')
      .call(xAxis)
      .attr('transform', `translate(0, ${h})`);
      
    svg.append('g')
      .call(yAxis);

    svg.append('text')
      .attr('x', -(h / 2))
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .text('Fjöldi notenda í hundruðum')
  
    svg.append('text')
      .attr('x', w / 2)
      .attr('text-anchor', 'middle')
      .attr('transform', `translate(0, ${h + 40})`)
      .text('Mánuður');

    // setting the svg data: drawing the svg with right scale and height
    svg.selectAll('.bar')
      .data(data)
      .join('rect')
        .attr('x', function(d) {return xScale(d.month)}) // this sets up the xScale
        .attr('y', function(d) {return yScale(d.number)}) // this sets up the yScale
        .attr('width', xScale.bandwidth())
        .attr('height', (d => h - yScale(d.number)));
  
  }, [data]);


  return (
    <div className="App">
      <h1>Fjárhagsaðstoð</h1>
      <div className="skip-link">
        Skip to 
        <a href="#new-graph">Skip fjárhagsaðstoð</a>
      </div>
      
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Semper fringilla elit, in sed ut cursus. Arcu purus dictum etiam quisque tincidunt ipsum aliquet. Lectus sapien augue faucibus iaculis sem mauris convallis.</p>
      {/* By using useRef we are allowing d3 to control the DOM */}
      <svg ref={svgRef}></svg>
      <p id="new-graph">New Graph</p>
    </div>
  );
}

export default D3Chart;
