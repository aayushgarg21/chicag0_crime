

const margin = {
  top: 20, right: 20, bottom: 20, left: 300,
};


const width = 1000 - margin.right - margin.left;


const height = 700 - margin.top - margin.bottom;


const radius = width / 2.5;

const color = d3.scaleOrdinal()
  .range(['#ffafc6', '#e4b7e5', '#B6D6CC', '#ffb997', '#f4ded0', '#4d243d', '#e2edf6', '#89b6db']);


const arc = d3.arc()
  .outerRadius(radius - 10)
  .innerRadius(0);


const labelArc = d3.arc()
  .outerRadius(radius - 40)
  .innerRadius(radius - 40);


const pie = d3.pie()
  .sort(null)
  .value(d => d.Count);


const svg = d3.select('body').append('svg')
  .attr('width', width)
  .attr('height', height)
  .append('g')
  .attr('transform', `translate(${width / 2},${height / 2})`);


d3.json('json/pie.json', (error, data) => {
  if (error) throw error;


  data.forEach((d) => {
    d.Count = +d.Count;
    d.Type = d.Type;
  });


  const g = svg.selectAll('.arc')
    .data(pie(data))
    .enter().append('g')
    .attr('class', 'arc');


  g.append('path')
    .attr('d', arc)
    .style('fill', d => color(d.data.Type))

    .transition()
    .ease(d3.easeLinear)
    .duration(2000)
    .attrTween('d', tweenPie);
  // draw tick marks
  const label_group = d3.select(`#${pieId} .label_group`);
  lines = label_group.selectAll('line').data(filteredData);
  lines.enter().append('svg:line')
    .attr('x1', 0)
    .attr('x2', 0)
    .attr('y1', (d) => {
      if (d.value > threshold) {
        return -that.r - 3;
      }
      return -that.r;
    })
    .attr('y2', (d) => {
      if (d.value > threshold) {
        return -that.r - 8;
      }

      return -that.r;
    })
    .attr('stroke', 'gray')
    .attr('transform', d => `rotate(${(d.startAngle + d.endAngle) / 2 * (180 / Math.PI)})`);


  lines.transition()
    .duration(this.tweenDuration)
    .attr('transform', d => `rotate(${(d.startAngle + d.endAngle) / 2 * (180 / Math.PI)})`);

  lines.exit().remove();
});

function tweenPie(b) {
  b.innerRadius = 0;
  const i = d3.interpolate({ startAngle: 0, endAngle: 0 }, b);
  return function (t) { return arc(i(t)); };
}
