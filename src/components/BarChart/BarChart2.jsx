import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { event as currentEvent  } from 'd3-selection';

const Barchart2 = ({ data, mobile }) => {
  const ref = useRef();

  let valores = data.map(elemento =>elemento.valor);
  let maximoValor = Math.max(...valores);
  

  useEffect(() => {
    // set the dimensions and margins of the graph
    const margin = { top: 100, right: 0, bottom: 120, left: mobile ? 15 : 150 },
      width = mobile ? 290 - margin.left - margin.right : 700 - margin.left - margin.right,
      height = mobile ? 300 - margin.top - margin.bottom : 600 - margin.top - margin.bottom;

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

      var colors = d3.scaleQuantize()
    .domain([0,maximoValor])
    .range(["#E6F598", 
    "#FFFFBF", "#FEE08B", "#FDAE61", "#F46D43", "#D53E4F", "#9E0142"]);

    // let colors = d3.scaleLinear().domain(0, maximoValor).range(["white", "blue"])

      // Bars

      let tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("background", "#ffffff")


      svg
        .selectAll("mybar")
        .data(data)
        .join("rect")
        .attr("x", (d) => x(d.chave))
        .attr("y", (d) => y(d.valor))
        .attr("width", x.bandwidth())
        .attr("height", (d) => height - y(d.valor))
        .attr("fill", function(d) {
          return colors(d.valor)
        })
        .on("mouseover", function(d, i){tooltip.text(`valor: ${i.valor}`); return tooltip.style("visibility", "visible");})
        .on("mousemove", function(event){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
        .on("mouseout", function(){return tooltip.style("visibility", "hidden");});
    
  }, []);

  return (
  <div className="flex justify-center">
  <svg width={mobile ? 290 : 700} height={mobile ? 300 : 600} id="barchart" ref={ref} />
  </div>);
};

export default Barchart2;