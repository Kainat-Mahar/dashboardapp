import React from 'react'

import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

function WidgetBar(props) {
    
  // Create a JSON object to store the chart configurations
const chartConfigs = {
    type: "bar2d", // The chart type
    width: "95%", // Width of the chart
    height: "115", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        bgColor: "#2a2a2a",
        theme: "fusion"
      },
      // Chart Data - from step 2
      data: props.data
    }
  };
    return (
        <div>
            <div className="widgetWrap">
                <div className="widgetTitle">{props.title}</div>
                <div className="widgetValue">
                    <ReactFC {...chartConfigs} />
                </div>
            </div>
        </div>
    )
}
export default WidgetBar
