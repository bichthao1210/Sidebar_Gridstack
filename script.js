$(document).ready(function(){
    $("#idPickupMenuBtn").click(function(){
        $(".dropdown-menu").toggle();
    });
   
});

$(document).ready(function() {
    // Bắt sự kiện khi nhấp vào nút "並び替え"
    $("#idSortableBtn").click(function() {
      // Hiển thị icon sắp xếp trên các phần tử
      $(".sortable-list").sortable({
        // Xác định các tùy chọn của chức năng sortable
        axis: "y",  // chỉ cho phép sắp xếp theo trục y
        handle: ".sortable-handle",  // chỉ cho phép sắp xếp bằng icon sắp xếp
        delay: 15,
        update: function(event, ui) {
          // Thực hiện các thao tác khi sắp xếp xong
          // ví dụ: lưu thứ tự các phần tử vào cơ sở dữ liệu
        }
      });

      // Hiển thị icon sắp xếp trên các phần tử
      $(".sortable-handle").show();
    });
  });
  