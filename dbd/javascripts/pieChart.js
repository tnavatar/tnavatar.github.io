
            var pie = new d3pie("pieChart", {
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
		"pullOutSegmentOnClick": {
			"effect": "linear",
			"speed": 400,
			"size": 8
		}
	},
	"misc": {
		"gradient": {
			"enabled": true,
			"percentage": 100
		}
	}
});
