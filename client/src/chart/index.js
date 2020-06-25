/* line chart */
function lineChart(dataDates) {

   google.charts.load("current", { packages: ["corechart", "line"] });
   google.charts.setOnLoadCallback(drawChart);

   function drawChart() {
      const data = new google.visualization.DataTable();
      data.addColumn("string", "Date");
      data.addColumn("number", "Frequency");

      data.addRows(dataDates.map(item => [item.letter, item.frequency]));


      const options = {
         title: "Frequency Rate for Each Date",
         width: "100%",
         height: 400,
         hAxis: { title: "Date" },
         vAxis: { title: "Frequency" },
         legend: { position: "none" },
         animation: { duration: 1000, startup: true, easing: "in" }
      };

      const chart = new google.visualization.LineChart(document.getElementById('chart-line'));
      chart.draw(data, options);
   }
};


/* Pie Chart */
function pieChart(apiData) {
   google.charts.load("current", { packages: ["corechart"] });
   google.charts.setOnLoadCallback(drawChart);

   function drawChart() {
      let rawData = apiData.map(item => [item.letter, item.frequency]);
      rawData.unshift(['Subject', 'Frequency']);

      let data = google.visualization.arrayToDataTable(rawData);
      var options = {
         title: 'Frequency for each subject',
         width: 700,
         height: 400,
         backgroundColor: "transparent",
         is3D: true
      };

      const chart = new google.visualization.PieChart(document.getElementById('pie-chart'));
      chart.draw(data, options);
   }
}


/* Bar Chart */
function barChart(apiData) {
   google.charts.load("current", { packages: ["bar"] });
   google.charts.setOnLoadCallback(drawChart);

   function drawChart() {
      let rawData = apiData.map((item, index) => [item.letter, item.frequency]);
      rawData.unshift(["Letter", "Frequency"]);

      let data = new google.visualization.arrayToDataTable(rawData);
      let option = {
         title: "Frequency for each subject",
         width: "100%",
         height: 400,
         legend: { position: "none" },
         hAxis: { title: "Subject" },
         vAxis: { title: "Frequency" },
         animation: { duration: 1000, startup: true, easing: "in" }
      };

      const chart = new google.visualization.ColumnChart(document.getElementById('bar-chart'));
      chart.draw(data, option);
   }
}

export { lineChart, pieChart, barChart };

