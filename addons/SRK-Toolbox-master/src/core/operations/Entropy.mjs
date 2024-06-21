/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import * as d3temp from "d3";
import * as nodomtemp from "nodom";

import Operation from "../Operation.mjs";

const d3 = d3temp.default ? d3temp.default : d3temp;
const nodom = nodomtemp.default ? nodomtemp.default: nodomtemp;

/**
 * Entropy operation
 */
class Entropy extends Operation {

    /**
     * Entropy constructor
     */
    constructor() {
        super();

        this.name = "熵";
        this.module = "Charts";
        this.description = "在信息论中，香农熵是接收的每条消息中包含的信息的平均量，又被称为信息熵、信源熵、平均自信息量。通常可以用来衡量一段数据具有（或不具有）某种特定结构。对于单字节的英文字符，最大值是8（8个比特），表示完全随机的一段内容。英语文章的香农熵通常在3.5~5。通常情况下，加密或压缩后的密文需要高于7.5的熵。";
        this.infoURL = "https://wikipedia.org/wiki/Entropy_(information_theory)";
        this.inputType = "ArrayBuffer";
        this.outputType = "json";
        this.presentType = "html";
        this.args = [
            {
                "name": "可视化",
                "type": "option",
                "value": ["香农量表", "图表 (柱状图)", "图表 (折线图)", "曲线图", "图像"]
            }
        ];
    }

    /**
     * Calculates the frequency of bytes in the input.
     *
     * @param {Uint8Array} input
     * @returns {number}
     */
    calculateShannonEntropy(input) {
        const prob = [],
            occurrences = new Array(256).fill(0);

        // Count occurrences of each byte in the input
        let i;
        for (i = 0; i < input.length; i++) {
            occurrences[input[i]]++;
        }

        // Store probability list
        for (i = 0; i < occurrences.length; i++) {
            if (occurrences[i] > 0) {
                prob.push(occurrences[i] / input.length);
            }
        }

        // Calculate Shannon entropy
        let entropy = 0,
            p;

        for (i = 0; i < prob.length; i++) {
            p = prob[i];
            entropy += p * Math.log(p) / Math.log(2);
        }

        return -entropy;
    }

    /**
     * Calculates the scanning entropy of the input
     *
     * @param {Uint8Array} inputBytes
     * @returns {Object}
     */
    calculateScanningEntropy(inputBytes) {
        const entropyData = [];
        const binWidth = inputBytes.length < 256 ? 8 : 256;

        for (let bytePos = 0; bytePos < inputBytes.length; bytePos += binWidth) {
            const block = inputBytes.slice(bytePos, bytePos+binWidth);
            entropyData.push(this.calculateShannonEntropy(block));
        }

        return { entropyData, binWidth };
    }

