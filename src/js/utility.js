

// Create a client instance
client = null;

// TODO: Check to be sure
var eur_e = 0.24;    // EUR per kw/h
var eur_w = 0.0011;  // EUR per liter
var eur_g = 0.80025; // EUR per m3


var t_t = 0.0;
var t_e = 0.0;
var t_w = 0.0;
var t_g = 0.0;

var chart_et, chart_s;
var dataPoints_e = [];
var dataPoints_t = [];

var dataPoints_stt  = [], dataPoints_ste  = [], dataPoints_stw  = [], dataPoints_stg = [];
var dataPoints_syt  = [], dataPoints_sye  = [], dataPoints_syw  = [], dataPoints_syg = [];
var dataPoints_stee = [], dataPoints_stew = [], dataPoints_steg = [];
var dataPoints_syee = [], dataPoints_syew = [], dataPoints_syeg = [];
            
function onMainLoad() {

    // for( i=1; i<=24; i++ ) {
        // dataPoints_stt.push({ x : i, y : null });
        // dataPoints_ste.push({ x : i, y : null });
        // dataPoints_stw.push({ x : i, y : null });
        // dataPoints_stg.push({ x : i, y : null });
        // dataPoints_syt.push({ x : i, y : null });
        // dataPoints_sye.push({ x : i, y : null });
        // dataPoints_syw.push({ x : i, y : null });
        // dataPoints_syg.push({ x : i, y : null });
    // }        

    chart_et = new CanvasJS.Chart("chartContainer_et", {
        title:{
//            text: "Multiple y - axis"
        },
        axisX: {
            labelFontSize: 12,
            labelFontColor: "lightgray"
        },
        axisY2: {
            includeZero: false,
            labelFontSize: 14,
//            title: "Electricity",
            lineColor: "orange",
            titleFontColor: "orange",
            labelFontColor: "orange",
            labelFontWeight: "bold"
        },
        axisY: {        
//            title: "Primary Y - Axis"
            labelFontSize: 14,
            lineColor: "#86B402",
            titleFontColor: "#86B402",
            labelFontColor: "#86B402",
            labelFontWeight: "bold"
        },
        backgroundColor: "transparent",
        legend : {
            fontColor: "lightgray",
            fontSize: 11,
        },
        data: [
        {
            type: "spline",
            lineThickness: 4,
            color: "#86B402",
            showInLegend: "true",
            legendText: "Temperature",
            toolTipContent: "T: {y} &deg;C",            
            dataPoints: dataPoints_t
        },
        {
            type: "spline",
            lineThickness: 4,
            color: "orange",
            showInLegend: "true",
            legendText: "Electricity",
            toolTipContent: "E: {y} kW/h",
            axisYType: "secondary",
            dataPoints: dataPoints_e
        }
        ]
    });
    
    var t_t = 0.0, t_e = 0.0, t_w = 0.0, t_g = 0.0;
    chart_st = new CanvasJS.Chart("chartContainer_st",
    {
      // animationEnabled: true,
      title:{
          text: "Today, T: " + y_t + ", E: " + y_e + ", W: " + y_w + ", G: " + y_g 
      },
//      theme: "theme2",
//      colorSet:  "colorSet3",
      axisX: {
        //valueFormatString: "####",
        interval: 1
        //intervalType: "hour"
      
      },
      axisY:{
//        interlacedColor: "rgb(255,250,250)",
//        gridColor: "#FFBFD5"

       // title: "Litres",
        //lineColor: "#369EAD",
        //titleFontColor: "#369EAD",
        //labelFontColor: "#369EAD"
      },
      axisY2:[{
//        title: "kW/h",
        logarithmic: false,
        lineColor: "orange",
        titleFontColor: "orange",
        labelFontColor: "orange"
      }, 
      {
//        title: "oC",
        lineColor: "#86B402",
        titleFontColor: "#86B402",
        labelFontColor: "#86B402"
      }],
      data: [
      {        
        type: "stackedColumn",
        fillOpacity: .6,
        legendText: "Water",
        showInLegend: "true",
//        color: "#ADDFFF",
        toolTipContent: "W: {y} L",
        dataPoints: dataPoints_stw
      },
      {        
        type: "stackedColumn",
        fillOpacity: .6,
        legendText: "Gas",
        showInLegend: "true",
        toolTipContent: "G: {y} L",
        dataPoints: dataPoints_stg
      },
      {        
        type: "spline", // TODO: Needs hour-ordered publishing
        // type: "scatter",
        color: "orange",
        legendText: "Electricity",
        showInLegend: "true",
        axisYType: "secondary",
        toolTipContent: "E: {y} kW/h",
        dataPoints: dataPoints_ste
      },
      {        
        type: "spline", // TODO: Needs hour-ordered publishing
        // type: "scatter",
        legendText: "Temperature",
        showInLegend: "true",
        axisYType: "secondary",
        axisYIndex: 1,
        toolTipContent: "T: {y} &deg;C",
        dataPoints: dataPoints_stt
      } 
      ]
    });
    
    var y_t = 0.0, y_e = 0.0, y_w = 0.0, y_g = 0.0;
    chart_sy = new CanvasJS.Chart("chartContainer_sy",
    {
      // animationEnabled: true,
      title:{
          text: "Today, T: " + y_t + ", E: " + y_e + ", W: " + y_w + ", G: " + y_g 
      },
//      theme: "theme2",
//      colorSet:  "colorSet3",
      axisX: {
        //valueFormatString: "####",
        interval: 1
        //intervalType: "hour"
      
      },
      axisY:{
//        interlacedColor: "rgb(255,250,250)",
//        gridColor: "#FFBFD5"

       // title: "Litres",
        //lineColor: "#369EAD",
        //titleFontColor: "#369EAD",
        //labelFontColor: "#369EAD"
      },
      axisY2:[{
//        title: "kW/h",
        logarithmic: false,
        lineColor: "orange",
        titleFontColor: "orange",
        labelFontColor: "orange"
      }, 
      {
//        title: "oC",
        lineColor: "#86B402",
        titleFontColor: "#86B402",
        labelFontColor: "#86B402"
      }],
      data: [
      {        
        type: "stackedColumn",
        fillOpacity: .6,
        legendText: "Water",
        showInLegend: "true",
//        color: "#ADDFFF",
        toolTipContent: "W: {y} L",
        dataPoints: dataPoints_syw
      },
        {        
        type: "stackedColumn",
        fillOpacity: .6,
        legendText: "Gas",
        showInLegend: "true",
        toolTipContent: "G: {y} L",
        dataPoints: dataPoints_syg
      },
      {        
        type: "spline", // TODO: Needs hour-ordered publishing
        // type: "scatter",
        color: "orange",
        legendText: "Electricity",
        showInLegend: "true",
        axisYType: "secondary",
        toolTipContent: "E: {y} kW/h",
        dataPoints: dataPoints_sye
      },
      {        
        type: "spline", // TODO: Needs hour-ordered publishing
        // type: "scatter",
        legendText: "Temperature",
        showInLegend: "true",
        axisYType: "secondary",
        axisYIndex: 1,
        toolTipContent: "T: {y} &deg;C",
        dataPoints: dataPoints_syt
      } 
      ]
    });
    
    var te_e = 0.0, te_w = 0.0, te_g = 0.0;
    chart_ste = new CanvasJS.Chart("chartContainer_ste",
    {
      title:{
          text: "Today Eur, E: " + te_e + ", W: " + te_w + ", G: " + te_g 
      },
      toolTip: {
        shared: true,
        content: function(e){
          var str = "<div align='right'>";
          var total = 0;
          var str3;
          var str2;
          for (var i = 0; i < e.entries.length; i++){
            var  str1 = "<span style= 'color:"+e.entries[i].dataSeries.color + "'> " + e.entries[i].dataSeries.name + "</span>: &euro; <strong>"+  (+(e.entries[i].dataPoint.y)).toFixed(2) + "</strong><br/>" ; 
            total += e.entries[i].dataPoint.y;
            str = str.concat(str1);
          }
          hr = parseInt(e.entries[0].dataPoint.x);
          hr_1 = hr - 1;
          str2 = "<span style = 'color:DodgerBlue; '><strong>Hour: " + hr_1 + "-" + hr + "</strong></span><br/>";
          // str3 = "<span style = 'color:Tomato '>Total: </span><strong> &euro; " + total.toFixed(2) + "</strong><br/></div/>";
          str3 = "Total: <strong> &euro; " + total.toFixed(2) + "</strong><br/></div/>";
          
          return (str2.concat(str)).concat(str3);
        }
      }, 
      axisX: {
        interval: 1
      },
      data: [
      {        
        type: "stackedColumn",
        fillOpacity: .6,
        name: "Water",
        legendText: name,
        showInLegend: "true",
        // toolTipContent: "W: {y} &euro;",
        dataPoints: dataPoints_stew
      },
      {        
        type: "stackedColumn",
        fillOpacity: .6,
        name: "Gas",
        legendText: name,
        showInLegend: "true",
        // toolTipContent: "G: {y} &euro;",
        dataPoints: dataPoints_steg
      },
      {        
        type: "stackedColumn",
        fillOpacity: .6,
        color: "orange",
        name: "Elect.",
        legendText: "Electricity",
        showInLegend: "true",
        // toolTipContent: "E: {y} &euro;",
        dataPoints: dataPoints_stee
      } 
      ]
    });

    var ye_e = 0.0, ye_w = 0.0, ye_g = 0.0;
    chart_sye = new CanvasJS.Chart("chartContainer_sye",
    {
      title:{
          text: "Yesterday Eur, E: " + ye_e + ", W: " + ye_w + ", G: " + ye_g 
      },
      toolTip: {
        shared: true,
        content: function(e){
          var str = "<div align='right'>";
          var total = 0;
          var str3;
          var str2;
          for (var i = 0; i < e.entries.length; i++){
            var  str1 = "<span style= 'color:"+e.entries[i].dataSeries.color + "'> " + e.entries[i].dataSeries.name + "</span>: &euro; <strong>"+  (+(e.entries[i].dataPoint.y)).toFixed(2) + "</strong><br/>" ; 
            total += e.entries[i].dataPoint.y;
            str = str.concat(str1);
          }
          hr = parseInt(e.entries[0].dataPoint.x);
          hr_1 = hr - 1;
          str2 = "<span style = 'color:DodgerBlue; '><strong>Hour: " + hr_1 + "-" + hr + "</strong></span><br/>";
          str3 = "<span style = 'color:Tomato '>Total: </span><strong> &euro; " + total.toFixed(2) + "</strong><br/></div/>";
          
          return (str2.concat(str)).concat(str3);
        }
      },      
      axisX: {
        interval: 1
      },
      data: [
      {        
        type: "stackedColumn",
        fillOpacity: .6,
        name: "Water",
        legendText: name,
        showInLegend: "true",
        // toolTipContent: "W: {y} &euro;",
        dataPoints: dataPoints_syew
      },
      {        
        type: "stackedColumn",
        fillOpacity: .6,
        name: "Gas",
        legendText: name,
        showInLegend: "true",
        // toolTipContent: "G: {y} &euro;",
        dataPoints: dataPoints_syeg
      },
      {        
        type: "stackedColumn",
        fillOpacity: .6,
        color: "orange",
        name: "Elec.",
        legendText: "Electricity",
        showInLegend: "true",
        // toolTipContent: "E: {y} &euro;",
        dataPoints: dataPoints_syee
      } 
      ]
    });
    
  connect();
}

