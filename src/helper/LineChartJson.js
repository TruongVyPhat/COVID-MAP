exports.dataJson = {
    type: "spline",
    name: "",
    markerType: "None",
    mouseover: function(e){
        this.markerType = "circle";
    },
    showInLegend: true,
    dataPoints: []
};

exports.point = {
    y: null,    // số ca
    label: "" // ngày
};

exports.options = {
    animationEnabled: true,	
    title: {
        text: ""
    },
    toolTip: {
        shared: true
    },
    axisY: {
        title: "Number patients of case"
    },
    data: []
 };