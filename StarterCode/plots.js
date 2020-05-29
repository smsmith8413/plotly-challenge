function buildFunction(launch) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      // Filter the data for the object with the desired sample number
      var resultArray = metadata.filter(sampleObj => sampleObj.id == launch);
      var result = resultArray[0];
      // Use d3 to select the panel with id of `#sample-metadata`
     var selector = d3.select("#launch-metadata");
  
    //   clear any existing metadata
    selector.html("");
  

      Object.entries(result).forEach(([key, value]) => {
        selector.append("h6").text(`${key.toUpperCase()}: ${value}`);
      });
  
   });
  }
  
  function buildCharts(charts) {
    d3.json("samples.json").then((data) => {
      var samples = data.samples;
      var resultArray = samples.filter(sampleObj => sampleObj.id == charts);
      var result = resultArray[0];
      var sample_values = result.sample_values;  
      var otu_ids = result.otu_ids;
      var otu_labels = result.otu_labels;

        // Build h bar chart

      var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
      var barData = [
        {
          y: yticks,
          x: sample_values.slice(0, 10).reverse(),
          text: otu_labels.slice(0, 10).reverse(),
          type: "bar",
          orientation: "h",
        }
      ];
  
      var barLayout = {
        title: "Top 10 Bacteria Cultures",
        margin: { t: 40, l: 125 }
      };
  
      Plotly.newPlot("bar", barData, barLayout);

  
      // Build bubble chart

      var bubble_trace = [
        {
          x: otu_ids,
          y: sample_values,
          text: otu_labels,
          mode: "markers",
          marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: "electric"
          }
        }
      ];
      var bubble_layout = {
        title: "Bacteria Cultures Per Sample",
        margin: { t: 0 },
        hovermode: "closest",
        xaxis: { title: "OTU ID" },
        margin: { t: 40}
      };
      Plotly.newPlot("bubble", bubble_trace, bubble_layout);
    });
}
  
  function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
  
    // Use the list of sample names to populate the select options
    d3.json("samples.json").then((data) => {
      var sampleNames = data.names;
  
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
      // Use the first sample from the list to build the initial plots
      var initialData = sampleNames[0];
      buildCharts(initialData);
      buildFunction(initialData);
    });
  }
  
  function optionChanged(newData) {
    buildCharts(newData);
    buildFunction(newData);
  }

  // Initialize the dashboard
  init();
