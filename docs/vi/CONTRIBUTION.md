<i>Note: Trang này được tạo từ nội bộ LafTools.</i> <br/> [English](/docs/en_US/CONTRIBUTION.md)  |  [简体中文](/docs/zh_CN/CONTRIBUTION.md)  |  [繁體中文](/docs/zh_HK/CONTRIBUTION.md)  |  [Deutsch](/docs/de/CONTRIBUTION.md)  |  [Español](/docs/es/CONTRIBUTION.md)  |  [Français](/docs/fr/CONTRIBUTION.md)  |  [日本語](/docs/ja/CONTRIBUTION.md)  |  [한국어](/docs/ko/CONTRIBUTION.md) | [More](/docs/) <br/>

## Điều kiện tiên quyết

Trước khi bạn bắt đầu phát triển dự án này, hãy đảm bảo rằng bạn đã cài đặt các SDK và phần mềm sau. Hãy chú ý đến các phiên bản được chỉ định để tránh mọi vấn đề về khả năng tương thích. Một số phiên bản có thể hoạt động nhưng những phiên bản được liệt kê bên dưới được khuyến nghị.

- Node v20.9.0
- Go 1.21.1
- Git Bash(for Windows)
  - Cần chọn 'Use Git and optional Unix....' khi cài đặt.
- Visual Studio Code

Trước khi sửa đổi mã nguồn, bạn nên đọc các phần bên dưới để tìm hiểu kiến ​​trúc và chi tiết kỹ thuật.

## Làm thế nào để khởi động dự án?

Để tránh viết các phần trùng lặp, vui lòng đọc [README.md](../README.md) về phần này, nó bao gồm hướng dẫn đầy đủ về cách cài đặt deps và chạy dự án giao diện người dùng và phụ trợ.

## Làm thế nào để xây dựng dự án?

We fully opened the source project of this project, to build this project, you can trigger below commands in Git-Bash:

```bash
./pipeline/build-all.sh
```

## Tiện ích mở rộng VSCode dành cho nhà phát triển

Nếu bạn định phát triển dự án này, đây là một số tiện ích mở rộng tuyệt vời để bạn kiểm tra xem chúng có hữu ích không. Lưu ý rằng phần này chắc chắn không được quan tâm.

1. Prettier - Code formatter
2. TODO Highlight
3. React
4. Go
5. Golang Tools
6. Tailwind CSS IntelliSense
7. Nano ID generator
8. HTML CSS Support
9. Go To Method
10. go snippets
11. Go Outliner
12. Go Asm
13. Go Doc

## Phát triển && Xây dựng trên VSCode

Nếu bạn định phát triển hoặc xây dựng dự án này, hãy lưu ý rằng bạn nên hoàn thành các bước dưới đây trước, nếu không, bạn sẽ gặp phải các lỗi không thể loại trừ.

1. Đặt đường dẫn thực thi thiết bị đầu cuối của bạn là Git Bash
2. Đặt env trong hệ thống của bạn: LAFTOOLS_ROOT=${Your Actual Project Root}.
3. Cài đặt dlv và gopls cho dịch vụ phụ trợ Go khi bạn khởi chạy nó lần đầu tiên.

## Công nghệ

Để bắt đầu phát triển, vui lòng kiểm tra xem bạn có quen thuộc với các công nghệ chúng tôi sử dụng hay không. Nếu không, không cần phải tìm hiểu tất cả chúng, cũng không sao nếu bạn chỉ quen với công nghệ F/E hoặc B/E, chúng tôi có các bài kiểm tra đơn vị và quy trình yêu cầu kéo để đảm bảo các thay đổi của bạn được thực hiện đúng cách.

Chúng tôi rất mong nhận được sự đóng góp của bạn.

Dành cho phát triển Front-end:

- React
- TypeScript
- BluePrint.js
- Tailwind.css

Dành cho phát triển Back-end:

- Go
- Node.js

Để phát triển máy tính để bàn/máy khách:

- Wails.io
- Electron
- Browser Extension

Để viết tài liệu của chúng tôi một cách chính xác, chúng tôi sẽ không trình bày chi tiết từng chi tiết về thư viện thứ 3 đó ở đây, vui lòng đọc mã nguồn để biết thêm chi tiết.

## Architecture

TODO:

Client (Web, Desktop, IDE Plugin)
<interact with>
Server SIde Go
<interact with>
Server Side Node

## Specifications

### Tools Implementation

To make sure all tools are supported on all UI clients (Web, Desktop, IDE, mobile, etc…), it is recommended that we implement the logic of tools on the server side, not the client side.

For instance, if you want to convert a base64 text into plain text, we should always do the conversion on the Go server side although there’s a quicker way to do it in the browser directly, which takes user experiences and tool compatibility into consideration.

### Node Module Design

You probably noticed there’s a Node.js server module in the architecture. Why should we use Node.js in this software, isn’t it eating our memory? Aren’t we are we pursuing low memory usage?

The reason why we bring Node worker is to :

- Utilize the ecosystem for extra tools logic in Node.js
- Define system menus, extensions, and config dynamically.
- Develop extensions without restarting the Go service.

To avoid the Node worker keeps eating u machine’s memory, we adopt the below strategy:

- Run Node as a sub-process in Go.
- Only run it when there’s a necessity.
- Using WebSocket as the protocol between Go and Node.
- Terminate Node if there’s no new request for it.

For instance, when you click a button to beautify a piece of code, the client will send a request to the server side. Note that the server side is the Go service.

Then, the Go service receives and detects this request depending on the Node service, accordingly, it will:

- Check if Node is still alive.
- If not then just launch it and keep waiting until Node is active.
- Publish a job to the node worker.
- Waiting for the response from the Node worker.

Once the Node worker completes the process, it will return the data to Go(service) via WebSocket protocol.

## Code Style

To have a good software quality and strong international support, please follow the code styles as below:

- Any label, text or message in front-end or back-end project that will be visible to users should be wrriten in English, and be wrapped by Dot function. (Learn more in i18n setup).
- Any comment for your changes should also be written in English.
- Consider performance and extensibility in your code.

## About i18n Config

Please ensure all text is written in English, for instance:

```Typescript
// "leVsK" -> fragment id
// "This is a {0} project, I like {1}" -> main text
// "awesome" -> {0}
// "LafTools" -> {1}
let str: string = Dot("leVsK","This is an {0} project, I like {1}","awesome","LafTools")

console.log(str) // This is an awesome project, I like LafTools
```

## Next Chapter

Great! You’ve learned the architecture and basic technical detail about this project.

Now, you can click below sections to learn more if you’re still interested.

- How to translate texts by using i18n config?
- How to develop and build for front-end project?
- How to develop and build for back-end project?
- How to write my extension?
- How to run unit tests?
- How to build the binary from source code?

For sure, there's also a FAQ link for your reference.

Lastly, we appreciate that you want to contribute to this project. Should you had any issues or bewilderments, feel free to contact us via Github issue at any time.

Thanks and Regards,  
Laftools Team
