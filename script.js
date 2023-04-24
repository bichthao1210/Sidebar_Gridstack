
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
