/**
 * @author Matt C [matt@artemisbot.uk]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import Utils from "../Utils.mjs";
import {isImage} from "../lib/FileType.mjs";
import jimp from "jimp";

/**
 * Split Colour Channels operation
 */
class SplitColourChannels extends Operation {

    /**
     * SplitColourChannels constructor
     */
    constructor() {
        super();

        this.name = "色彩通道分离";
        this.module = "Image";
        this.description = "将给定图像分离成红、绿、蓝色通道。";
        this.infoURL = "https://wikipedia.org/wiki/Channel_(digital_image)";
        this.inputType = "ArrayBuffer";
        this.outputType = "List<File>";
        this.presentType = "html";
        this.args = [];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {List<File>}
     */
    async run(input, args) {
        input = new Uint8Array(input);
        // Make sure that the input is an image
        if (!isImage(input)) throw new OperationError("无效的文件类型。");

        const parsedImage = await jimp.read(Buffer.from(input));

        const red = new Promise(async (resolve, reject) => {
            try {
                const split = parsedImage
                    .clone()
                    .color([
                        {apply: "blue", params: [-255]},
                        {apply: "green", params: [-255]}
                    ])
                    .getBufferAsync(jimp.MIME_PNG);
                resolve(new File([new Uint8Array((await split).values())], "红.png", {type: "image/png"}));
            } catch (err) {
                reject(new OperationError(`无法分离红色通道：${err}`));
            }
        });

        const green = new Promise(async (resolve, reject) => {
            try {
                const split = parsedImage.clone()
                    .color([
                        {apply: "red", params: [-255]},
                        {apply: "blue", params: [-255]},
                    ]).getBufferAsync(jimp.MIME_PNG);
                resolve(new File([new Uint8Array((await split).values())], "绿.png", {type: "image/png"}));
            } catch (err) {
                reject(new OperationError(`无法分离绿色通道：${err}`));
            }
        });

        const blue = new Promise(async (resolve, reject) => {
            try {
                const split = parsedImage
                    .color([
                        {apply: "red", params: [-255]},
                        {apply: "green", params: [-255]},
                    ]).getBufferAsync(jimp.MIME_PNG);
                resolve(new File([new Uint8Array((await split).values())], "蓝.png", {type: "image/png"}));
            } catch (err) {
                reject(new OperationError(`无法分离蓝色通道：${err}`));
            }
        });

        return await Promise.all([red, green, blue]);
    }

    /**
     * Displays the files in HTML for web apps.
     *
     * @param {File[]} files
     * @returns {html}
     */
    async present(files) {
        return await Utils.displayFilesAsHTML(files);
    }

}

export default SplitColourChannels;