function connect() {
  var hostname = "192.168.2.100";
  var port = "9001";
  var clientId = "Home MQTT "+ (new Date().valueOf()).toString(); 

  var path = "/ws";
  var user = "";
  var pass = "";
  var keepAlive = Number("60");
  var timeout = 3;
  var ssl = false;
  var cleanSession = false;
  var lastWillTopic = ""; // TODO
  var lastWillQos = 0;
  var lastWillRetain = true;
  var lastWillMessage = "";

  if(path.length > 0) { client = new Paho.MQTT.Client(hostname, Number(port), path, clientId); }
  else                { client = new Paho.MQTT.Client(hostname, Number(port),       clientId); }
  
  console.info('Connecting to Server: Hostname: ', hostname, '. Port: ', port, '. Path: ', client.path, '. Client ID: ', clientId);

  // Set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;

  var options = {
    invocationContext: {host: hostname, port: port, path: client.path, clientId: clientId},
    timeout: timeout,
    keepAliveInterval:keepAlive,
    cleanSession: cleanSession,
    useSSL: ssl,
    onSuccess: onConnect,
    onFailure: onFail
  };

  if( user.length > 0 ) { options.userName = user; }
  if( pass.length > 0 ) { options.password = pass; }

  if( lastWillTopic.length > 0 ) {
    var lastWillMessage = new Paho.MQTT.Message(lastWillMessage);
    lastWillMessage.destinationName = lastWillTopic;
    lastWillMessage.qos = lastWillQos;
    lastWillMessage.retained = lastWillRetain;
    options.willMessage = lastWillMessage;
  }

  // Connect the client
  client.connect(options);
  var statusSpan = document.getElementById("connectionStatus");
  statusSpan.innerHTML = 'Connecting...';
}          

