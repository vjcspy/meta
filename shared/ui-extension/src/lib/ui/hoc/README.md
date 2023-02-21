### HOC Là gì

Tất cả các component sử dụng trong project đều tuần thủ chặc chẽ nguyên tắc truyền dữ liệu từ cha sang con. 
Trong các component tuyệt đối không có các thao tác query dữ liệu hoặc business logic.
Từ đó các component chỉ đơn thuần là render HTML dựa  vào props được truyền vào từ đâu đó phía  trên :)
Làm như thế này code rất clear, dễ quản lý trạng thái render của component, dễ dàng tích hợp hoặc override bởi module khác.
Ngoài ra còn có 1 điểm quan trọng là để tích hợp với UI Framework Manager như storybook :)

=> Do đó, HOC sinh ra là để pass dũ liệu và business logic xuống component.

HOC function hoàn toàn tương thích với các HOC khác ví dụ withRouter from next

#### Cấu trúc của HOC

HOC function sẽ nhận props(nguyên thuỷ) được truyền xuống component. props này được truyền qua <Extension> Có thể là data
từ cha  hoặc trong config layout
HOC sẽ nhận prop này sau đó thực hiện 1 số công việc, giống như hook và sau đó trả về thêm data cho Component(nguyên thuỷ)
