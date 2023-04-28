$(document).ready(function(){
    // Ẩn menu dropdown khi click chuột bên ngoài
    $(document).click(function(event) {
      if (!$(event.target).closest('#idPickupMenuBtn').length) {
          $('.dropdown-menu').hide();
      }
  });

  // Ẩn menu dropdown khi click vào nút 3 chấm
  $('#idPickupMenuBtn .fa-ellipsis-v').click(function() {
      $('.dropdown-menu').hide();
  });

  // Hiển thị menu dropdown khi click vào nút pickup
  $("#idPickupMenuBtn").click(function(){
      $(".dropdown-menu").toggle();
  });
   
});


$(document).ready(function() {
  let saved = true; // Đặt giá trị ban đầu là true để không hiển thị hộp thoại xác nhận đóng
  let originalOrder = [];

  // Bắt sự kiện khi nhấp vào nút "並び替え"
  $("#idSortableBtn").click(function() {
    // Hiển thị icon sắp xếp trên các phần tử
    let elementArray = [];
    const element = document.querySelector('#sortable-list');
    const sortable = Sortable.create(element, {
      animation: 150,
      handle: ".sortable-handle",
      onUpdate: function(evt) {
        elementArray = [];
        evt.to.childNodes.forEach(element => {
          elementArray.push(element.innerText);
        });
        console.log(elementArray);
        saved = false; // Cập nhật lại giá trị saved khi có thay đổi trên danh sách
      },
    });

    // Ẩn dấu ba chấm và hiển thị hai nút "保存" và "X"
    $("#idPickupMenuBtn").hide();
    $("#saveBtn").show();
    $("#closeBtn").show();

    // Lưu lại trạng thái ban đầu của các phần tử trước khi sắp xếp
    originalOrder = $("#sortable-list").children().toArray();
    console.log(originalOrder);

    // Hiển thị icon sắp xếp trên các phần tử
    $(".sortable-handle").show();
  });

  // Bắt sự kiện khi nhấp vào nút "保存"
  $("#saveBtn").click(function() {
    // Thực hiện lưu dữ liệu ở đây
    saved = true;
    alert("Đã lưu thành công!");
    $("#idPickupMenuBtn").show();
    $("#saveBtn").hide();
    $("#closeBtn").hide();
    $(".sortable-handle").hide();
  });

  $("#closeBtn").click(function() {
    // Kiểm tra xem đã sắp xếp các phần tử chưa
    if (JSON.stringify(originalOrder) !== JSON.stringify($("#sortable-list").children().toArray())) {
      if (!saved) { // Nếu có thay đổi trên danh sách
        // Hiển thị hộp thoại xác nhận đóng
        if (confirm("Bạn có chắc chắn muốn đóng?")) {
          // Cập nhật lại các phần tử theo thứ tự ban đầu khi chưa sắp xếp chúng
          $("#sortable-list").empty();
          originalOrder.forEach(element => {
            $("#sortable-list").append(element);
          });
          console.log(originalOrder);
          saved = true; // Cập nhật lại giá trị saved sau khi đã đóng form
          $("#idPickupMenuBtn").show();
          $("#saveBtn").hide();
          $("#closeBtn").hide();
          $(".sortable-handle").hide();
        }
      } else {
        // Đóng form và phục hồi trạng thái ban đầu của danh sách
        sortable.destroy();
          $("#sortable-list").empty();
        originalOrder.forEach(element => {
          $("#sortable-list").append(element);
        }); 
        console.log(originalOrder);
        $("#idPickupMenuBtn").show();
        $("#saveBtn").hide();
        $("#closeBtn").hide();
        $(".sortable-handle").hide();
      }
    } else {
      // Nếu chưa sắp xếp, đóng form ngay lập tức
      $("#idPickupMenuBtn").show();
      $("#saveBtn").hide();
      $("#closeBtn").hide();
      $(".sortable-handle").hide();
    }
  });
});

// ẩn hiện sidebar
document.getElementById("close-sidebar").addEventListener("click", function () {
  document.getElementById("indexpickupmenu").style.width = "50px";
  $("#idPickupMenuBtn").hide();
  $("#close-sidebar").hide();
  $("#titleMenu.tv-resize").hide();
  var spans = document.querySelectorAll("#sortable-list span.tv-resize");
  for (var i = 0; i < spans.length; i++) {
    spans[i].setAttribute("data-initial-value", spans[i].textContent);
    spans[i].textContent = i + 1;
    spans[i].classList.add("minimized"); // Thêm lớp mới vào các item
  }
  $("#show-sidebar").show();
});

