function init(){
var selector=d3.select("#selDataset");
d3.json("samples.json").then((data)=>{
    var names=data.names;
    names.forEach((sample)=> { 
        selector.append("option")
        .text(sample)
    .property("value",sample);
    })
    var firstdata=names[0];
    metadata(firstdata);
    Createcharts(firstdata)
})
}
init()


function metadata(sample){
    d3.json("samples.json").then((data)=>{
        var metadata=data.metadata;
        var Array=metadata.filter(row=> row.id == sample);
        var result= Array[0];
        var display =d3.select("#sample-metadata");
        display.html("");
        Object.entries(result).forEach(([key,value])=> {
            display.append("h6").text(`${key}: ${value}`);
        })
    })
}

function Createcharts(sample){
    d3.json("samples.json").then((data)=>{
        var samples=data.samples;
        var Array=samples.filter(row=> row.id == sample);
        var result= Array[0];
        var otu_id= result.otu_ids;
        var otu_label= result.otu_labels;
        var sample_value= result.sample_values;
        var bubbledata=[{
            x:otu_id,
            y:sample_value,
            mode:"markers",
            marker:{
                size:sample_value,
                color:otu_id
            }

            
        }];
        Plotly.newPlot("bubble",bubbledata);
        var bardata=[{
            x: sample_value.slice(0,10).reverse(),
            y: otu_id.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
            text: otu_label.slice(0,10).reverse(),
            type:"bar",
            orientation:"h"
    
        }];
        Plotly.newPlot("bar",bardata);
});
}

function optionChanged(newsample)
{
    metadata(newsample);
    Createcharts(newsample);


}