/**
 * @author George O [georgeomnet+cyberchef@gmail.com]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";

/**
 * Index of Coincidence operation
 */
class IndexOfCoincidence extends Operation {

    /**
     * IndexOfCoincidence constructor
     */
    constructor() {
        super();

        this.name = "重合因子";
        this.module = "Default";
        this.description = "重合因子（Index of Coincidence, IC）指任意拿出两个字母，两个字母相同的概率。由于英语文本的IC通常大约为0.066，所以IC可以用来推测文本是否为可读文本。IC作为良好的判定条件被用来进行自动化文本频率分析。";
        this.infoURL = "https://wikipedia.org/wiki/Index_of_coincidence";
        this.inputType = "string";
        this.outputType = "number";
        this.presentType = "html";
        this.args = [];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {number}
     */
    run(input, args) {
        const text = input.toLowerCase().replace(/[^a-z]/g, ""),
            frequencies = new Array(26).fill(0),
            alphabet = Utils.expandAlphRange("a-z");
        let coincidence = 0.00,
            density = 0.00,
            result = 0.00,
            i;

        for (i=0; i < alphabet.length; i++) {
            frequencies[i] = text.count(alphabet[i]);
        }

        for (i=0; i < frequencies.length; i++) {
            coincidence += frequencies[i] * (frequencies[i] - 1);
        }

        density = frequencies.sum();

        // Ensure that we don't divide by 0
        if (density < 2) density = 2;

        result = coincidence / (density * (density - 1));

        return result;
    }

    /**
     * Displays the IC as a scale bar for web apps.
     *
     * @param {number} ic
     * @returns {html}
     */
    present(ic) {
        return `重合因子： ${ic}
标准化： ${ic * 26}
<br><canvas id='chart-area'></canvas><br>
- 0表示完全随机（所有字符不重复），1代表完全不随机（所有字符相同）。
- 英语文本的IC通常位于0.067至0.078。
- 文本的随机度由每个字母和其它字母出现次数相同的概率决定。

以下图标显示输入数据的IC。较低的IC值通常表示文本是随机生成的，或被压缩/加密过。

<script type='application/javascript'>
  var canvas = document.getElementById("chart-area"),
      parentRect = canvas.closest(".cm-scroller").getBoundingClientRect(),
      ic = ${ic};

  canvas.width = parentRect.width * 0.95;
  canvas.height = parentRect.height * 0.25;

  ic = ic > 0.25 ? 0.25 : ic;

  CanvasComponents.drawScaleBar(canvas, ic, 0.25, [
    {
      label: "English text",
      min: 0.05,
      max: 0.08
    },
    {
      label: "> 0.25",
      min: 0.24,
      max: 0.25
    }
  ]);
</script>
     `;
    }

}

export default IndexOfCoincidence;
