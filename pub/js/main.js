$(function(){
  var tokyo = [
    [ "2015-05-21", "20", "16" ],
    [ "2015-05-22", "24", "16" ],
    [ "2015-05-23", "25", "16" ],
    [ "2015-05-24", "25", "16" ],
    [ "2015-05-25", "28", "19" ],
    [ "2015-05-16", "25", "19" ],
    [ "2015-05-27", "23", "18" ]
  ];
  var w = 640,
    h = 480,
    xmargin = 30,
    xpadding = 30,
    ymargin = 40;

  var yMin = Math.min(
    d3.min(tokyo, function(d){ return d[1] }),
    d3.min(tokyo, function(d){ return d[2] }),
    0 );

  var yMax = Math.max(
    d3.max(tokyo, function(d){ return d[1] }),
    d3.max(tokyo, function(d){ return d[2] }) );

  var yScale = d3.scale.linear()
    .domain([yMin, yMax])
    .range([h - ymargin, ymargin]);

  var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient('left');

  var range = d3.extent(tokyo, function(d){ return (new Date(d[0])) });

  //var xScale = d3.time.scale()
  var xScale = d3.scale.ordinal()
    //.domain(range)
    .domain(tokyo.map(function(d){return d[0]}).sort())
    .rangeRoundBands([xmargin, w - xmargin - xpadding], .1);
    //.range([xmargin, w - xmargin - xpadding]);

  var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient('bottom')
//    .tickFormat(d3.time.format('%Y/%m/%d'))

  var svg = d3.select("#result");
  svg.attr('width', w).attr('height', h);

  svg.selectAll('g')
    .data(tokyo)
    .enter()
    .append('rect')
    .attr('width', '20')
    .attr('x', function(d){
      return xScale(d[0]);
    })
    .attr('height', function(d){
      return h - yScale(d[1]) - ymargin;
    })
    .attr('y', function(d){
      return yScale(d[1]);
    })

  svg.append('g')
    .attr('class', 'axis')
    .attr('transform', "translate("+xmargin+", 0)")
    .call(yAxis);

  svg.append('g')
    .attr('class', 'axis')
    .attr('transform', "translate(0, "+(h - ymargin)+")")
    .call(xAxis)
    .selectAll('text')
    .attr('transform', 'translate(25, 7) rotate(15)')

});
