const performanceLineChart=function(id,data,title,subdata,container) {
  const ctx = document.getElementById(id).getContext('2d');
  const datasets = {};
  const colors = ['#5BC0EB', '#FDE74C', '#9BC53D', '#C3423F', '#404E4D', '#D4AA7D', '#EFD09E', '#D2D8B3'];
  const labels = [];

  let lastPosition = 'right';
  var i=0;

  const color = colors.pop();
  datasets["total"] = {};
  datasets["total"].label = title;
  datasets["total"].fill = false;
  datasets["total"].data = [];
  //datasets[key].yAxisID = 'y-axis-' + key;
  datasets["total"].backgroundColor = color;
  datasets["total"].borderColor = color;

  subdata.forEach(function(skey) {
       i++;
       let key=skey.field;
       if (typeof datasets[key] === 'undefined') {
         if (lastPosition === 'right') {
           lastPosition = 'left';
         } else {
           lastPosition = 'right';
         }
         var keylabel = key;

         const color = colors.pop();
         datasets[key] = {};
         datasets[key].label = skey.label;
         datasets[key].fill = false;
         datasets[key].data = [];
         //datasets[key].yAxisID = 'y-axis-' + key;
         datasets[key].backgroundColor = color;
         datasets[key].borderColor = color;
         datasets[key].scaleY = {
           type: 'linear',
           display: true,
           position: lastPosition,
           id: 'y-axis-' + key
         };
       }
  });

  for (const k in data) {
      datasets["total"].data.push((data[k]*100).toFixed(2));
      labels.push(moment(new Date((k.substr(4)*86400000)-86400000)).format("M-D"));

      subdata.forEach(function(skey) {
        let key2=skey.field;
         if(typeof container[key2][k] != "undefined") {
           datasets[key2].data.push((container[key2][k]*100).toFixed(2));
         } else {
           datasets[key2].data.push("-");
         }

      });
  }

  const chartDatasets = [];
  const yaxis = [];
  for (const key in datasets) {
    const value = datasets[key];
      chartDatasets.push(value);
      yaxis.push(value.scaleY);
  }

  const myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
      datasets: chartDatasets,
      labels: labels
    },
    options: {
      responsive: true,
      hoverMode: 'index',
      stacked: false,
      title: {
        display: false,
        text: 'Performance'
      },
      legend: {
          display: true,
          position: "bottom"
      },
      scales: {
        // yAxes: yaxis,
        xAxes: [{
          display: true,
          scaleLabel: {
            display: false,
            labelString: 'Date'
          }
        }]
      },
      pan: {
        enabled: true,
        mode: 'xy'
      },
      zoom: {
        enabled: true,
        mode: 'x'
      }
    }
  });
}

const multiPerformanceLineChart=function(id,data,title) {
  const ctx = document.getElementById(id).getContext('2d');
  const datasets = {};
  const colors = ['#5BC0EB', '#FDE74C', '#9BC53D', '#C3423F', '#404E4D', '#D4AA7D', '#EFD09E', '#D2D8B3'];
  const labels = [];

  let lastPosition = 'right';
  var i=0;

  const color = colors.pop();
  datasets["total"] = {};
  datasets["total"].label = title;
  datasets["total"].fill = false;
  datasets["total"].data = [];
  //datasets[key].yAxisID = 'y-axis-' + key;
  datasets["total"].backgroundColor = color;
  datasets["total"].borderColor = color;


  for (const k in data) {
      datasets["total"].data.push((data[k]).toFixed(4)*100);
      labels.push(new Date((k.substr(4)*86400000)-86400000).toLocaleString());
  }

  const chartDatasets = [];
  const yaxis = [];
  for (const key in datasets) {
    const value = datasets[key];
      chartDatasets.push(value);
      yaxis.push(value.scaleY);
  }

  const myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
      datasets: chartDatasets,
      labels: labels
    },
    options: {
      responsive: true,
      hoverMode: 'index',
      stacked: false,
      title: {
        display: false,
        text: 'Performance'
      },
      scales: {
        // yAxes: yaxis,
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Date'
          }
        }]
      },
      pan: {
        enabled: true,
        mode: 'xy'
      },
      zoom: {
        enabled: true,
        mode: 'x'
      }
    }
  });
}


const updatePerformance=function(data) {
  if(typeof data.timestamp == "undefined") return;
  $('#totalSupply').html(data.marked.bid);
  $('#totalSupplyC').html(data.marked.ask);
  $('#nominalValue').html(data.marked.nominal.toFixed(4));
  $('#otg').html((data.marked.otg*100).toFixed(1));
  $('#otc').html((data.marked.otc*100).toFixed(1));
  $('#timeStamp').html(moment(new Date(data.timestamp)).format());
  $('#consens').html(data.marked.consensus);
  console.log("DATA3",data);
  $('.blockNumber').html(data.marked.consensus);
  performanceLineChart('dataChart',data.bid,'Generation Side (Bid)',[{field:'ask',label:'Demand Side (Ask)'}],data);
  window.jsonLoader("./data/trunches.json",(data) => {
      $('#trunches_cnt').html(data.length);
      data = data.reverse();
      $.each(data,function(i,tx) {
        if($('#trunch_'+tx.blockNumber).length==0) {
            let html ="";
            html+="<tr id='trunch_"+tx.blockNumber+"'>";
            html+="<td>"+tx.blockNumber+"</td>";
            html+="<td><a href='/epiktet.bit/'>"+tx.recipient+"</a></td>";
            html+="<td>"+tx.tokens+"</td>";
            html+="<td class='text-truncated'><a href='./"+tx.transactionHash+".html'>"+tx.transactionHash.substr(0,12)+"...</a></td>";
            html+="</tr>"
            $('#assetList').append(html);
        }

      });
  });

}

window.zeroLoader=function(url,cb) {
  const page = new ZeroFrame();
  page.cmd("fileGet",url,(data) => {
    cb(JSON.parse(data));
  });
}

window.ajaxLoader=function(url,cb) {
  $.getJSON(url,cb);
}
window.jsonLoader=window.ajaxLoader;

$(document).ready(()=> {

  if(typeof ZeroFrame != "undefined") {
      const page = new ZeroFrame();
      page.cmd("fileGet","./data/performance.json",(data) => {
       window.jsonLoader=window.zeroLoader;
 	     updatePerformance(JSON.parse(data));
     });
   }
   $.getJSON("./data/performance.json",function(data) {
      if((data!=null)&&(typeof data != "undefined")) {
          window.jsonLoader=window.ajaxLoader;
          updatePerformance(data);
      }
   });
   function buy() {
                 AirSwap.Trader.render({
                     env: 'sandbox',
                     mode: 'buy',
                     token: '0x725b190bc077ffde17cf549aa8ba25e298550b18',
                     amount: 5 * (10 ** 4),
                     onCancel: function () {
                         console.info('Trade was canceled.');
                     },
                     onComplete: function(transactionId) {
                         console.info('Trade complete. Thank you, come again.');
                     }
                 }, 'body');
               }

  function sell() {
                 AirSwap.Trader.render({
                     env: 'sandbox',
                     mode: 'sell',
                     token: '0x725b190bc077ffde17cf549aa8ba25e298550b18',
                     onCancel: function () {
                         console.info('Trade was canceled.');
                     },
                     onComplete: function(transactionId) {
                         console.info('Trade complete. Thank you, come again.');
                     }
                 }, 'body');
  }
  $('#buybtn').click(buy);
  $('#sellbtn').click(sell);
});
