// D3 Homework challenge - Data Journalism 

// Chart setup
// Automatic resize of the chart
function makeResponsive() {

    // Loads, remove & replace browser with a resized version of chart [condition: SVG Area is not empty]
    var svgArea = d3.select("body").select("svg");

    // Clear SVG [if condition not met]
    if(!svgArea.empty()) {
        svgArea.remove();
    }

    // SVG parameter setup
    var svgWidth = 980;
    var svgHeight = 600;

    // SVG margin setup
    var margin = {
        top: 20,
        right: 40,
        bottom: 90,
        left: 100,
    };

    // Width and height using margins and parameters
    var width = svgWidth - margin.right - margin.left;
    var height = svgHeight - margin.top - margin.bottom;

    // Append division class chart to scatter element
    var chart = d3.select("#scatter").append("div").classed("chart", true);

    // Append SVG element to the chart with appropriate height and width
    var svg = chart.append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);
    
    // Append SVG group
    var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Initial parameters
    var chosenXAxis = "poverty";
    var chosenYAxis = "healthcare";

    // Function for updating xScale
    function xScale(demoData, chosenXAxis) {
        // Create Scale Function for Chart (chosenXAxis)
        var xLinearScale = d3.scaleLinear()
          .domain([d3.min(demoData, d => d[chosenXAxis]) * 0.8,
            d3.max(demoData, d => d[chosenXAxis]) * 1.2
          ])
          .range([0, width]);
        return xLinearScale;
      }

    // Function for updating yScale
    function yScale(demoData, chosenYAxis) {
        // Create Scale Functions for Chart (chosenYAxis)
        var yLinearScale = d3.scaleLinear()
          .domain([d3.min(demoData, d => d[chosenYAxis]) * 0.8,
            d3.max(demoData, d => d[chosenYAxis]) * 1.2
          ])
          .range([height, 0]);
        return yLinearScale;
      }

    // Function for Updating xAxis
    function renderXAxes(newXScale, xAxis) {
        var bottomAxis = d3.axisBottom(newXScale);
            xAxis.transition()
             .duration(1000)
             .call(bottomAxis);
        return xAxis;
    }

    // Function for Updating yAxis
    function renderYAxes(newYScale, yAxis) {
        var leftAxis = d3.axisLeft(newYScale);
            yAxis.transition()
             .duration(1000)
             .call(leftAxis);
        return yAxis;
    }

    // For Change in x or y axis
    // Function for updating circles group with a transition to new circles
    function renderCircles(circlesGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {
    circlesGroup.transition()
      .duration(1000)
      .attr("cx", d => newXScale(d[chosenXAxis]))
      .attr("cy", d => newYScale(d[chosenYAxis]));
    return circlesGroup;
    }

    // Function for updating text group with a transition to new text
    function renderText(textGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {
    textGroup.transition()
      .duration(1000)
      .attr("x", d => newXScale(d[chosenXAxis]))
      .attr("y", d => newYScale(d[chosenYAxis]))
      .attr("text-anchor", "middle");
    return textGroup;
    }

    // Function to stylize x-axis values for tooltips
    function styleX(value, chosenXAxis) {
        // Stylize based on chosen variable
        // Poverty percentage of sample population
        if (chosenXAxis === 'poverty') {
            return `${value}%`;
        }
        // Household income in dollars
        else if (chosenXAxis === 'income') {
            return `$${value}`;
        }
        // age (number)
        else {
            return `${value}`;
        }
    }

    // Function used for updating circles group with new tooltip
    function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup) {
        // Select x label
        // Poverty percentage of sample population
        if (chosenXAxis === 'poverty') {
            var xLabel = "Poverty (%)";
        }
        // Household income in dollars
        else if (chosenXAxis === 'income') {
            var xLabel = "Median Income:";
        }
        // Age (number)
        else {
            var xLabel = "Age (Median)";
        }

        // Select y label
        // Percentage of population sample lacking healthcare
        if (chosenYAxis === 'healthcare') {
            var yLabel = "Lack of Healthcare (%)"
        }
        // Percentage obese population sample
        else if (chosenYAxis === 'obesity') {
            var yLabel = "Obesity (%):"
        }
        // Smoking percentage of sample population
        else {
            var yLabel = "Smokers (%)"
        }

         // Initialize tooltip
        var toolTip = d3.tip()
        .attr("class", "tooltip d3-tip")
        .offset([90, 90])
        .html(function(d) {
            return (`<strong>${d.abbr}</strong><br>${xLabel} ${d[chosenXAxis]}<br>${yLabel} ${d[chosenYAxis]}`);
        });

        // Add Events
        // Create circles tooltip in chart
        circlesGroup.call(toolTip);
        // Create event listeners displaying and hiding circles tooltip
        circlesGroup.on("mouseover", function(data) {
        toolTip.show(data, this);
        })
            // Onmouseout event
            .on("mouseout", function(data) {
                toolTip.hide(data);
            });

        // Create text tooltip in chart
        textGroup.call(toolTip)
        // Create event listeners displaying and hiding text tooltip
        textGroup.on("mouseover", function(data) {
            toolTip.show(data, this);
        })
            // Onmouseout event
            .on("mouseout", function(data) {
                toolTip.hide(data);
            })
        return circlesGroup;
    }
}