function disconnect() {
  console.info('Disconnecting from Server');
  client.disconnect();
  var statusSpan = document.getElementById("connectionStatus");
  statusSpan.innerHTML = 'Connection - Disconnected.';
}

function publish() {
  var topic = document.getElementById("publishTopicInput").value;
  var qos = document.getElementById("publishQosInput").value;
  var message = document.getElementById("publishMessageInput").value;
  var retain = document.getElementById("publishRetainInput").checked
  console.info('Publishing Message: Topic: ', topic, '. QoS: ' + qos + '. Message: ', message);
  message = new Paho.MQTT.Message(message);
  message.destinationName = topic;
  message.qos = Number(qos);
  message.retained = retain;
  client.send(message);
}

function subscribe() {
  var topic = "power_meter/processed/#";
  var qos   = 0;   
  console.info('Subscribing to: Topic: ', topic, '. QoS: ', qos);
  client.subscribe(topic, {qos: Number(qos)});
  client.subscribe("power_meter/logger/#", 0);
}

// Callback Handlers --------------------------------------------------------------
function onConnect(context) {    
  var statusSpan = document.getElementById("connectionStatus");
  statusSpan.innerHTML = "Connected to: " 
                       + context.invocationContext.host 
                       + ':' 
                       + context.invocationContext.port 
                       + context.invocationContext.path 
                       + ' as ' 
                       + context.invocationContext.clientId;
                       
  subscribe();
}    

