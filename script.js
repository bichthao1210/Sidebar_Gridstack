
$(document).ready(function(){
    $("#idPickupMenuBtn").click(function(){
        $(".dropdown-menu").toggle();
    });
   
});

$(document).ready(function() {
  let saved = false;
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
    if (saved) {
      // Cập nhật lại các phần tử đã sắp xếp theo thứ tự mới
      originalOrder = $("#sortable-list").children().toArray();
      console.log(originalOrder);
      $("#idPickupMenuBtn").show();
      $("#saveBtn").hide();
      $("#closeBtn").hide();
      $(".sortable-handle").hide();
    } else {
      // Hiển thị hộp thoại xác nhận đóng
      if (confirm("Bạn có chắc chắn muốn đóng?")) {
        // Cập nhật lại các phần tử theo thứ tự ban đầu khi chưa sắp xếp chúng
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
    }
  });
});
