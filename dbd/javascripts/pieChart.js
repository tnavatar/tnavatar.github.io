// Creates pie charts on individual genes pages

if ($(".gene-detail-page")[0]) {

  // Used to generate the pie chart
  function generatePieChart() {
    var pieChartOutline = {
            	"header": {
            		"title": {
            			"text": "Inheritance",
            			"fontSize": 20,
            			"font": "Helvetica Neue",
                  // "font-weight": "bold",
            		},
            		"subtitle": {
                  "text": "",
                  "color": "#ffffff",
            			"fontSize": 12,
            			"font": "open sans"
            		},
            		"titleSubtitlePadding": 9
            	},
            	"footer": {
                "color": "#999999",
            		"fontSize": 15,
            		"font": "open sans",
            		"location": ""
            	},
            	"size": {
                "canvasHeight": 350,
            		"canvasWidth": 450,
            		"pieOuterRadius": "90%"
            	},
            	"data": {
            		"sortOrder": "value-desc",
            		"content": [
            			{
            				"label": "Inherited",
            				"value": $(".source_data").data("inherited"),
            				"color": "#2484c1"
            			},
            			{
            				"label": "De novo",
            				"value": $(".source_data").data("denovo"),
            				"color": "#71afd7"
            			},
            			{
            				"label": "Unknown",
            				"value": $(".source_data").data("unknown"),
            				"color": "#4daa4b"
            			}
            		]
            	},
              "labels": {
		"outer": {
			"pieDistance": 32
		},
		"inner": {
      "format": "value",
			"hideWhenLessThanPercentage": 3
		},
		"mainLabel": {
			"fontSize": 16
		},
		"percentage": {
			"color": "#ffffff",
			"decimalPlaces": 0,
      "fontSize": 14
		},
		"value": {
			"color": "#ffffff",
			"fontSize": 14
		},
		"lines": {
			"enabled": true
		},
		"truncation": {
			"enabled": true
		}
	},
	"effects": {
    // Remove to re-enable effects
    "load": { //this
			"effect": "none" //this
		}, //this
		"pullOutSegmentOnClick": {
			// "effect": "linear", // put this back in
      "effect": "none", //this
      "speed": 400,
			"size": 8
		}, // this (only the comma)
    "highlightSegmentOnMouseover": false, //this
		"highlightLuminosity": -0.5 //this
	},
	"misc": {
		"gradient": {
			"enabled": true,
			"percentage": 100
		}
	}
};

    // Scale down the pie chart, title, and labels if the screen is narrower than 580 pixels
    if (window.innerWidth <= 580) {
      pieChartOutline.size.canvasWidth = parseInt(225 * window.innerWidth / 580 + 225);
      pieChartOutline.size.canvasHeight = parseInt(175 * window.innerWidth / 580 + 175);
      pieChartOutline.header.title.fontSize = parseInt(10 * window.innerWidth / 580 + 10);
      pieChartOutline.labels.mainLabel.fontSize = parseInt(8 * window.innerWidth / 580 + 8);
      pieChartOutline.labels.value.fontSize = parseInt(7 * window.innerWidth / 580 + 7);
    }

    // Generate the pie chart using d3.pie
    var pie = new d3pie("pieChart", pieChartOutline);
  }

  // Generate initial pie chart
  generatePieChart();


  // Generates a new pie chart that is smaller when the screen size is reduced below 580 pixels
  function resizePie() {
    var minNormalWidth = 580;
    if (window.innerWidth <= minNormalWidth) {
      // Remove the old pie chart and generate a new, resized one whenever the screen is resized when its size is below 580px
      $("#pieChart").find("svg").remove();
      generatePieChart();
    }
  }

  // Call the resizePie() function when the screen size changes
  $(window).resize(function() {
    resizePie();
  });
}
;
