import { times, groupBy, reduce, chunk } from "lodash";
import { scaleLinear } from "@vx/scale";
import s from "./index.module.css";

export interface Run {
  startDate: string;
  distance: number;
}

interface HeatmapProps {
  runs: Run[];
  numWeeksOfRuns: number;
}

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

const processRun = (run: Run) => ({
  date: normalizeDate(new Date(run.startDate)),
  miles: Math.round(run.distance * 0.000621371192237334 * 100) / 100,
});

/**
 * Returns a nicely formatted array of days and how many miles run in that day.
 */
const formatRunsGrid = (
  runs: Run[],
  numWeeksOfRuns: HeatmapProps["numWeeksOfRuns"],
) => {
  const processedRuns = runs.map(processRun);
  const runsByDate = groupBy(processedRuns, "date");

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

const gridGap = "0.5rem";

const Heatmap = ({ runs, numWeeksOfRuns }: HeatmapProps) => {
  const runsByDay = formatRunsGrid(runs, numWeeksOfRuns);

  const monthsAlreadyLabeled: Record<string, boolean> = {};

  const runsByWeek = chunk(runsByDay, 7);
  const numberOfWeeksOfRuns = runsByDay.length / 7;

  const colorScale = scaleLinear({
    range: ["#f5f5f5", "#0032a0"],
    domain: [0, mostMilesInADay],
  });

  return (
    <div
      className={`grid relative text-xs ${s.root}`}
      style={{
        width: `calc(100% + ${gridGap})`,
        left: `-${gridGap}`,
        gap: gridGap,
      }}
    >
      <ul
        className={`grid gap-px grid-flow-col ${s.months}`}
        style={{
          gridTemplateColumns: `repeat(${numberOfWeeksOfRuns}, 1fr)`,
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
              style={{
                gridColumn: isLastColumn
                  ? `${numberOfWeeksOfRuns - 1} / span 2`
                  : `${i + 1}`,
              }}
              className={isLastColumn ? "text-right" : "text-left"}
              aria-hidden
              key={monthOfLastDayOfWeek}
            >
              {monthOfLastDayOfWeek}
            </li>
          );
        })}
      </ul>
      <ul className={`grid gap-px absolute top-0 right-0 bottom-0 ${s.days}`}>
        <li className="self-end" style={{ gridRow: "1/3" }} aria-hidden>
          M
        </li>
        <li className="self-end" style={{ gridRow: "3/5" }} aria-hidden>
          W
        </li>
        <li className="self-start" style={{ gridRow: "6/8" }} aria-hidden>
          F
        </li>
      </ul>
      <ul
        className={`grid gap-px grid-flow-col ${s.heatmap}`}
        style={{
          gridTemplateColumns: `repeat(${numberOfWeeksOfRuns}, 1fr)`,
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
              className={`h-0 ${s.day}`}
              style={{
                backgroundColor: colorScale(day.miles),
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
