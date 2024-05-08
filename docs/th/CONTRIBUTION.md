<i>Note: หน้านี้สร้างขึ้นจาก LafTools ภายใน</i> <br/> [English](/docs/en_US/CONTRIBUTION.md)  |  [简体中文](/docs/zh_CN/CONTRIBUTION.md)  |  [繁體中文](/docs/zh_HK/CONTRIBUTION.md)  |  [Deutsch](/docs/de/CONTRIBUTION.md)  |  [Español](/docs/es/CONTRIBUTION.md)  |  [Français](/docs/fr/CONTRIBUTION.md)  |  [日本語](/docs/ja/CONTRIBUTION.md)  |  [한국어](/docs/ko/CONTRIBUTION.md) | [More](/docs/) <br/>

## ข้อกำหนดเบื้องต้น

ก่อนที่คุณจะเริ่มพัฒนาโครงการนี้ โปรดตรวจสอบให้แน่ใจว่าคุณได้ติดตั้ง SDK และซอฟต์แวร์ต่อไปนี้แล้ว โปรดใส่ใจกับเวอร์ชันที่ระบุอย่างใกล้ชิดเพื่อหลีกเลี่ยงปัญหาความเข้ากันได้ บางเวอร์ชันอาจใช้งานได้ แต่แนะนำให้ใช้เวอร์ชันด้านล่างนี้

- Node v20.9.0
- Go 1.21.1
- Git Bash(for Windows)
  - ต้องเลือก 'Use Git and optional Unix....' ในการติดตั้ง
- Visual Studio Code

ก่อนที่จะแก้ไขซอร์สโค้ด คุณควรอ่านส่วนด้านล่างเพื่อเรียนรู้สถาปัตยกรรมและรายละเอียดทางเทคนิค

## จะเปิดตัวโครงการอย่างไร?

เพื่อหลีกเลี่ยงการเขียนส่วนที่ซ้ำกัน โปรดอ่าน [README.md](../README.md) เกี่ยวกับส่วนนี้ โดยจะมีแนวทางฉบับสมบูรณ์สำหรับวิธีติดตั้ง deps และเรียกใช้โปรเจ็กต์ส่วนหน้าและส่วนหลัง

## จะสร้างโครงการได้อย่างไร?

We fully opened the source project of this project, to build this project, you can trigger below commands in Git-Bash:

```bash
./pipeline/build-all.sh
```

## ส่วนขยาย VSCode สำหรับ Dev

หากคุณกำลังจะพัฒนาโครงการนี้ ต่อไปนี้เป็นส่วนขยายที่ยอดเยี่ยมสำหรับคุณที่จะตรวจสอบว่าอาจเป็นประโยชน์ โปรดทราบว่าส่วนนี้ไม่น่าสนใจอย่างแน่นอน

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

## Dev && สร้างบน VSCode

หากคุณกำลังจะพัฒนาหรือสร้างโปรเจ็กต์นี้ โปรดทราบว่าคุณควรทำตามขั้นตอนด้านล่างให้เสร็จสิ้นก่อน มิฉะนั้น คุณจะได้รับข้อผิดพลาดที่ยกเว้น

1. ตั้งค่าเส้นทางการดำเนินการเทอร์มินัลของคุณเป็น Git Bash
2. ตั้งค่า env ในระบบของคุณ: LAFTOOLS_ROOT=${Your Actual Project Root}.
3. ติดตั้ง dlv และ gopls สำหรับบริการแบ็กเอนด์ Go เมื่อคุณเปิดใช้งานในตอนแรก

## เทคโนโลยี

หากต้องการเริ่มพัฒนา โปรดตรวจสอบว่าคุณคุ้นเคยกับเทคโนโลยีที่เราใช้หรือไม่ ไม่จำเป็นต้องเรียนรู้ทั้งหมด หากไม่ ก็ไม่เป็นไรหากคุณคุ้นเคยกับเทคโนโลยี F/E หรือ B/E เท่านั้น เรามีเวิร์กโฟลว์การทดสอบหน่วยและคำขอดึงข้อมูลเพื่อให้แน่ใจว่าการเปลี่ยนแปลงของคุณเสร็จสิ้นอย่างถูกต้อง

เรากำลังรอคอยการมีส่วนร่วมของคุณ

สำหรับการพัฒนาส่วนหน้า:

- React
- TypeScript
- BluePrint.js
- Tailwind.css

สำหรับการพัฒนา Back-end:

- Go
- Node.js

สำหรับการพัฒนาเดสก์ท็อป/ไคลเอ็นต์:

- Wails.io
- Electron
- Browser Extension

เพื่อเขียนเอกสารของเราอย่างกระชับ เราจะไม่ลงรายละเอียดทุกรายละเอียดเกี่ยวกับไลบรารีที่ 3 ที่นี่ โปรดอ่านซอร์สโค้ดเพื่อดูรายละเอียดเพิ่มเติม

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
