// 1. set local storage
// 2. reload page and read the value from storage
let key = `save_page_content`;
let prevValue = localStorage.getItem(key);
if (prevValue != null && prevValue != "") {
  document.write(prevValue);
}
window.addEventListener(
  "message",
  (event) => {
    window.temp_data = event.data;
    let parseObj = JSON.parse(event.data);
    localStorage.setItem(key, parseObj.current_code);
    location.reload();
  },
  false
);
