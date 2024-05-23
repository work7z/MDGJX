
export async function js_export_trigger({ saveValue, filename, }) {
    function convertRes2BlobAndDownload(filename, data) {
        if (typeof document == 'undefined') {
            return
        }
        const blob = new Blob([data], {
            type: "application/octet-stream",
        });
        const blobURL = window.URL.createObjectURL(blob);
        const tempLink = document.createElement("a");
        tempLink.style.display = "none";
        tempLink.href = blobURL;
        tempLink.setAttribute("download", decodeURI(filename));
        if (typeof tempLink.download === "undefined") {
            tempLink.setAttribute("target", "_blank");
        }
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        window.URL.revokeObjectURL(blobURL);
    }
    try {
        convertRes2BlobAndDownload(
            filename || `result-${Date.now()}.txt`,
            saveValue
        );
    } catch (e) {
        console.log("err", e);
    }
}


export default {

}