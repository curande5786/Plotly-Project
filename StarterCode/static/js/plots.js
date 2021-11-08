
d3.json("static/js/samples.json").then(({ names }) => {
    names.forEach(name => {
        d3.select('select').append('option').text(name);
    });
    buildCharts();
});

function optionChanged() {
    buildCharts();
}

function buildCharts() {
    var sel = d3.select('select').node().value;

    d3.json("static/js/samples.json").then(({ metadata, samples }) => {
       var meta = metadata.filter(obj=>obj.id==sel)[0];
       var samp = samples.filter(obj=>obj.id==sel)[0];
       var { otu_ids, sample_values, otu_labels } = samp; 

        console.log(otu_ids);

        d3.select('.panel-body').html('');
        Object.entries(meta).forEach(([key,val])=>{
            d3.select('.panel-body').append('h4').text(key.toUpperCase()+": "+val);
        });



        var data = [
            {
              x: sample_values.slice(0,10).reverse(),
              y: otu_ids.slice(0,10).reverse().map(x=>'OTU '+x),
              type: 'bar',
              orientation:'h'
            }
          ];

        var layout = {
            'title': {text:'<b>Top 10 Bacteria Cultures Found</b>','y':.88, font: {size: 24}},
            'height': 550
        }
          
          
          Plotly.newPlot('bar', data, layout);

        
          var trace1 = {
            x: otu_ids,
            y: sample_values,
            mode: 'markers',
            text: otu_labels,
            marker: {
              size: sample_values,
              color: otu_ids,
              colorscale: 'Earth'
            }
          };
          
          var data = [trace1];
          
          var layout = {
            title: {text: '<b>Bacteria Cultures per Sample</b>', font: {size: 30}},
            xaxis: {
                title: {
                  text: 'OTU IDs'}},
            showlegend: false,
            height: 600
          };
          
          Plotly.newPlot('bubble', data, layout);

          var data = [
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: 2,
              title: { text: "<b>Belly Button Washing Frequency</b>" },
              type: "indicator",
              mode: "gauge+number",
              delta: { reference: 400 },
              gauge: { axis: { range: [null, 9] } }
            }
          ];
          
          var layout = { width: 600, height: 400 };
          Plotly.newPlot('gauge', data, layout);
          
          

    });
};

