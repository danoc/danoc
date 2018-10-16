import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Measure from "react-measure";
import { Group } from "@vx/group";
import { scaleLinear } from "@vx/scale";
import { HeatmapRect } from "@vx/heatmap";
import { extent, max } from "d3-array";
import { AxisLeft, AxisTop } from "@vx/axis";
import { withTooltip, Tooltip } from "@vx/tooltip";
import { round } from "lodash";
import * as s from "../styles";

const Container = styled.div`
  position: relative;
  margin-left: -${props => props.labelWidth + props.labelMargin}px;
  margin-right: -${props => props.labelWidth + props.labelMargin}px;
`;

const TooltipContainer = styled(Tooltip)`
  background: ${s.white} !important;
  color: ${s.darkGray} !important;
  min-width: 70px;
`;

const TooltipDate = styled.span`
  font-weight: ${500};
  display: block;
  margin-bottom: ${s.s1};
`;

const x = d => d.bin;
const y = d => d.days;
const z = d => d.miles;

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

const handleTooltip = props => {
  const roundedMiles = round(props.miles, 2);
  const dateObj = new Date(props.date);
  const formattedDate = `${months[dateObj.getMonth()]} ${dateObj.getDate()}`;

  props.showTooltip({
    tooltipData: (
      <span>
        <TooltipDate>{formattedDate}</TooltipDate>
        {roundedMiles} mile
        {roundedMiles !== 1 && "s"}
      </span>
    ),
    tooltipLeft: props.left,
    tooltipTop: props.top
  });
};

class Heatmap extends React.Component {
  constructor() {
    super();

    this.state = {
      width: 1,
      hasCalculatedWidth: false
    };
  }

  render() {
    const {
      data,
      showTooltip,
      hideTooltip,
      tooltipData,
      tooltipTop,
      tooltipLeft,
      tooltipOpen,
      labelMargin,
      labelWidth
    } = this.props;

    const { width, hasCalculatedWidth } = this.state;

    const labelTopHeight = 8;
    const heatmapWidth = width;
    const heatmapLeft = labelWidth + labelMargin;
    const heatmapTop = labelTopHeight + labelMargin;

    const numberOfWeeks = data.length;

    const dMax = max(data, d => max(y(d), x));

    const bWidth = heatmapWidth / data.length;
    const bHeight = bWidth;
    const height = bHeight * data[0].days.length;
    const colorMax = max(data, d => max(y(d), z));

    const xScale = scaleLinear({
      range: [0, heatmapWidth - bWidth],
      domain: extent(data, x)
    });

    const yScale = scaleLinear({
      range: [height - heatmapTop, 0],
      domain: [0, dMax]
    });

    const colorScale = scaleLinear({
      range: ["#f5f5f5", "#0032a0"],
      domain: [0, colorMax]
    });

    const opacityScale = scaleLinear({
      range: [1, 1],
      domain: [0, colorMax]
    });

    return (
      <Measure
        onResize={contentRect => {
          this.setState({
            width: contentRect && contentRect.entry.width,
            hasCalculatedWidth: true
          });
        }}
      >
        {({ measureRef }) => (
          <div ref={measureRef}>
            {hasCalculatedWidth && (
              <Container labelWidth={labelWidth} labelMargin={labelMargin}>
                {tooltipOpen && (
                  <TooltipContainer top={tooltipTop} left={tooltipLeft}>
                    {tooltipData}
                  </TooltipContainer>
                )}

                <svg
                  width={width + (labelWidth + labelMargin) * 2}
                  height={height + heatmapTop}
                >
                  <AxisTop
                    left={heatmapLeft}
                    scale={xScale}
                    tickLength={0}
                    hideAxisLine
                    tickFormat={d => {
                      const week = new Date();
                      week.setDate(
                        week.getDate() - (numberOfWeeks - 1 - d) * 7
                      );
                      return months[week.getMonth()];
                    }}
                    tickLabelProps={() => ({
                      fill: s.darkGray,
                      textAnchor: "start",
                      fontSize: 10,
                      dy: "1em"
                    })}
                  />
                  <Group top={heatmapTop}>
                    <AxisLeft
                      left={8}
                      top={bHeight}
                      scale={yScale}
                      tickFormat={t => {
                        const days = ["", "M", "", "W", "", "F", ""];
                        return days[7 - t];
                      }}
                      numTicks={3}
                      strokeWidth={0}
                      hideAxisLine
                      hideTicks
                      tickLabelProps={() => ({
                        fill: s.darkGray,
                        textAnchor: "start",
                        fontSize: 10,
                        dy: "1em"
                      })}
                    />
                    <HeatmapRect
                      x={heatmapLeft}
                      data={data}
                      xScale={xScale}
                      yScale={yScale}
                      colorScale={colorScale}
                      opacityScale={opacityScale}
                      binWidth={bWidth}
                      binHeight={bHeight}
                      gap={1}
                      bins={y}
                      count={z}
                      onMouseMove={d => () => {
                        handleTooltip({
                          left: xScale(d.datumIndex),
                          top: yScale(d.index) - bHeight * 2.5,
                          miles: d.bin.miles,
                          date: d.bin.date,
                          showTooltip
                        });
                      }}
                      onMouseLeave={() => () => {
                        hideTooltip();
                      }}
                    />
                  </Group>
                </svg>
              </Container>
            )}
          </div>
        )}
      </Measure>
    );
  }
}

Heatmap.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  labelMargin: PropTypes.number.isRequired,
  labelWidth: PropTypes.number.isRequired,
  showTooltip: PropTypes.func.isRequired,
  hideTooltip: PropTypes.func.isRequired,
  tooltipData: PropTypes.node,
  tooltipLeft: PropTypes.number,
  tooltipTop: PropTypes.number,
  tooltipOpen: PropTypes.bool.isRequired
};

Heatmap.defaultProps = {
  tooltipData: null,
  tooltipTop: 0,
  tooltipLeft: 0
};

export default withTooltip(Heatmap);
