import React from 'react';
import { format } from 'd3-format';
import { scaleLinear, scaleOrdinal, scaleThreshold, scaleQuantile } from '@vx/scale';
import { GlyphStar, GlyphWye, GlyphTriangle, GlyphDiamond } from '@vx/glyph';
import {
  Legend,
  LegendLinear,
  LegendQuantile,
  LegendOrdinal,
  LegendSize,
  LegendThreshold,
  LegendItem,
  LegendLabel,
} from '@vx/legend';
import { ShowProvidedProps } from '../../types';

const oneDecimalFormat = format('.1f');

const sizeScale = scaleLinear<number>({
  domain: [0, 10],
  range: [10, 30],
});

const sizeColorScale = scaleLinear<string>({
  domain: [0, 10],
  range: ['#75fcfc', '#3236b8'],
});

const quantileScale = scaleQuantile<string>({
  domain: [0, 0.15],
  range: ['#eb4d70', '#f19938', '#6ce18b', '#78f6ef', '#9096f8'],
});

const linearScale = scaleLinear<string>({
  domain: [0, 10],
  range: ['#ed4fbb', '#e9a039'],
});

const thresholdScale = scaleThreshold<number, string>({
  domain: [0.01, 0.02, 0.04, 0.06, 0.08, 0.1],
  range: ['#f2f0f7', '#dadaeb', '#bcbddc', '#9e9ac8', '#756bb1', '#54278f'],
});

const ordinalColorScale = scaleOrdinal<string, string>({
  domain: ['a', 'b', 'c', 'd'],
  range: ['#66d981', '#71f5ef', '#4899f1', '#7d81f6'],
});

const ordinalColor2Scale = scaleOrdinal<string, string>({
  domain: ['a', 'b', 'c', 'd'],
  range: ['#fae856', '#f29b38', '#e64357', '#8386f7'],
});

const shapeScale = scaleOrdinal<string, React.FC | React.ReactNode>({
  domain: ['a', 'b', 'c', 'd', 'e'],
  range: [
    <GlyphStar key="a" size={50} top={50 / 6} left={50 / 6} fill="#dd59b8" />,
    <GlyphWye key="b" size={50} top={50 / 6} left={50 / 6} fill="#de6a9a" />,
    <GlyphTriangle key="c" size={50} top={50 / 6} left={50 / 6} fill="#de7d7b" />,
    <GlyphDiamond key="d" size={50} top={50 / 6} left={50 / 6} fill="#df905f" />,
    () => (
      <text key="e" fontSize="12" dy="1em" dx=".33em" fill="#e0a346">
        $
      </text>
    ),
  ],
});

