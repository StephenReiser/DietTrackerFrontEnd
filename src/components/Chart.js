// import React from 'react';
// import Chart from 'react-chartjs';
// import 'chartjs-plugin-annotation';

// const chartData = {
//     labels: ['Jan', 'Feb', 'Mar'],
//     datasets: [10,20,30]
// }
import React from "react";
var Chart = require("chart.js");

class Layout extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
      const node = this.node;
      let labelSet = []
      let dataSet = []
      for (let i = 0; i < this.props.sickArray.length; i ++) {
          labelSet.push(this.props.sickArray[i][0])
          dataSet.push(this.props.sickArray[i][1])
      }
      var myChart = new Chart(node, {
        type: "bar",
        data: {
          labels: labelSet,
          datasets: [
            {
              label: "Top Foods that make you Sick!",
              data: dataSet,
              // backgroundColor: [
              //   "rgba(255, 99, 132, 0.2)",
              //   "rgba(54, 162, 235, 0.2)",
              //   "rgba(255, 206, 86, 0.2)"
              // ]
            }
          ]
        }
      });
}

render() {
    return (
      <div>
        <canvas
          style={{ width: 800, height: 300 }}
          ref={node => (this.node = node)}
        />
      </div>
    );
  }
}

export default Layout;