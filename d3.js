function load () {
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


      d3.csv("titanic.csv").then(function (data) {
        // define the age categories
        const ageCategories = [
          { label: "0-10", min: 0, max: 10 },
          { label: "10-20", min: 10, max: 20 },
          { label: "20-30", min: 20, max: 30 },
          { label: "30-40", min: 30, max: 40 },
          { label: "40-50", min: 40, max: 50 },
          { label: "50-60", min: 50, max: 60 },
          { label: "60-70", min: 60, max: 70 },
          { label: "70-80", min: 70, max: 80 },
          { label: "80-90", min: 80, max: 90 },
          { label: "90-100", min: 90, max: 100 },
        ];

        // group the passengers by age category
        const ageData = ageCategories.map((category) => {
          const passengers = data.filter(
            (passenger) =>
              passenger.Age >= category.min && passenger.Age < category.max
          );
          return { category: category.label, count: passengers.length };
        });

        // define the dimensions of the SVG container
        const width = 400;
        const height = 400;
        const radius = Math.min(width, height) / 2;

        // define the color scale
        const color = d3
          .scaleOrdinal()
          .domain(ageCategories.map((category) => category.label))
          .range(d3.schemeSet2);

        // define the pie generator
        const pie = d3
          .pie()
          .value((d) => d.count)
          .sort(null);

        // define the arc generator
        const arc = d3
          .arc()
          .innerRadius(radius * 0.5)
          .outerRadius(radius * 0.8);

        // create the SVG container
        const svg = d3
          .select("body")
          .append("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", `translate(${width / 2}, ${height / 2})`);

        // create the pie chart
        const arcs = svg
          .selectAll("arc")
          .data(pie(ageData))
          .enter()
          .append("g")
          .attr("class", "arc");

        arcs
          .append("path")
          .attr("d", arc)
          .attr("fill", (d) => color(d.data.category));

        // add labels to the pie chart
        arcs
          .append("text")
          .attr("transform", (d) => `translate(${arc.centroid(d)})`)
          .attr("text-anchor", "middle")
          .text((d) => d.data.category);
      });
    }