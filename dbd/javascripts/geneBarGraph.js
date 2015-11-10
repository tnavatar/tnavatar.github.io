// console.log($(".implicated_data").data());
var data1 = $(".implicated_data").data();
var data = [{"gene": "title", "disorder": "Intellectual Disability", "num_implicated": data1["id"]},
                  {"gene": "title", "disorder": "Autism", "num_implicated": data1["asd"]},
                  {"gene": "title", "disorder": "Epilepsy", "num_implicated": data1["ep"]},
                  {"gene": "title", "disorder": "ADHD", "num_implicated": data1["adhd"]},
                  {"gene": "title", "disorder": "Schizophrenia", "num_implicated": data1["scz"]},
                  {"gene": "title", "disorder": "Bipolar Disorder", "num_implicated": data1["bd"]}];

var margin = {top: 20, right: 20, bottom: 30, left: 22},
    width = 480 - margin.left - margin.right,
    height = 250 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");


var svg = d3.select("#barGraph").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// d3.csv("../javascripts/implicated_data.csv", type, function(error, data) {
//   if (error) throw error;

  // function data_array(ddd) {
    var data_array = []
    for (var i = 0; i < data.length; i += 1) {
      data_array.push(data[i]["num_implicated"]);
    };
  //   return data_array;
  // };
  // console.log(data_array);

  function yAxis_ticks() {
    if (Math.max.apply(Math, data_array) < 10) {
      // console.log(Math.max.apply(Math, data_array));
      return Math.max.apply(Math, data_array);
    } else {
      // console.log(10);
      return 10;
    }
  };

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .ticks(yAxis_ticks());

  x.domain(data.map(function(d) { return d.disorder; }));
  y.domain([0, d3.max(data, function(d) { return d.num_implicated; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      // .attr("y", 0)
      // .attr("x", 9)
      // .attr("dy", ".35em")
      // .attr("transform", "rotate(45)")
      // .style("text-anchor", "start")
      .style("font-weight", "bold")
      .style("font-size", "0.9em");

  svg.append("text")
      .attr("x", (width / 2))
      .attr("y", 0 - (margin.top / 2))
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      // .style("text-decoration", "underline")
      .style("font", "sans-serif")
      .style("font-weight", "bold")
      .text("Number of Times this Variant has been Implicated in Each Disorder");

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .selectAll("text")
      // .style("font-weight", "bold")
      .style("font-size", "1.1em");
    // .append("text")
    //   .attr("transform", "rotate(-90)")
    //   .attr("y", 6)
    //   .attr("dy", ".71em")
    //   .style("text-anchor", "end")
    //   .style("font-size", "1.2em")
    //   .text("Number of Times Implicated in Each Disorder");

  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.disorder); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.num_implicated); })
      .attr("height", function(d) { return height - y(d.num_implicated); });

      var yTextPadding = 17;
      var xTextPadding = 10;

  svg.selectAll(".bartext")
      .data(data)
    .enter()
      .append("text")
      .attr("class", "bartext")
      .attr("text-anchor", "middle")
      .attr("fill", function(d) {
          if (d.num_implicated / Math.max.apply(Math, data_array) > 0.1) {
          return "white";
        } else {
          return "black";
        }
      })
      .attr("x", function(d,i) {
          // console.log(width);
          // console.log(x.rangeBand());
          // console.log(x.rangeBand() * ((i) + 1/2) + (i + 1) * Math.round((width - x.rangeBand() * data.length) / (data.length + 1)));
          return x.rangeBand() * ((i) + 1/2) + (i + 1) * Math.round((width - x.rangeBand() * data.length) / (data.length + 1));
      })
      .attr("y", function(d) {
          if (d.num_implicated / Math.max.apply(Math, data_array) > 0.1) {
          return y(d.num_implicated) + yTextPadding;
        } else {
          return y(d.num_implicated) - 4;
        }
      })
      .text(function(d){
           if (d.num_implicated !== 0) { return d.num_implicated;
      }});
// });

function type(d) {
  d.num_implicated = +d.num_implicated;
  return d;
}
;