export default ({ width, events = false }: ShowProvidedProps) => {
  if (width < 10) return null;
  return (
    <div className="chart">
      <LegendDemo title="Size">
        <LegendSize<number> scale={sizeScale}>
          {labels =>
            labels.map(label => {
              const size = sizeScale(label.datum);
              const color = sizeColorScale(label.datum);
              return (
                <LegendItem
                  key={`legend-${label.text}-${label.index}`}
                  onClick={() => {
                    if (events) alert(`clicked: ${JSON.stringify(label)}`);
                  }}
                >
                  <svg width={size} height={size} style={{ margin: '5px 0' }}>
                    <circle fill={color} r={size / 2} cx={size / 2} cy={size / 2} />
                  </svg>
                  <LegendLabel align="left" margin="0 4px">
                    {label.text}
                  </LegendLabel>
                </LegendItem>
              );
            })
          }
        </LegendSize>
      </LegendDemo>
      <LegendDemo title="Quantile">
        <LegendQuantile<string> scale={quantileScale}>
          {labels =>
            labels.map((label, i) => {
              const size = 15;
              return (
                <LegendItem
                  key={`legend-${i}`}
                  onClick={() => {
                    if (events) alert(`clicked: ${JSON.stringify(label)}`);
                  }}
                >
                  <svg width={size} height={size} style={{ margin: '2px 0' }}>
                    <circle fill={label.value} r={size / 2} cx={size / 2} cy={size / 2} />
                  </svg>
                  <LegendLabel align="left" margin="0 4px">
                    {label.text}
                  </LegendLabel>
                </LegendItem>
              );
            })
          }
        </LegendQuantile>
      </LegendDemo>
      <LegendDemo title="Linear">
        <LegendLinear
          scale={linearScale}
          labelFormat={(d, i) => (i % 2 === 0 ? oneDecimalFormat(d) : '')}
        >
          {labels =>
            labels.map((label, i) => {
              const size = 15;
              return (
                <LegendItem
                  key={`legend-quantile-${i}`}
                  onClick={() => {
                    if (events) alert(`clicked: ${JSON.stringify(label)}`);
                  }}
                >
                  <svg width={size} height={size} style={{ margin: '2px 0' }}>
                    <circle fill={label.value} r={size / 2} cx={size / 2} cy={size / 2} />
                  </svg>
                  <LegendLabel align="left" margin="0 4px">
                    {label.text}
                  </LegendLabel>
                </LegendItem>
              );
            })
          }
        </LegendLinear>
      </LegendDemo>
      <LegendDemo title="Threshold">
        <LegendThreshold scale={thresholdScale}>
          {labels =>
            labels.reverse().map((label, i) => {
              const size = 15;
              return (
                <LegendItem
                  key={`legend-quantile-${i}`}
                  margin="1px 0"
                  onClick={() => {
                    if (events) alert(`clicked: ${JSON.stringify(label)}`);
                  }}
                >
                  <svg width={size} height={size}>
                    <rect fill={label.value} width={size} height={size} />
                  </svg>
                  <LegendLabel align="left" margin="2px 0 0 10px">
                    {label.text}
                  </LegendLabel>
                </LegendItem>
              );
            })
          }
        </LegendThreshold>
      </LegendDemo>
      <LegendDemo title="Ordinal">
        <LegendOrdinal scale={ordinalColorScale} labelFormat={label => `${label.toUpperCase()}`}>
          {labels => (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              {labels.map((label, i) => {
                const size = 15;
                return (
                  <LegendItem
                    key={`legend-quantile-${i}`}
                    margin="0 5px"
                    onClick={() => {
                      if (events) alert(`clicked: ${JSON.stringify(label)}`);
                    }}
                  >
                    <svg width={size} height={size}>
                      <rect fill={label.value} width={size} height={size} />
                    </svg>
                    <LegendLabel align="left" margin="0 0 0 4px">
                      {label.text}
                    </LegendLabel>
                  </LegendItem>
                );
              })}
            </div>
          )}
        </LegendOrdinal>
      </LegendDemo>
      <LegendDemo title="Custom Legend">
        <Legend<string, React.FC | React.ReactNode, typeof shapeScale> scale={shapeScale}>
          {labels => (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              {labels.map((label, i) => {
                const size = 15;
                const color = ordinalColor2Scale(label.datum);
                const shape = shapeScale(label.datum);
                const isValidElement = React.isValidElement(shape);
                return (
                  <LegendItem
                    key={`legend-quantile-${i}`}
                    margin="0 4px 0 0"
                    flexDirection="column"
                    onClick={() => {
                      const { datum, index } = label;
                      if (events) alert(`clicked: ${JSON.stringify({ datum, color, index })}`);
                    }}
                  >
                    <svg width={size} height={size} style={{ margin: '0 0 8px 0' }}>
                      {!isValidElement &&
                        React.createElement(shape as React.ComponentType<{ fill: string }>, {
                          fill: color,
                        })}
                      {isValidElement && React.cloneElement(shape as React.ReactElement)}
                    </svg>
                    <LegendLabel align="left" margin={0}>
                      {label.text}
                    </LegendLabel>
                  </LegendItem>
                );
              })}
            </div>
          )}
        </Legend>
      </LegendDemo>

      <style jsx>{`
        .chart {
          font-family: arial;
          font-weight: 900;
          background-color: black;
          border-radius: 14px;
          padding: 20px 20px 20px 28px;
          overflow-y: auto;
        }
        .chart h2 {
          margin-left: 10px;
        }
      `}</style>
    </div>
  );
};

function LegendDemo({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="legend">
      <div className="title">{title}</div>
      {children}
      <style jsx>{`
        .legend {
          line-height: 0.9em;
          color: #efefef;
          font-size: 10px;
          font-family: arial;
          padding: 10px 10px;
          float: left;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 8px;
          margin: 5px 5px;
        }
        .title {
          font-size: 12px;
          margin-bottom: 10px;
          font-weight: 100;
        }
      `}</style>
    </div>
  );
}
