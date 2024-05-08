<p align="center">
<img width="100" src="https://github.com/work7z/LafTools/blob/dev/modules/web2/public/static/icon.png?raw=true"></img>
<br>
<span style="font-size:20px">LafTools - Thế hệ tiếp theo của hộp công cụ đa năng được thiết kế dành cho lập trình viên
</span>
<!-- <center>
<div style="text-align:center;">
<a target="_blank" href="http://cloud.laftools.cn">Xem trước phiên bản nội bộ của LafTools</a>
</div>
</center> -->
<br><br>
</p>

<i>Note: Trang này được tạo từ nội bộ LafTools.</i> <br/> [English](/docs/en_US/README.md)  |  [简体中文](/docs/zh_CN/README.md)  |  [繁體中文](/docs/zh_HK/README.md)  |  [Deutsch](/docs/de/README.md)  |  [Español](/docs/es/README.md)  |  [Français](/docs/fr/README.md)  |  [日本語](/docs/ja/README.md)  |  [한국어](/docs/ko/README.md) | [More](/docs/) <br/>

# 🔮 Tầm nhìn

LafTools là hộp công cụ mã nguồn mở hoàn toàn, tự lưu trữ, ưu tiên quyền riêng tư được thiết kế dành cho các lập trình viên. Bạn có thể tìm thấy rất nhiều bộ công cụ trên trang web này.

# 💌 Đặc trưng

- FOSS mãi mãi
- Thời gian chạy nhẹ
- Hỗ trợ nền tảng đầy đủ (bao gồm ARMv8)
- Hỗ trợ đầy đủ tương tự GPT
- Tích hợp cao với giao diện người dùng hiệu quả
- Hình ảnh Docker có sẵn và phiên bản di động
- Hỗ trợ phiên bản máy tính để bàn(Planning)
- ...

# 🚀 Chạy nó trên Docker

**Dành cho người dùng TOÀN CẦU:**

```
docker run -e LAFREGION=US -e APPLANG=en_US --name mylaftools -v ~/.laftools-docker:/root/.laftools  -d -p 0.0.0.0:39899:39899 codegentoolbox/laftools-linux-x64:latest
```

**Dành cho người dùng TRUNG QUỐC(国内用户):**

```
docker run -e LAFREGION=CN -e APPLANG=zh_CN --name mylaftools -v ~/.laftools-docker:/root/.laftools -d -p 0.0.0.0:39899:39899 codegentoolbox/laftools-linux-x64:latest
```

**NOTE**:

1. Cổng mặc định được đặt thành 39899, ​​bạn có thể điều chỉnh nếu cần.
2. LafTools sẽ luôn được tự động nâng cấp lên phiên bản mới nhất để bạn có thể tận hưởng các chức năng và sửa lỗi mới nhất.

**Docker Images:**