document.getElementById("show-sidebar").addEventListener("click", function () {
  document.getElementById("indexpickupmenu").style.width = "300px";
  $("#idPickupMenuBtn").show();
  $("#close-sidebar").show();
  $(".tv-resize").show();
  $("#show-sidebar").hide();
  var spans = document.querySelectorAll("#sortable-list span.tv-resize");
  for (var i = 0; i < spans.length; i++) {
    var initialValue = spans[i].getAttribute("data-initial-value");
    if (initialValue) {
      spans[i].textContent = initialValue;
      spans[i].classList.remove("minimized"); // Xóa lớp mới khỏi các item
    }
  }
});

//Gridstack
$(function () {
  let options = {
    animate: true,
    verticalMargin: 10,
    width: 12,
    draggable: {
      handle: '.panel-heading, header', 
      scroll: false, 
    },  
  };
  
  $('.grid-stack').gridstack(options);


  
});


// Graph

// Lấy dữ liệu từ đối tượng
// const data = {
//   status: 200,
//   respons: {
//     item1: {
//       data: [
//         { time: "2023-04-17 00:00:00", value: "8" },
//         { time: "2023-04-17 00:02:00", value: "8" },
//       ],
//       yAxisID: "y-axes-0",
//       ymin: 0,
//       ymax: 100,
//       Point: 2,
//       TimeFormat: "HH:mm",
//       type: "line",
//       name: "DI3.Count",
//       unit: "",
//       color: "#335744",
//     },
//     item2: {
//       data: [
//         { time: "2023-04-17 00:00:00", value: "8" },
//         { time: "2023-04-17 00:02:00", value: "8" },
//       ],
//       yAxisID: "y-axes-1",
//       ymin: 0,
//       ymax: 100,
//       Point: 1,
//       TimeFormat: "HH:mm",
//       type: "bar",
//       name: "Power hour",
//       unit: "kWh",
//       color: "#b51b44",
//     },
//   },
// };

// const chartData = {
//   datasets: [],
//   labels: [],
// };

// for (const key in data.respons) {
//   const item = data.respons[key];
//   if (item.data.length > 0) {
//     const dataset = {
//       label: item.name,
//       yAxisID: item.yAxisID,
//       data: item.data.map((d) => d.value),
//       type: item.type,
//       backgroundColor: item.color,
//       borderColor: item.color,
//       fill: item.type === "line" ? false : undefined,
//     };
//     chartData.datasets.push(dataset);
//     if (!chartData.labels.length) {
//       chartData.labels = item.data.map((d) => moment(d.time).format("HH:mm"));
//     }
//   }
// }

// // Sử dụng Chart.js để vẽ đồ thị
// const ctx = document.getElementById("myChart").getContext("2d");

// const myChart = new Chart(ctx, {
//   type: "bar",
//   data: chartData,
//   options: {
//     plugins: {
//       tooltip: {
//         enabled: false,
//       },
//     },
//     responsive: true,
//     legend: {
//       position: "top",
//       align: "end",
//     },
//     scales: {
//       yAxes: Object.keys(data.respons).map((key) => ({
//         yAxisID: data.respons[key].yAxisID,
//         id: data.respons[key].yAxisID,
//         type: "linear",
//         position: data.respons[key].yAxisID === "y-axes-0" ? "left" : "right",
//         gridLines: {
//           display: data.respons[key].yAxisID === "y-axes-0" ? true : false,
//         },
//         ticks: {
//           beginAtZero: true,
//           min: data.respons[key].ymin,
//           max: data.respons[key].ymax,
//           callback: function (value, index, values) {
//             return value.toFixed(data.respons[key].Point);
//           },
//         },
//       })),
//     },
//     datasetOptions: Object.keys(data.respons).reduce((acc, key) => {
//       if (data.respons[key].type === "bar") {
//         acc["bar"] = {
//           yAxisID: data.respons[key].yAxisID,
//           backgroundColor: data.respons[key].color,
//           borderColor: data.respons[key].color,
//         };
//       }
//       return acc;
//     }, {}),
//   },
// });


