/**
 *
 * GraphWithBet
 *
 */
import * as React from "react";
import { useEffect, useState } from "react";
import {
  HorizontalGridLines,
  LineSeries,
  XAxis,
  XYPlot,
  YAxis,
} from "react-vis";
import { curveCatmullRom } from "d3-shape";
import { TotemsData } from "types/constants";
// import { GraphicData } from "app/containers/PoolContainer/types";
import moment from "moment";

interface Props {
  totem: string;
  startValue: number;
  betValue: number;
  // data: GraphicData[];
}

const COUNT_OF_TICKS_FIRST_GRAPH = 4;
const COUNT_OF_HORIZONTAL_LINES = 8;

export const GraphWithBet = ({ totem, startValue, betValue }: Props) => {
  /*
  const [maxValue, setMaxValue] = useState(
    Math.max(
      ...data
        .slice(
          data.length - TotemsData[totem].days * COUNT_OF_TICKS_FIRST_GRAPH,
          data.length - 1
        )
        .map((v) => +v.close)
    ) * 1.5 || startValue * 1.5
  );
  const [minValue, setMinValue] = useState(
    Math.min(
      ...data
        .slice(
          data.length - 1 - TotemsData[totem].days * COUNT_OF_TICKS_FIRST_GRAPH,
          data.length - 1
        )
        .map((v) => +v.close)
    ) * 0.5 || startValue * 0.5
  );
  const [stepY, setStepY] = useState(
    (maxValue - minValue) / COUNT_OF_HORIZONTAL_LINES
  );
  const [graphicsData, setGraphicsData] = useState([] as number[]);
  const [tickValues, setTickValues] = useState(
    initTicksValues(minValue, stepY)
  );
  useEffect(() => {
    if (data.length) {
      // console.log(minValue, maxValue, tickValues, stepY, btcPrices);
      const btcPrices = data
        .slice(
          data.length - TotemsData[totem].days * COUNT_OF_TICKS_FIRST_GRAPH,
          data.length - 1
        )
        .map((v) => +v.close);
      const max = Math.max(...btcPrices);
      setMaxValue(max * 1.5);
      const min = Math.min(...btcPrices);
      setMinValue(min * 0.5);
      setStepY((minValue - maxValue) / COUNT_OF_HORIZONTAL_LINES);
      setTickValues(initTicksValues(minValue, stepY));
      const stepX = Math.ceil(TotemsData[totem].days);
      let arrData = [+Math.round(data[data.length - 1].close)] as number[];
      for (let i = 0; i < COUNT_OF_TICKS_FIRST_GRAPH + 1; i++) {
        arrData.push(+Math.round(data[data.length - 1 - i * stepX].close));
      }
      setGraphicsData(arrData.reverse());
    }
  }, [data, totem, maxValue, minValue, stepY]);
  useEffect(() => {}, []);

  const validateBetValue = (v: number) => {
    if (v >= maxValue) {
      return maxValue - 4000;
    }
    if (v <= minValue) {
      return minValue;
    }
    return v;
  };

  return (
    <Div>
      <XYPlot
        width={240}
        height={240}
        margin={{ left: 40, top: 5, bottom: 30, right: 0 }}
      >
        <HorizontalGridLines
          style={{ stroke: "black", opacity: "0.2" }}
          tickValues={tickValues}
        />
        <XAxis
          style={{
            line: { stroke: "black" },
            ticks: {},
            text: { fontWeight: 300, fontSize: "8px" },
          }}
          tickTotal={5}
          tickFormat={(v) =>
            `${moment()
              .subtract(
                TotemsData[totem].days * COUNT_OF_TICKS_FIRST_GRAPH -
                  TotemsData[totem].days * v,
                "d"
              )
              .format("DD.MM")}`
          }
          tickSizeOuter={4}
          tickSizeInner={null}
          top={210}
        />
        <YAxis
          style={{
            line: { stroke: "none" },
            ticks: { stroke: "none" },
            text: { fontSize: "8px" },
          }}
          tickValues={tickValues}
          tickTotal={COUNT_OF_HORIZONTAL_LINES}
        />
        <LineSeries
          curve={curveCatmullRom.alpha(0.5)}
          data={[
            { x: 0, y: graphicsData[0] },
            { x: 1, y: graphicsData[1] },
            { x: 2, y: graphicsData[2] },
            { x: 3, y: graphicsData[3] },
            { x: 4, y: graphicsData[4] }, // one dot is fake. The graph doesn't want to render without this
          ]}
          color={TotemsData[totem].color}
        />
        <LineSeries
          data={[
            { x: 0, y: minValue },
            { x: 4, y: maxValue },
          ]}
          color={TotemsData[totem].color}
          style={{ opacity: 0 }}
        />
      </XYPlot>
      <XYPlot
        height={240}
        width={60}
        margin={{ left: 0, top: 5, bottom: 30, right: 10 }}
      >
        <HorizontalGridLines
          style={{ stroke: "black", opacity: "0.2" }}
          tickValues={tickValues}
        />
        <XAxis
          style={{
            line: { stroke: "black" },
            tick: { stroke: "none" },
            text: { fontWeight: 300, fontSize: "8px" },
          }}
          tickTotal={1}
          tickFormat={(v) =>
            `${moment()
              .add(TotemsData[totem].days * v, "d")
              .format("DD.MM")}`
          }
          tickSizeOuter={4}
          tickSizeInner={null}
          top={210}
        />
        <LineSeries
          curve={curveCatmullRom.alpha(0.5)}
          data={[
            { x: 0, y: graphicsData[graphicsData.length - 1] },
            { x: 1, y: validateBetValue(betValue) },
          ]}
          color={"grey"}
          strokeStyle={"dashed"}
        />
        <LineSeries
          data={[
            { x: 0, y: minValue },
            { x: 1, y: maxValue },
          ]}
          color={TotemsData[totem].color}
          style={{ opacity: 0 }}
        />
      </XYPlot>
    </Div>
  );
  */
  return <div></div>;
};

function initTicksValues(minValue: number, stepY: number): number[] {
  return Array.apply(null, new Array(8)).reduce((acc: any, v, index) => {
    if (!acc[index - 1]) {
      acc.push(minValue);
    } else {
      acc.push(+acc[index - 1] + stepY);
    }
    return acc;
  }, []) as number[];
}
