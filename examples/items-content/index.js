// @ts-ignore
import GSTC from '../gstc.esm.min.js';

// @ts-ignore
window.row = '';

function onRowClick(row) {
  //@ts-ignore
  window.row = GSTC.api.sourceID(row.id);
  alert('Row ' + GSTC.api.sourceID(row.id) + ' clicked!');
}

const rowsFromDB = [
  {
    id: '1',
    label: 'Row 1',
  },
  {
    id: '2',
    label: 'Row 2',
  },
];

function onItemClick(item) {
  alert('Item ' + GSTC.api.sourceID(item.id) + ' clicked!');
}

function itemLabelContent({ item, vido }) {
  return vido.html`<div class="my-item-content" style="cursor:pointer;" @click=${() =>
    onItemClick(
      item
    )}><span style="width:12px;height:12px;background:white;border-radius:100%;display:inline-block;margin-right:4px;vertical-align:middle;"></span>My HTML content here!</div>`;
}

const itemsFromDB = [
  {
    id: '1',
    label: itemLabelContent,
    rowId: '1',
    time: {
      start: GSTC.api.date('2020-01-01').startOf('day').valueOf(),
      end: GSTC.api.date('2020-01-06').endOf('day').valueOf(),
    },
  },
  {
    id: '2',
    label: 'Default simple text label here',
    rowId: '1',
    time: {
      start: GSTC.api.date('2020-02-01').startOf('day').valueOf(),
      end: GSTC.api.date('2020-02-15').endOf('day').valueOf(),
    },
  },
  {
    id: '3',
    label: itemLabelContent,
    rowId: '2',
    time: {
      start: GSTC.api.date('2020-01-15').startOf('day').valueOf(),
      end: GSTC.api.date('2020-01-20').endOf('day').valueOf(),
    },
  },
];

const columnsFromDB = [
  {
    id: 'id',
    label: 'ID',
    data: ({ row }) => Number(GSTC.api.sourceID(row.id)), // show original id
    sortable: ({ row }) => Number(GSTC.api.sourceID(row.id)), // sort by id converted to number
    width: 80,
    header: {
      content: 'ID',
    },
  },
  {
    id: 'label',
    data: 'label',
    sortable: 'label',
    isHTML: false,
    width: 300,
    header: {
      content: 'Label',
    },
  },
];

/**
 * Convert data from array into GSTC object
 */
function fromArray(array) {
  const GSTCID = GSTC.api.GSTCID; // [IMPORTANT] every id must be wrapped by this function
  const resultObj = {};
  for (const item of array) {
    item.id = GSTCID(item.id);
    if ('rowId' in item) {
      item.rowId = GSTCID(item.rowId);
    }
    if ('parentId' in item) {
      item.parentId = GSTCID(item.parentId);
    }
    resultObj[item.id] = item;
  }
  return resultObj;
}

// Configuration object
const config = {
  // for free key for your domain please visit https://gstc.neuronet.io/free-key
  // if you need commercial license please visit https://gantt-schedule-timeline-calendar.neuronet.io/pricing

  licenseKey:
    '====BEGIN LICENSE KEY====\nXOfH/lnVASM6et4Co473t9jPIvhmQ/l0X3Ewog30VudX6GVkOB0n3oDx42NtADJ8HjYrhfXKSNu5EMRb5KzCLvMt/pu7xugjbvpyI1glE7Ha6E5VZwRpb4AC8T1KBF67FKAgaI7YFeOtPFROSCKrW5la38jbE5fo+q2N6wAfEti8la2ie6/7U2V+SdJPqkm/mLY/JBHdvDHoUduwe4zgqBUYLTNUgX6aKdlhpZPuHfj2SMeB/tcTJfH48rN1mgGkNkAT9ovROwI7ReLrdlHrHmJ1UwZZnAfxAC3ftIjgTEHsd/f+JrjW6t+kL6Ef1tT1eQ2DPFLJlhluTD91AsZMUg==||U2FsdGVkX1/SWWqU9YmxtM0T6Nm5mClKwqTaoF9wgZd9rNw2xs4hnY8Ilv8DZtFyNt92xym3eB6WA605N5llLm0D68EQtU9ci1rTEDopZ1ODzcqtTVSoFEloNPFSfW6LTIC9+2LSVBeeHXoLEQiLYHWihHu10Xll3KsH9iBObDACDm1PT7IV4uWvNpNeuKJc\npY3C5SG+3sHRX1aeMnHlKLhaIsOdw2IexjvMqocVpfRpX4wnsabNA0VJ3k95zUPS3vTtSegeDhwbl6j+/FZcGk9i+gAy6LuetlKuARjPYn2LH5Be3Ah+ggSBPlxf3JW9rtWNdUoFByHTcFlhzlU9HnpnBUrgcVMhCQ7SAjN9h2NMGmCr10Rn4OE0WtelNqYVig7KmENaPvFT+k2I0cYZ4KWwxxsQNKbjEAxJxrzK4HkaczCvyQbzj4Ppxx/0q+Cns44OeyWcwYD/vSaJm4Kptwpr+L4y5BoSO/WeqhSUQQ85nvOhtE0pSH/ZXYo3pqjPdQRfNm6NFeBl2lwTmZUEuw==\n====END LICENSE KEY====',

  list: {
    columns: {
      data: fromArray(columnsFromDB),
    },
    rows: fromArray(rowsFromDB),
  },
  chart: {
    items: fromArray(itemsFromDB),
    grid: {
      onCreate: [(cell, vido) => vido.html`<div class="my-grid-cell">!</div>`],
    },
  },
};

// Generate GSTC state from configuration object
const state = GSTC.api.stateFromConfig(config);

// for testing
// @ts-ignore
window.state = state;

// Mount the component
const app = GSTC({
  element: document.getElementById('gstc'),
  state,
});

//for testing
// @ts-ignore
window.gstc = app;
