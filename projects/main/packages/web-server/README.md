# NextJS Custom Server
Việc sử dụng custom server là yêu cầu bắt buộc khi sử dụng nextJS kết hợp url-rewrite.

Lý do là khi sử dụng [[...slug]] cho tất cả các page thì các request vào next để get static file từ public cũng sẽ bị nhảy vào đây(trường hợp có file thì không sao, nếu không có file thì gây lỗi)

Ngoài ra, custom server còn hỗ trợ việc full page cache sau này.
