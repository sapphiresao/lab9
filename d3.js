const width = 500;
const height = 500;

const svg = d3.select('svg');

const data = d3.range(100).map(() => ({
  x: Math.random() * width,
  y: Math.random() * height,
  r: Math.random() * 10 + 5,
}));

const circles = svg
  .selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
  .attr('cx', d => d.x)
  .attr('cy', d => d.y)
  .attr('r', d => d.r);

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