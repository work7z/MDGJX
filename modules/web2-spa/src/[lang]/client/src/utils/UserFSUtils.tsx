// FSUtils provides selecting file from input, reading file, and writing file.

let UserFSUtils = {
    selectFile: function (accept: string, multiple: boolean, callback: (files: FileList) => void) {
        let input = document.createElement('input');
        input.type = 'file';
        input.accept = accept;
        input.multiple = multiple;
        input.onchange = function () {
            if (input && input.files && input.files.length > 0) {
                callback(input.files);
            }
        };
        input.click();
    }
};

export default UserFSUtils;