function onFail(context) {
  console.log("Failed to connect");
  var statusSpan = document.getElementById("connectionStatus");
  statusSpan.innerHTML = "Failed to connect: " + context.errorMessage;
}

function onConnectionLost( responseObject ) {
  if( responseObject.errorCode !== 0 ) {
    // console.log("Connection Lost: " + responseObject.errorMessage);
    var statusSpan = document.getElementById("connectionStatus");
    statusSpan.innerHTML = "Connection Lost";
  }
}

function onMessageArrived(message) {
  // console.log('Message Recieved: Topic: ', message.destinationName, '. Payload: ', message.payloadString, '. QoS: ', message.qos);
  var msg_time = new Date();
  updateKnown(message, msg_time);
}

// Functions ---------------------------------------------------------------------------
// Just in case someone sends html
function safe_tags_regex(str) { 
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Used with formatting the time below
function addZero(x, n) {
  while (x.toString().length < n) { x = "0" + x; }
  return x;
}

function get_time_str( d ) {
  var h = addZero(d.getHours(), 2);
  var m = addZero(d.getMinutes(), 2);
  var s = addZero(d.getSeconds(), 2);
  var ms = addZero(d.getMilliseconds(), 3);
  // return d.toDateString() + " - " + h + ":" + m + ":" + s + " - " + ms;
  return h + ":" + m + ":" + s + " - " + ms;
}

function copyToYesterday() {
    console.log("Copying...");
    // for( i=0; i<4; i++ ) {
        // chart_sy.options.data[i].dataPoints = Array.from(chart_st.options.data[i].dataPoints);
        // chart_sy.options.data[i].dataPoints = JSON.parse(JSON.stringify(chart_st.options.data[i].dataPoints));
        // chart_sy.options.data[i].dataPoints = chart_st.options.data[i].dataPoints.slice(0);
        // chart_st.options.data[i].dataPoints = []; // TODO: Clears both st and sy arays
    // }
    
    for( i=0; i < dataPoints_stt.length; i++ ) {            
        dataPoints_syt[i] = { x : dataPoints_stt[i].x, y : dataPoints_stt[i].y };
        dataPoints_sye[i] = { x : dataPoints_ste[i].x, y : dataPoints_ste[i].y };
        dataPoints_syw[i] = { x : dataPoints_stw[i].x, y : dataPoints_stw[i].y };
        dataPoints_syg[i] = { x : dataPoints_stg[i].x, y : dataPoints_stg[i].y };

        dataPoints_syee[i] = { x : dataPoints_stee[i].x, y : dataPoints_stee[i].y };
        dataPoints_syew[i] = { x : dataPoints_stew[i].x, y : dataPoints_stew[i].y };
        dataPoints_syeg[i] = { x : dataPoints_steg[i].x, y : dataPoints_steg[i].y };

    }
    for( i=0; i < dataPoints_stt.length; i++ ) {
        if( dataPoints_stt[i].x != 1 ) { // Clear data but leave hour 1
            dataPoints_stt[i]  = { x : i, y : null };
            dataPoints_ste[i]  = { x : i, y : null };
            dataPoints_stw[i]  = { x : i, y : null };
            dataPoints_stg[i]  = { x : i, y : null };
            
            dataPoints_stee[i] = { x : i, y : null };
            dataPoints_stew[i] = { x : i, y : null };
            dataPoints_steg[i] = { x : i, y : null };                
        }
    }
    console.log("Done");
}

// Used in sorting the datapoints
function compareDataPointX( dataPoint1, dataPoint2 ) {
		return dataPoint1.x - dataPoint2.x;
}

function sortDataPointsX( chart, series ) {
    for( i=0; i<series; i++ ) {
        chart.options.data[i].dataPoints.sort( compareDataPointX );
    }
}

var onLoadUpdate = 0; // Count the first 24 updates on load/refresh

function updateStatistics( hour, data ) {
    console.log( hour + ": " + data );
    var str = data.replace(/\'/g, "\""); // TODO: change ' with " 
    var obj = JSON.parse( str );
       
    var c_hour = new Date().getHours();
    var c_minutes = new Date().getMinutes();  

    // Note: c_hour can be a little off (< hour during update), so allow for some minutes difference
    if( c_hour >= hour || ((hour - c_hour == 1) && c_minutes > 55) || c_hour == 0 ) { // c_hour=0, hour=24
        if( hour == 1 & onLoadUpdate == 24 ) { copyToYesterday(); } // Should not copy during loading/refreshing the page when data is re-played
        // In order to have all hours on the x-axis
        dataPoints_syt.push ({ x : hour, y : null });  
        dataPoints_syee.push({ x : hour, y : null });  
        // Update energy
        dataPoints_stt.push({ x : hour, y : obj.T }); 
        dataPoints_ste.push({ x : hour, y : obj.E });
        dataPoints_stw.push({ x : hour, y : obj.W });
        dataPoints_stg.push({ x : hour, y : obj.G * 1000 });
        // Update Euro
        dataPoints_stee.push({ x : hour, y : obj.E * eur_e });
        dataPoints_stew.push({ x : hour, y : obj.W * eur_w });
        dataPoints_steg.push({ x : hour, y : obj.G * eur_g });
                
    } else if( onLoadUpdate < 24 ) { // Yesterday, should happen only on loading/refreshing the page
        // In order to have all hours on the x-axis
        dataPoints_stt.push ({ x : hour, y : null }); 
        dataPoints_stee.push({ x : hour, y : null });
        // Update energy
        dataPoints_syt.push({ x : hour, y : obj.T }); 
        dataPoints_sye.push({ x : hour, y : obj.E });
        dataPoints_syw.push({ x : hour, y : obj.W });
        dataPoints_syg.push({ x : hour, y : obj.G * 1000 });
        // Update Euro
        dataPoints_syee.push({ x : hour, y : obj.E * eur_e });
        dataPoints_syew.push({ x : hour, y : obj.W * eur_w });
        dataPoints_syeg.push({ x : hour, y : obj.G * eur_g });
    }    

    if( onLoadUpdate <= 24 ) { onLoadUpdate += 1; }
    
    sortDataPointsX(chart_st,  4);
    sortDataPointsX(chart_ste, 3);
    sortDataPointsX(chart_sy,  4);
    sortDataPointsX(chart_sye, 3);
    
    chart_st.render();    
    chart_ste.render();    
    chart_sy.render();
    chart_sye.render();    
}

function updateKnown(message, msg_time) {
    var msg_value = parseFloat(message.payloadString);
    var str_msg_time = get_time_str(msg_time);

    msg_time.setSeconds(msg_time.getSeconds());   // for chart update
    
    switch (message.destinationName)
    {        
      case "power_meter/processed/temperature":
        msg_value = +msg_value.toFixed(2);
        document.getElementById("row_t").innerHTML = msg_value +  " &deg;C"; 
        document.getElementById("upd_t").innerHTML = str_msg_time;
        dataPoints_t.push({ x : msg_time, y : msg_value });
        // if (dataPoints_t.length  >  3 ) { dataPoints_t.shift(); }
        chart_et.render();
        break;
                
      case "power_meter/processed/electricity":
        msg_value = +msg_value.toFixed(3);
        document.getElementById("row_e").innerHTML = msg_value +  " kw/h"; 
        document.getElementById("upd_e").innerHTML = str_msg_time;
        dataPoints_e.push({ x : msg_time, y : msg_value });
        // if (dataPoints_e.length  >  10 ) { dataPoints_e.shift(); }
        chart_et.render();
        break;
                
      case "power_meter/processed/water":
        // msg_value = +msg_value.toFixed(3);
        document.getElementById("row_w").innerHTML = msg_value +  " lit"; 
        document.getElementById("upd_w").innerHTML = str_msg_time;
        break;
                
      case "power_meter/processed/gas":
        msg_value = +msg_value.toFixed(2);
        document.getElementById("row_g").innerHTML = msg_value +  " m&sup3;"; 
        document.getElementById("upd_g").innerHTML = str_msg_time;
        break;
  
      case "power_meter/processed/0":
        updateStatistics( 24, message.payloadString );
        break;
  
      case "power_meter/processed/1":
        updateStatistics( 1, message.payloadString );
        break;
  
      case "power_meter/processed/2":
        updateStatistics( 2, message.payloadString );
        break;
  
      case "power_meter/processed/3":
        updateStatistics( 3, message.payloadString );
        break;
  
      case "power_meter/processed/4":
        updateStatistics( 4, message.payloadString );
        break;
  
      case "power_meter/processed/5":
        updateStatistics( 5, message.payloadString );
        break;
  
      case "power_meter/processed/6":
        updateStatistics( 6, message.payloadString );
        break;
  
      case "power_meter/processed/7":
        updateStatistics( 7, message.payloadString );
        break;
  
      case "power_meter/processed/8":
        updateStatistics( 8, message.payloadString );
        break;
  
      case "power_meter/processed/9":
        updateStatistics( 9, message.payloadString );
        break;
  
      case "power_meter/processed/10":
        updateStatistics( 10, message.payloadString );
        break;
  
      case "power_meter/processed/11":
        updateStatistics( 11, message.payloadString );
        break;
  
      case "power_meter/processed/12":
        updateStatistics( 12, message.payloadString );
        break;
  
      case "power_meter/processed/13":
        updateStatistics( 13, message.payloadString );
        break;
  
      case "power_meter/processed/14":
        updateStatistics( 14, message.payloadString );
        break;
  
      case "power_meter/processed/15":
        updateStatistics( 15, message.payloadString );
        break;
  
      case "power_meter/processed/16":
        updateStatistics( 16, message.payloadString );
        break;
  
      case "power_meter/processed/17":
        updateStatistics( 17, message.payloadString );
        break;
  
      case "power_meter/processed/18":
        updateStatistics( 18, message.payloadString );
        break;

      case "power_meter/processed/19":
        updateStatistics( 19, message.payloadString );
        break;
  
      case "power_meter/processed/20":
        updateStatistics( 20, message.payloadString );
        break;

      case "power_meter/processed/21":
        updateStatistics( 21, message.payloadString );
        break;

      case "power_meter/processed/22":
        updateStatistics( 22, message.payloadString );
        break;

      case "power_meter/processed/23":
        updateStatistics( 23, message.payloadString );
        break;

      case "power_meter/processed/today":
        console.log( "today: ", message.payloadString );
        // TODO ----------------------------------------------------------------------
        var str = message.payloadString.replace(/\'/g, "\""); // TODO: change ' with " 
        var obj = JSON.parse( str );
        chart_st.options.title.text = "Today, T: " + obj.T + ", E: " + obj.E + ", W: " + obj.W + ", G: " + (+(obj.G * 1000).toFixed(3));
        chart_st.render();
        
        // TODO: To be calculated at the server
        e_e = +(obj.E * eur_e).toFixed(2);
        e_w = +(obj.W * eur_w).toFixed(2);
        e_g = +(obj.G * eur_g).toFixed(2);
        e_tot = +(e_e + e_w + e_g).toFixed(2);
        chart_ste.options.title.text = "Today Eur, E: " + e_e + ", W: " + e_w + ", G: " + e_g + ", Total: " + e_tot;
        chart_ste.render();
        break;

      case "power_meter/processed/yesterday":
        console.log( "yesterday: ", message.payloadString );
        var str = message.payloadString.replace(/\'/g, "\""); // TODO: change ' with " 
        var obj = JSON.parse( str );
        chart_sy.options.title.text = "Yesterday, T: " + obj.T + ", E: " + obj.E + ", W: " + obj.W + ", G: " + (+(obj.G * 1000).toFixed(3));
        chart_sy.render();

        // TODO: To be calculated at the server
        e_e = +(obj.E * eur_e).toFixed(2);
        e_w = +(obj.W * eur_w).toFixed(2);
        e_g = +(obj.G * eur_g).toFixed(2);
        e_tot = +(e_e + e_w + e_g).toFixed(2);
        chart_sye.options.title.text = "Yesterday Eur, E: " + e_e + ", W: " + e_w + ", G: " + e_g + ", Total: " + e_tot;
        chart_sye.render();
        break;

      case "power_meter/logger/status":
        document.getElementById("connectionStatus").innerHTML = message.payloadString;
        console.log( "status: ", message.payloadString );
        break;
  
//      default: 
//        console.log( "Message not processed" );        
    }
//    console.log( msg_value );
}

//function f(arg) { document.getElementById("row_t").cells[3].innerHTML = arg }
   