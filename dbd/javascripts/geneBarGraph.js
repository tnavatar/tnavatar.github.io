// Creates bar graph on individual genes pages

if ($(".gene-detail-page")[0]) {
  // Import data from individual genes div (at bottom of page) and put it in format to use
  var data1 = $(".implicated_data").data();
  var data = [{"gene": "title", "disorder": "ID/DD", "num_implicated": data1["id"]},
                    {"gene": "title", "disorder": "ASD", "num_implicated": data1["asd"]},
                    {"gene": "title", "disorder": "EP", "num_implicated": data1["ep"]},
                    {"gene": "title", "disorder": "ADHD", "num_implicated": data1["adhd"]},
                    {"gene": "title", "disorder": "SCZ", "num_implicated": data1["scz"]},
                    {"gene": "title", "disorder": "BD", "num_implicated": data1["bd"]}];

  // Used to generate the bar chart
  function generateBarChart() {
  // Set bar graph size and x and y axis scales
  var margin = {top: 30, right: 20, bottom: 30, left: 30};
  if (window.innerWidth > 580) {
    var width = 480 - margin.left - margin.right;
    var height = 320 - margin.top - margin.bottom;
  } else {
    var width = window.innerWidth - 100 - margin.left - margin.right;
    var height = parseInt(width * 2.0/3.0);
  }

  var x = d3.scale.ordinal()
      .rangeRoundBands([0, width], .1);

  var y = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  // Create SVG
  var svg = d3.select("#barGraph").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var data_array = []
      for (var i = 0; i < data.length; i += 1) {
        data_array.push(data[i]["num_implicated"]);
      };

  // Set the number of ticks on the y axis
    function yAxis_ticks() {
      if (Math.max.apply(Math, data_array) < 10) {
        return Math.max.apply(Math, data_array);
      } else {
        return 10;
      }
    };

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(yAxis_ticks());

  // Set the x and y domains
    x.domain(data.map(function(d) { return d.disorder; }));
    y.domain([0, d3.max(data, function(d) { return d.num_implicated; })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .selectAll("text")
        .style("font-size", "1.2em");

  // Attach title to graph
  // The size will depend on the size of the browser window/screen
  if (window.innerWidth > 580) {
    svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .style("font-family", "Helvetica Neue")
        .text("Cases Implicated in Each Disorder");
  } else {
    svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", (10 * window.innerWidth / 580 + 10) + "px")
        .style("font-family", "Helvetica Neue")
        .text("Cases Implicated in Each Disorder");
  }

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .selectAll("text")
        .style("font-size", "1.1em");

  // Create bars
    svg.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.disorder); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.num_implicated); })
        .attr("height", function(d) { return height - y(d.num_implicated); })
        .style("fill", function(d) {
          if (d.disorder === "ID/DD") {
            return "#1b9e77";
          } else if (d.disorder === "ASD") {
            return "#d95f02";
          } else if (d.disorder === "EP") {
            return "#7570b3";
          } else if (d.disorder === "ADHD") {
            return "#e7298a";
          } else if (d.disorder === "SCZ") {
            return "#66a61e";
          } else if (d.disorder === "BD") {
            return "#e6ab02";
          }
        });

        var yTextPadding = 17;
        var xTextPadding = 10;

  // Append number labels to bars
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
        }})
        .style("font-size", "1.1em");

  function type(d) {
    d.num_implicated = +d.num_implicated;
    return d;
  }
}

  // Generate initial bar chart
  generateBarChart();


  // Generates a new bar chart that is smaller when the screen size is reduced below 580 pixels
  function resize() {
    var minNormalWidth = 580;
    if (window.innerWidth <= minNormalWidth) {
      // Remove the old bar chart and generate a new, resized one whenever the screen is resized when its size is below 580px
      $("#barGraph").find("svg").remove();
      generateBarChart();
    }
  }

  // Call the resize() function when the screen size changes
  d3.select(window).on("resize", resize);
}
;
