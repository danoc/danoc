import React from "react";
import PropTypes from "prop-types";
import { times, groupBy, reduce, chunk } from "lodash";
import { scaleLinear } from "@vx/scale";
import * as styles from "../styles";

type StravaActivityEdge = {
  node: {
    activity: {
      start_date: string;
      distance: number;
    };
  };
};

type HeatmapProps = {
  allStravaActivity: {
    edges: StravaActivityEdge[];
  };
  numWeeksOfRuns: number;
};

const months = [
  "Jan.",
  "Feb.",
  "Mar.",
  "Apr.",
  "May",
  "June",
  "July",
  "Aug.",
  "Sep.",
  "Oct.",
  "Nov.",
  "Dec.",
];

/**
 * Track the highest milage day to use for the color calculation.
 */
let mostMilesInADay = 0;

const normalizeDate = (date: Date) => date.toDateString();

const processRun = (run: StravaActivityEdge) => ({
  date: normalizeDate(new Date(run.node.activity.start_date)),
  miles:
    Math.round(run.node.activity.distance * 0.000621371192237334 * 100) / 100,
});

/**
 * Returns a nicely formatted array of days and how many miles run in that day.
 */
const formatRunsGrid = (
  data: HeatmapProps["allStravaActivity"]["edges"],
  numWeeksOfRuns: HeatmapProps["numWeeksOfRuns"],
) => {
  const runs = data.map(processRun);
  const runsByDate = groupBy(runs, "date");

  const d = new Date();

  // Ensures that Sunday is always in the correct spot.
  const currentDayOfWeek = d.getDay();

  // This is the first date to display
  d.setDate(d.getDate() - numWeeksOfRuns * 7 + (7 - currentDayOfWeek));

  // Return an array of all the days to display.
  return times(numWeeksOfRuns * 7, () => {
    const day = normalizeDate(d);

    d.setDate(d.getDate() + 1);

    const miles = reduce(
      runsByDate[day],
      (sum, activity) => sum + activity.miles,
      0,
    );

    if (miles > mostMilesInADay) {
      mostMilesInADay = miles;
    }

    return {
      // Use `reduce` to add up the miles from an array of runs in one day.
      miles,
      date: day,
    };
  });
};

const gridGap = styles.s2;

const Heatmap = ({ allStravaActivity, numWeeksOfRuns }: HeatmapProps) => {
  const runsByDay = formatRunsGrid(allStravaActivity.edges, numWeeksOfRuns);

  const monthsAlreadyLabeled: Record<string, boolean> = {};

  const runsByWeek = chunk(runsByDay, 7);
  const numberOfWeeksOfRuns = runsByDay.length / 7;

  const colorScale = scaleLinear({
    range: ["#f5f5f5", "#0032a0"],
    domain: [0, mostMilesInADay],
  });

  return (
    <div
      css={{
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gridTemplateRows: "auto 1fr",
        gridTemplateAreas: `'empty months' 'days runs'`,
        gridGap,
        width: `calc(100% + ${gridGap})`,
        left: `-${gridGap}`,
        position: "relative",
        fontSize: "12px",
      }}
    >
      <ul
        css={{
          display: "grid",
          gridGap: "1px",
          gridAutoFlow: "column",
          gridArea: "months",
          gridTemplateColumns: `repeat(${numberOfWeeksOfRuns}, 1fr)`,
          listStyle: "none",
          padding: styles.s0,
          margin: styles.s0,
        }}
      >
        {runsByWeek.map((week, i) => {
          const monthOfLastDayOfWeek =
            months[new Date(week[6].date).getMonth()];

          if (monthsAlreadyLabeled[monthOfLastDayOfWeek]) {
            return null;
          }

          // Set that the month has been labeled. This allows us to skip it
          // on the next iteration of the week.
          monthsAlreadyLabeled[monthOfLastDayOfWeek] = true;

          // We check to see if we're the last column of the grid so that
          // we don't add a label on the last column. If we did, the label
          // text would overflow out of the outer grid.
          const isLastColumn = i === numberOfWeeksOfRuns - 1;

          return (
            <li
              css={{
                gridColumn: isLastColumn
                  ? `${numberOfWeeksOfRuns - 1} / span 2`
                  : `${i + 1}`,
                textAlign: isLastColumn ? "right" : "left",
                minWidth: 0,
              }}
              aria-hidden
              key={monthOfLastDayOfWeek}
            >
              {monthOfLastDayOfWeek}
            </li>
          );
        })}
      </ul>
      <ul
        css={{
          display: "grid",
          gridTemplateRows: `repeat(7, 1fr)`,
          gridGap: "1px",
          gridArea: "days",
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          listStyle: "none",
          padding: styles.s0,
          margin: styles.s0,
        }}
      >
        <li css={{ gridRow: "1/3", alignSelf: "end" }} aria-hidden>
          M
        </li>
        <li css={{ gridRow: "3/5", alignSelf: "end" }} aria-hidden>
          W
        </li>
        <li css={{ gridRow: "6/8", alignSelf: "start" }} aria-hidden>
          F
        </li>
      </ul>
      <ul
        css={{
          display: "grid",
          gridTemplateColumns: `repeat(${numberOfWeeksOfRuns}, 1fr)`,
          gridTemplateRows: `repeat(7, auto)`,
          gridGap: "1px",
          gridAutoFlow: "column",
          gridArea: "runs",
          listStyle: "none",
          padding: styles.s0,
          margin: styles.s0,
        }}
        aria-label="Runs I've done in the past few months"
      >
        {runsByDay.map((day) => {
          const getTooltipDate = (d: Date) =>
            `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;

          const tooltipText = day.miles
            ? `${day.miles} miles on ${getTooltipDate(new Date(day.date))}`
            : undefined;

          return (
            <li
              css={{
                backgroundColor: colorScale(day.miles),
                paddingBottom: "100%",
                height: 0,
              }}
              aria-label={tooltipText}
              title={tooltipText}
              key={day.date}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Heatmap;
