import JsDiagramChart from 'js-diagram-chart';

// let JsDiagramChart = require('js-diagram-chart').default;

let dataExample = {
	diagrams: [
	{id: 1, text: "DIAGRAM 01", color: "#999999", bgColor: "#330000"},
	{id: 2, text: "DIAGRAM 02", color: "#999999", bgColor: "#003300"},
	{id: 3, text: "DIAGRAM 03", color: "#999999", bgColor: "#000033"},
	{id: 4, text: "DIAGRAM 04", color: "#999999", bgColor: "#333300"},
	{id: 5, text: "DIAGRAM 05", color: "#999999", bgColor: "#003333"},
	{id: 6, text: "DIAGRAM 06", color: "#999999", bgColor: "#330033"},
	{id: 7, text: "DIAGRAM 07", color: "#999999", bgColor: "#000000"},
	{id: 8, text: "DIAGRAM 08", color: "#999999", bgColor: "#000000"},
	{id: 9, text: "DIAGRAM 09", color: "#999999", bgColor: "#000000"},
	{id: 10, text: "DIAGRAM 10", color: "#999999", bgColor: "#333333"}
	],
	links: [
	{ source: 2, parent:1  },
	{ source: 3, parent:1  },
	{ source: 4, parent:3  },
	{ source: 5, parent:3  },
	{ source: 6, parent:2  },
	{ source: 9, parent:9  },
	{ source: 9, parent:6  }
	],
	config:{
		element: "mycanvas",
		margin: 30,
		padding: 10,
		width: 100,
		height: 50,
		radius: 3,
		hiddenBg: false,
		arrowWidth: 8,
		lineWidth: 2,
		lineDiff: true,
		//lineColor: "#000000", // OPTIONAL
		//hiddenBg: true, // OPTIONAL
		fontFamily: "Arial",
		fontSize: 12,
		autoSize : true,
		mouseEvents:true
	}
};

let chart = new JsDiagramChart(dataExample);

//OTHERS METHODS 

//chart.addZoom(-5);
//chart.resetZoom();
//chart.update(dataExample);