    /**
     * Calculates the frequency of bytes in the input.
     *
     * @param {object} svg
     * @param {function} xScale
     * @param {function} yScale
     * @param {integer} svgHeight
     * @param {integer} svgWidth
     * @param {object} margins
     * @param {string} xTitle
     * @param {string} yTitle
     */
    createAxes(svg, xScale, yScale, svgHeight, svgWidth, margins, title, xTitle, yTitle) {
        // Axes
        const yAxis = d3.axisLeft()
            .scale(yScale);

        const xAxis = d3.axisBottom()
            .scale(xScale);

        svg.append("g")
            .attr("transform", `translate(0, ${svgHeight - margins.bottom})`)
            .call(xAxis);

        svg.append("g")
            .attr("transform", `translate(${margins.left},0)`)
            .call(yAxis);

        // Axes labels
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margins.left)
            .attr("x", 0 - (svgHeight / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text(yTitle);

        svg.append("text")
            .attr("transform", `translate(${svgWidth / 2}, ${svgHeight - margins.bottom + 40})`)
            .style("text-anchor", "middle")
            .text(xTitle);

        // Add title
        svg.append("text")
            .attr("transform", `translate(${svgWidth / 2}, ${margins.top - 10})`)
            .style("text-anchor", "middle")
            .text(title);
    }

    /**
     * Calculates the frequency of bytes in the input.
     *
     * @param {Uint8Array} inputBytes
     * @returns {number[]}
     */
    calculateByteFrequency(inputBytes) {
        const freq = new Array(256).fill(0);
        if (inputBytes.length === 0) return freq;

        // Count occurrences of each byte in the input
        let i;
        for (i = 0; i < inputBytes.length; i++) {
            freq[inputBytes[i]]++;
        }

        for (i = 0; i < freq.length; i++) {
            freq[i] = freq[i] / inputBytes.length;
        }

        return freq;
    }

    /**
     * Calculates the frequency of bytes in the input.
     *
     * @param {number[]} byteFrequency
     * @returns {HTML}
     */
    createByteFrequencyLineHistogram(byteFrequency) {
        const margins = { top: 30, right: 20, bottom: 50, left: 30 };

        const svgWidth = 500,
            svgHeight = 500;

        const document = new nodom.Document();
        let svg = document.createElement("svg");

        svg = d3.select(svg)
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(byteFrequency, d => d)])
            .range([svgHeight - margins.bottom, margins.top]);

        const xScale = d3.scaleLinear()
            .domain([0, byteFrequency.length - 1])
            .range([margins.left, svgWidth - margins.right]);

        const line = d3.line()
            .x((_, i) => xScale(i))
            .y(d => yScale(d))
            .curve(d3.curveMonotoneX);

        svg.append("path")
            .datum(byteFrequency)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("d", line);

        this.createAxes(svg, xScale, yScale, svgHeight, svgWidth, margins, "", "Byte", "Byte Frequency");