// function updateChartData() {
//   // Tạo dữ liệu dummy để test
//   const item1Data = [
//     {
//       time: moment().format("YYYY-MM-DD HH:mm:ss"),
//       value: Math.random() * 100,
//     },
//     {
//       time: moment().add(2, "minutes").format("YYYY-MM-DD HH:mm:ss"),
//       value: Math.random() * 100,
//     },
//   ];
//   const item2Data = [
//     {
//       time: moment().format("YYYY-MM-DD HH:mm:ss"),
//       value: Math.random() * 150,
//     },
//     {
//       time: moment().add(2, "minutes").format("YYYY-MM-DD HH:mm:ss"),
//       value: Math.random() * 150,
//     },
//   ];

//   // Cập nhật dữ liệu cho biểu đồ
//   if (chartData.datasets.length >= 1) {
//     chartData.datasets[0].data = item1Data.map((d) => d.value);
//     chartData.labels = item1Data.map((d) => moment(d.time).format("HH:mm"));
//   }
//   if (chartData.datasets.length >= 2) {
//     chartData.datasets[1].data = item2Data.map((d) => d.value);
//     if (!chartData.labels.length) {
//       chartData.labels = item2Data.map((d) => d.time);
//     }
//   }

//   // Vẽ lại biểu đồ với dữ liệu mới
//   myChart.update();

// }


// // Cập nhật dữ liệu và vẽ đồ thị sau mỗi 2 phút
// setInterval(updateChartData, 2 * 60 * 1000);

const url = 'https://qtucgrun66.execute-api.ap-northeast-1.amazonaws.com/v1/api-hlrgwl-web?path=pickup&type=getRealtimeData&pickupNo=1';
      const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiaGFrYXJ1MDEiLCJ1c2VyX25hbWUiOiJoYWthcnUwMiIsInVzZXJfdHlwZSI6MSwiZXhwIjoxNzE0MTE1MjM4LCJpYXQiOjE2ODI1NzkyMzh9.dg5vkF66NOsYs1o9VFr38v1VyjkvWWJB3wDHk1ieyP8';
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      axios.get(url, config)
      .then((response) => {
        const filteredData = response.data.Respons.filter(
          (item) => item.cardType === 3
        );
        
        // check cardType and set chart type accordingly
        let chartType = 'line';
        if (filteredData[0].cardType === 0) {
          chartType = 'line';
        } else if (filteredData[0].cardType === 1) {
          chartType = 'bar';
        }
      
        // get the data for each output in the outputData array
        const dataset1 = {
          label: filteredData[0].outputData[0].outputName,
          data: filteredData[0].outputData[0].data.map((dataItem) => dataItem.Value),
          backgroundColor: filteredData[0].outputData[0].backColor,
          borderColor: filteredData[0].outputData[0].foreColor,
          borderWidth: 1,
          fill: false, // thêm fill: false để tắt chức năng tô màu cho khu vực dưới đường biểu đồ
          spanGaps: true, // thêm spanGaps: true để cho phép vẽ đường thẳng nối các điểm của biểu đồ
        };
      
        const dataset2 = {
          label: filteredData[0].outputData[1].outputName,
          data: filteredData[0].outputData[1].data,
          backgroundColor: filteredData[0].outputData[1].backColor,
          borderColor: filteredData[0].outputData[1].foreColor,
          borderWidth: 1,
          fill: false, // thêm fill: false để tắt chức năng tô màu cho khu vực dưới đường biểu đồ
          spanGaps: true, // thêm spanGaps: true để cho phép vẽ đường thẳng nối các điểm của biểu đồ
        };
        
        // create a new chart instance
        const ctx = document.getElementById("myChart").getContext("2d");
        const myChart = new Chart(ctx, {
          type: chartType, // set the chart type based on the cardType
          data: {
            labels: filteredData[0].outputData[0].data.map((dataItem) => moment(dataItem.time).format("HH:mm")),
            datasets: [dataset1, dataset2],
          },
          options: {
            scales: {
              yAxes: [
                {
                  ticks: {
                    min: -50,
                    max: 50,
                    beginAtZero: true,
                  },
                },
              ],
            },            
          },
        });
      })
      .catch((error) => {
        console.error(error);
      });