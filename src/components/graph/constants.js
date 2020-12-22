const GRAPH_CONFIG = {
  'crosshair-x': {
    'plot-label': {
      text: 'Value: %v',
    },
    'scale-label': {
      text: '%v',
      transform: {
        type: 'date',
        all: '%d %M %y',
      },
    },
  },
  'scale-x': {
    item: {
      angle: -30,
    },
    'min-value': 1579640400000,
    step: 'month',
    transform: {
      type: 'date',
      all: '%M',
      item: {
        visible: false,
      },
    },
  },
  plotarea: {
    margin: 'dynamic',
  },
};

export default GRAPH_CONFIG;