        return svg._groups[0][0].outerHTML;
    }

    /**
     * Creates a byte frequency histogram
     *
     * @param {number[]} byteFrequency
     * @returns {HTML}
     */
    createByteFrequencyBarHistogram(byteFrequency) {
        const margins = { top: 30, right: 20, bottom: 50, left: 30 };

        const svgWidth = 500,
            svgHeight = 500,
            binWidth = 1;

        const document = new nodom.Document();
        let svg = document.createElement("svg");
        svg = d3.select(svg)
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`);

        const yExtent = d3.extent(byteFrequency, d => d);
        const yScale = d3.scaleLinear()
            .domain(yExtent)
            .range([svgHeight - margins.bottom, margins.top]);

        const xScale = d3.scaleLinear()
            .domain([0, byteFrequency.length - 1])
            .range([margins.left - binWidth, svgWidth - margins.right]);

        svg.selectAll("rect")
            .data(byteFrequency)
            .enter().append("rect")
            .attr("x", (_, i) => xScale(i) + binWidth)
            .attr("y", dataPoint => yScale(dataPoint))
            .attr("width", binWidth)
            .attr("height", dataPoint => yScale(yExtent[0]) - yScale(dataPoint))
            .attr("fill", "blue");

        this.createAxes(svg, xScale, yScale, svgHeight, svgWidth, margins, "", "Byte", "Byte Frequency");

        return svg._groups[0][0].outerHTML;
    }

    /**
     * Creates a byte frequency histogram
     *
     * @param {number[]} entropyData
     * @returns {HTML}
     */
    createEntropyCurve(entropyData) {
        const margins = { top: 30, right: 20, bottom: 50, left: 30 };

        const svgWidth = 500,
            svgHeight = 500;

        const document = new nodom.Document();
        let svg = document.createElement("svg");
        svg = d3.select(svg)
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(entropyData, d => d)])
            .range([svgHeight - margins.bottom, margins.top]);

        const xScale = d3.scaleLinear()
            .domain([0, entropyData.length])
            .range([margins.left, svgWidth - margins.right]);

        const line = d3.line()
            .x((_, i) => xScale(i))
            .y(d => yScale(d))
            .curve(d3.curveMonotoneX);

        if (entropyData.length > 0) {
            svg.append("path")
                .datum(entropyData)
                .attr("d", line);

            svg.selectAll("path").attr("fill", "none").attr("stroke", "steelblue");
        }

        this.createAxes(svg, xScale, yScale, svgHeight, svgWidth, margins, "Scanning Entropy", "Block", "Entropy");

        return svg._groups[0][0].outerHTML;
    }

    /**
     * Creates an image representation of the entropy
     *
     * @param {number[]} entropyData
     * @returns {HTML}
     */
    createEntropyImage(entropyData) {
        const svgHeight = 100,
            svgWidth = 100,
            cellSize = 1,
            nodes = [];

        for (let i = 0; i < entropyData.length; i++) {
            nodes.push({
                x: i % svgWidth,
                y: Math.floor(i / svgWidth),
                entropy: entropyData[i]
            });
        }

        const document = new nodom.Document();
        let svg = document.createElement("svg");
        svg = d3.select(svg)
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`);

        const greyScale = d3.scaleLinear()
            .domain([0, d3.max(entropyData, d => d)])
            .range(["#000000", "#FFFFFF"])
            .interpolate(d3.interpolateRgb);

        svg
            .selectAll("rect")
            .data(nodes)
            .enter().append("rect")
            .attr("x", d => d.x * cellSize)
            .attr("y", d => d.y * cellSize)
            .attr("width", cellSize)
            .attr("height", cellSize)
            .style("fill", d => greyScale(d.entropy));

        return svg._groups[0][0].outerHTML;
    }

    /**
     * Displays the entropy as a scale bar for web apps.
     *
     * @param {number} entropy
     * @returns {HTML}
     */
    createShannonEntropyVisualization(entropy) {
        return `香农熵： ${entropy}
        <br><canvas id='chart-area'></canvas><br>
        - 0代表完全不随机（比如所有的字节都是相同内容）；最大值为8，代表完全随机的字符串。
        - 通常情况下英语文章的熵在3.5~5。
        - 通常对于加密或压缩后的密文熵应该达到7.5以上。

        此结果显示输入内容的熵。对于特别高熵的内容，可能为加密或压缩后的密文。

        <br><script>
            var canvas = document.getElementById("chart-area"),
                parentRect = canvas.closest(".cm-scroller").getBoundingClientRect(),
                entropy = ${entropy},
                height = parentRect.height * 0.25;

            canvas.width = parentRect.width * 0.95;
            canvas.height = height > 150 ? 150 : height;

            CanvasComponents.drawScaleBar(canvas, entropy, 8, [
                {
                    label: "English text",
                    min: 3.5,
                    max: 5
                },{
                    label: "Encrypted/compressed",
                    min: 7.5,
                    max: 8
                }
            ]);
        </script>`;
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {json}
     */
    run(input, args) {
        const visualizationType = args[0];
        input = new Uint8Array(input);

        switch (visualizationType) {
            case "图表 (柱状图)":
            case "图表 (折线图)":
                return this.calculateByteFrequency(input);
            case "曲线图":
            case "图像":
                return this.calculateScanningEntropy(input).entropyData;
            case "香农量表":
            default:
                return this.calculateShannonEntropy(input);
        }
    }

    /**
     * Displays the entropy in a visualisation for web apps.
     *
     * @param {json} entropyData
     * @param {Object[]} args
     * @returns {html}
     */
    present(entropyData, args) {
        const visualizationType = args[0];

        switch (visualizationType) {
            case "图表 (柱状图)":
                return this.createByteFrequencyBarHistogram(entropyData);
            case "图表 (折线图)":
                return this.createByteFrequencyLineHistogram(entropyData);
            case "曲线图":
                return this.createEntropyCurve(entropyData);
            case "图像":
                return this.createEntropyImage(entropyData);
            case "香农量表":
            default:
                return this.createShannonEntropyVisualization(entropyData);
        }
    }
}

export default Entropy;
