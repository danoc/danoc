import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Measure from "react-measure";
import { Group } from "@vx/group";
import { scaleLinear } from "@vx/scale";
import { HeatmapRect } from "@vx/heatmap";
import { extent, min, max } from "d3-array";
import { AxisLeft, AxisTop } from "@vx/axis";
import { withTooltip, Tooltip } from "@vx/tooltip";
import { round } from "lodash";
import * as s from "../styles";

const Container = styled.div`
  position: relative;
  margin-left: -${props => props.labelWidth + props.labelMargin}px;
  margin-right: -${props => props.labelWidth + props.labelMargin}px;
`;

const StyledTooltip = styled(Tooltip)`
  background: ${s.white} !important;
  color: ${s.darkGray} !important;
`;

const x = d => d.bin;
const y = d => d.days;
const z = d => d.miles;

const handleTooltip = ({ showTooltip, miles, left, top }) => {
  showTooltip({
    tooltipData: miles,
    tooltipLeft: left,
    tooltipTop: top
  });
};

class Heatmap extends React.Component {
  constructor() {
    super();

    this.state = {
      width: 578
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

    if (!this.state.width) return null;

    const labelTopHeight = 8;
    const heatmapWidth = this.state.width;
    const heatmapLeft = labelWidth + labelMargin;
    const heatmapTop = labelTopHeight + labelMargin;

    const numberOfWeeks = data.length;

    const dMin = min(data, d => min(y(d), x));
    const dMax = max(data, d => max(y(d), x));
    const dStep = dMax / data[0].days.length;
    const bWidth = heatmapWidth / data.length;
    const bHeight = bWidth;
    const height = bHeight * data[0].days.length;
    const colorMax = max(data, d => max(y(d), z));

    const xScale = scaleLinear({
      range: [0, heatmapWidth - bWidth],
      domain: extent(data, x)
    });

    const yScale = scaleLinear({
      range: [height, 0],
      domain: [dMin, dMax + 1]
    });

    const colorScale = scaleLinear({
      range: ["#f5f5f5", "#0032a0"],
      domain: [0, colorMax]
    });

    const opacityScale = scaleLinear({
      range: [1, 1],
      domain: [0, colorMax]
    });

    const toolTipMiles = round(tooltipData, 2);

    return (
      <Measure
        onResize={contentRect => {
          this.setState({ width: contentRect && contentRect.entry.width });
        }}
      >
        {({ measureRef }) => (
          <div ref={measureRef}>
            <Container labelWidth={labelWidth} labelMargin={labelMargin}>
              {tooltipOpen && (
                <StyledTooltip top={tooltipTop} left={tooltipLeft}>
                  {toolTipMiles} mile{toolTipMiles !== 1 && "s"}
                </StyledTooltip>
              )}

              <svg
                width={this.state.width + (labelWidth + labelMargin) * 2}
                height={height + heatmapTop}
              >
                <AxisLeft
                  left={8}
                  top={heatmapTop + bHeight / 2}
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
                    dy: "0.5em"
                  })}
                />
                <AxisTop
                  left={heatmapLeft}
                  scale={xScale}
                  numTicks={6}
                  tickLength={0}
                  hideAxisLine
                  tickFormat={d => {
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
                    const week = new Date();
                    week.setDate(week.getDate() - (numberOfWeeks - 1 - d) * 7);
                    return months[week.getMonth()];
                  }}
                  tickLabelProps={() => ({
                    fill: s.darkGray,
                    textAnchor: "start",
                    fontSize: 10,
                    dy: "1em"
                  })}
                />
                <Group top={heatmapTop} left={heatmapLeft}>
                  <HeatmapRect
                    data={data}
                    xScale={xScale}
                    yScale={yScale}
                    colorScale={colorScale}
                    opacityScale={opacityScale}
                    binWidth={bWidth}
                    binHeight={bHeight}
                    step={dStep}
                    gap={1}
                    bin={x}
                    bins={y}
                    count={z}
                    onMouseMove={d => () => {
                      handleTooltip({
                        left: xScale(d.datumIndex),
                        top: yScale(d.index) - bHeight * 1.5,
                        miles: d.bin.miles,
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
  tooltipData: PropTypes.number,
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
