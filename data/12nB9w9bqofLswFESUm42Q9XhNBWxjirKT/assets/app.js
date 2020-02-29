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
         if(typeof container.sides[key2].history[k] != "undefined") {
           datasets[key2].data.push(( container.sides[key2].history[k]*100).toFixed(2));
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
  if(typeof window.txlog == "undefined") {
    window.txlog=[];
  performanceLineChart('dataChart',data.history,'Total OTC',[],data);
  var html="<table class='table table-striped'>";
  html+="<tr><th>(Sub-)Portfolio ID</th><th>CORI (per year)</th><th>OTC Performance</th></tr>";
  $.each(data.sides,(key,side) => {
      console.log(side);
      var i=0;
      var p=0;
      $.each(side.history,function(k,pp) {
          i++;
          p+=pp;
      })
      html+="<tr>";
      html+="<td>"+side.label+"</td>";
      html+="<td>"+side.shares+"</td>";
      html+="<td>"+((p*100)/i).toFixed(2)+"%</td>";
      html+="</tr>";
  });
  html+="</table>";
  $('#assets').html(html);

  window.jsonLoader("./data/chain.json",function(chain) {
    window.txlog=chain;
    console.log("CHAIN2",chain);

    var balance=0;
    rows=[];
    for(txid in chain) {
      var tx=chain[txid];
      let color='#000000';
      if(tx.sender.toLowerCase()=="0xfa21fb716322ee4ebbec6aefb9208a428e0b56f4") {
        balance-=tx.tokens;
        color='#ff0000';
        tx.tokens*=-1;
      } else {
        balance+=tx.tokens;
      }
      rows.push("<tr><td>"+tx.blockNumber+"</td><td><a href='https://etherscan.io/token/0x725b190bc077ffde17cf549aa8ba25e298550b18?a="+tx.sender+"' target='_blank'>"+tx.sender+"</a><br/><a href='https://etherscan.io/token/0x725b190bc077ffde17cf549aa8ba25e298550b18?a="+tx.recipient+"' target='_blank'>"+tx.recipient+"</a></td><td style='text-align:right;color:"+color+"'>"+tx.tokens.toFixed(2)+"</td><td style='text-align:right'>"+balance.toFixed(2)+"</td></tr>");
    }
    $('#coribalance').html(balance.toFixed(2));
    rows=rows.reverse();
    var html="<table class='table table-striped'>";
    html+="<tr><th>Consensus</th><th>From<br/>To</th><th style='text-align:right'>Amount</th><th style='text-align:right'>Balance</th></tr>";
    for(rowid in rows) {
      html+=rows[rowid];
    }
    html+="</table>";
    $('#txs').html(html);
  })

  }
}

window.zeroLoader=function(url,cb) {
  const page = new ZeroFrame();
  console.log("zeroLoad");
  page.cmd("fileGet",url,(data) => {
    cb(JSON.parse(data));
  });
}

window.ajaxLoader=function(url,cb) {
  console.log("Ajax Load");
  $.getJSON(url,cb);
}
window.jsonLoader=window.ajaxLoader;

$(document).ready(()=> {
  console.log("Document Ready");
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

});