- [Docker Hub - laftools-linux-x64](https://hub.docker.com/r/codegentoolbox/laftools-linux-x64)
- [Docker Hub - laftools-arm64-x64](https://hub.docker.com/r/codegentoolbox/laftools-arm64-x64)

# 🔗 Trang web trực tuyến

Để sử dụng nhanh các chức năng này, chúng tôi đã triển khai trang web trực tuyến ổn định tại khu vực US và CN để bạn sử dụng. Hầu hết các công cụ đều có sẵn trên các trang web trực tuyến của chúng tôi ngoại trừ một số công cụ dựa trên khả năng cụ thể của hệ điều hành.

- 🇺🇸 cộng hòa Liên bang: [laftools.dev](https://laftools.dev)
- 🇨🇳 Chỉ Trung Quốc đại lục: [laftools.cn](https://laftools.cn)

# 🌠 Xem trước

![](https://github.com/work7z/LafTools/blob/dev/devtools/images/portal-1.png?raw=true)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview-dark.png?raw=true)

# 📡 Giới thiệu về LAF

- `L` -> Linked
- `A` -> Asynchronous
- `F` -> Functional

Về bản chất, LafTools là một bộ công cụ cung cấp một loạt các bộ công cụ được liên kết, không đồng bộ và tuyệt vời.

Hãy yên tâm, dự án này sẽ phát triển theo những cách đáng chú ý và tuyệt vời theo thời gian. Dự án này cần nhiều thời gian hơn, giống như rượu vang, sẽ ngon hơn theo thời gian.

# 🌠 Sự đóng góp

## 1. Thiết lập môi trường hệ thống

Để đơn giản, giả sử bạn đã sao chép kho lưu trữ này sang `C:\Usersjerry\project\laftools-repo` trên Windows hoặc `/Users/jerry/projects/laftools-repo` trên Linux/MacOS, thì bạn nên khai báo env và đặt config bên dưới trong tệp của mình **~/.bashrc* * hoặc đơn giản là thực thi chúng trước khi chạy bất kỳ lệnh nào.

Nếu bạn đang sử dụng HĐH Windows, vui lòng đảm bảo rằng tất cả các lệnh được thực thi trong git-bash, tìm hiểu thêm vui lòng tham khảo [ĐÓNG GÓP](/docs/vi/CONTRIBUTION.md). Ngoài ra, bạn nên tránh sử dụng bất kỳ khoảng trắng hoặc ký tự không phải tiếng Anh nào trong đường dẫn tệp chứa dự án này.

**Env for Windows:**

```bash
git config core.ignorecase false
export LAFTOOLS_ROOT="C:\users\jerry\project\laftools-repo"
export PATH=$PATH:$LAFTOOLS_ROOT\dev\source\windows-bin
```

**Env for Linux/MacOS:**

```bash
export LAFTOOLS_ROOT=/users/jerry/projects/laftools-repo
```

## 2. Biên dịch và chạy

```bash
# cài đặt thư viện toàn cầu cần thiết
npm i -g pnpm ts-node typescript

# cài đặt dự án
cd $LAFTOOLS_ROOT && npm install -S -D --force
cd $LAFTOOLS_ROOT/modules/web2 && npm install -S -D --force
cd $LAFTOOLS_ROOT/devtools/scripts/scan && npm install -S -D --force

# chạy dịch vụ cốt lõi
npm run fe-web

```

## 3. Xây dựng

```bash
cd pipeline
./build-all.sh
```

# 📑 Vật liệu khác

Dưới đây là các tài liệu khác mà bạn có thể xem nếu muốn tìm hiểu thêm chi tiết về dự án này:

- [Câu hỏi thường gặp](/docs/vi/FAQ.md)
- [SỰ ĐÓNG GÓP](/docs/vi/CONTRIBUTION.md)
- [Dành cho nhà phát triển Trung Quốc](/devtools/notes/common/issues.md)

# 💐 Icons

Chúng tôi đánh giá cao những nghệ sĩ tài năng đã cung cấp các biểu tượng đẹp dưới đây:
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by umartvurdu - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by heisenberg_jr - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/fund" title="fund icons">Fund icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/translate" title="translate icons">Translate icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/to-do" title="to do icons">To do icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/timer" title="timer icons">Timer icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/dictionary" title="dictionary icons">Dictionary icons created by Freepik - Flaticon</a>

# 🙏 Sự nhìn nhận

Dự án này sẽ không thể thực hiện được nếu không có các dự án nguồn mở tuyệt vời mà cá nhân tôi muốn bày tỏ lòng biết ơn sâu sắc nhất tới:

1. [Blueprint UI](https://blueprintjs.com/) - a React-based UI toolkit.
1. [CyberChef](https://github.com/gchq/CyberChef/tree/master) - a web app for encryption, encoding, compression and data analysis.
1. [Lodash](https://github.com/lodash/lodash) - a modern JavaScript utility library delivering modularity, performance, & extras.
1. [one-api](https://github.com/songquanpeng/one-api) - an OpenAI key management & redistribution system.

Chắc chắn, có những dự án nguồn mở khác đã mang lại lợi ích và tạo điều kiện thuận lợi cho dự án này, điều mà tôi không thể trình bày chi tiết trong phần này; Nếu không có những dự án này và nỗ lực của những nhà phát triển tài năng này, LafTools sẽ không thể tồn tại được.

# 🪪 License

Dự án này được bảo vệ theo Giấy phép Công cộng GNU Affero, vui lòng xem tệp GIẤY PHÉP để biết thêm chi tiết.
