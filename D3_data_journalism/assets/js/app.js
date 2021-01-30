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
    
}