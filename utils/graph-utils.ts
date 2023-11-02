import {
    metricTooltip,
    segmenationReverseMap,
    segmentationTooltip,
    slateSizeTooltip,
    summaryMetricReverseMap,
    summaryMetricTooltip,
  } from "@/config/metrics"
  import { MetricType } from "@/types/enums"
  
  export const getTooltip = (
    selectorName: string,
    selectedValues,
    metricType: MetricType
  ) => {
    const selectedValue = selectedValues[selectorName]
  
    switch (selectorName) {
      case "Metric":
        const metricMessage =
          metricType == MetricType.EVALUATION_METRIC
            ? metricTooltip[selectedValue]
            : summaryMetricTooltip[summaryMetricReverseMap[selectedValue]]
        return metricMessage
      case "Segmentation":
        return segmentationTooltip[segmenationReverseMap[selectedValue]]
      case "Slate Size":
        return slateSizeTooltip[selectedValue]
    }
  }
  