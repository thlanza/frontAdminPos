import * as d3 from "d3";
import { useEffect, useRef } from "react";

const Barchart = ({ data }) => {
  const ref = useRef();

  let valores = data.map(elemento =>elemento.valor);
  let maximoValor = Math.max(...valores);
  

  useEffect(() => {
    // set the dimensions and margins of the graph
    const margin = { top: 100, right: 0, bottom: 70, left: 150 },
      width = 700 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3
      .select(ref.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

      const x = d3
        .scaleBand()
        .range([0, width])
        .domain(data.map(({ chave }) => chave))
        .padding(0.2);
      svg
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      // Add Y axis
      const y = d3.scaleLinear().domain([0, maximoValor]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .join("rect")
        .attr("x", (d) => x(d.chave))
        .attr("y", (d) => y(d.valor))
        .attr("width", x.bandwidth())
        .attr("height", (d) => height - y(d.valor))
        .attr("fill", "#5f0f40");
    
  }, []);

  return (
  <div className="flex justify-center">
  <svg width={700} height={600} id="barchart" ref={ref} />
  </div>);
};

export default Barchart;