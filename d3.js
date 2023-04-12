// generating random points
const svg = d3.select("body")
  .append("svg")
  .attr("width", 500)
  .attr("height", 500);

const data = d3.range(100).map(() => {
  return [Math.random() * 500, Math.random() * 500];
});

svg.selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
  .attr("cx", (d) => d[0])
  .attr("cy", (d) => d[1])
  .attr("r", 5)
  .attr("fill", "black");

// generating pie chart
d3.csv("titanic.csv").then((data) => {
  const ageData = d3.group(data, (d) => d.Age);
  const ageCounts = Array.from(ageData, ([age, passengers]) => ({ age: age, count: passengers.length }));

  const pie = d3.pie()
              .value((d) => d.count);

  const arc = d3.arc()
              .innerRadius(0)
              .outerRadius(200);

  const color = d3.scaleOrdinal(d3.schemeCategory10);

  const pieSvg = d3.select("body")
                  .append("svg")
                  .attr("width", 400)
                  .attr("height", 400);

  const arcs = pieSvg.selectAll("arc")
                .data(pie(ageCounts))
                .enter()
                .append("g")
                .attr("class", "arc")
                .attr("transform", "translate(200,200)");

  arcs.append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.age));

  arcs.append("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .text((d) => d.data.age);
});