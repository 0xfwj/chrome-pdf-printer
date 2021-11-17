#! /usr/bin/env node
const yargs = require("yargs/yargs")(process.argv.slice(2));
const ChromePDFPrinter = require("../index");

const options = yargs
  .usage("\nUsage: $0 [options] --url <webpage_url> --pdf </path/to/pdf/filename.pdf>")
  .example("$0 --url http://baidu.com --pdf test.pdf")
  .options({
    url: {
      description: "Webpage URL to print as PDF.",
      demand: true,
    },
    pdf: {
      description: "The generated PDF file to save as.",
      demand: true,
    },
    host: {
      description: "The Chrome host to connect to.",
      type: "string",
    },
    port: {
      description: "The Chrome port to connect to.",
    },
    landscape: {
      description: "Paper orientation. Defaults to false.",
      boolean: true,
    },
    printBackground: {
      description: "Print background graphics. Defaults to false.",
      boolean: true,
    },
    marginTop: {
      description: "Top margin in inches. Defaults to 1cm (~0.4 inches).",
    },
    marginBottom: {
      description: "Bottom margin in inches. Defaults to 1cm (~0.4 inches).",
    },
    marginLeft: {
      description: "Left margin in inches. Defaults to 1cm (~0.4 inches).",
    },
    marginRight: {
      description: "Right margin in inches. Defaults to 1cm (~0.4 inches).",
    },
    paperWidth: {
      description: "Paper width in inches. Defaults to 8.5 inches.",
    },
    paperHeight: {
      description: "Paper height in inches. Defaults to 11 inches.",
    },
    pageRanges: {
      description:
        "Paper ranges to print, e.g., '1-5, 8, 11-13'. Defaults to the empty string, which means print all pages.",
      type: "string",
    },
    displayHeaderFooter: {
      description: "Display header and footer. Defaults to false.",
      boolean: true,
    },
    headerTemplate: {
      description:
        "HTML template for the print header. Should be valid HTML markup with following classes used to inject printing values into them: date, title, url, pageNumber, totalPages. For example, `<span class=title></span>` would generate span containing the title.",
      type: "string",
    },
    footerTemplate: {
      description:
        "HTML template for the print footer. Should use the same format as the headerTemplate.",
      type: "string",
    },
    scale: {
      description: "Scale of the webpage rendering. Defaults to 1.",
    },
    chromeFlags: {
      description: "chrome flags.",
      array: true,
    },
  })
  .help(true).argv;

// the parsed data is stored in options.
// console.dir(options);

(async () => {
  try {
    await ChromePDFPrinter.printPDF(options.url, options.pdf, options);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
  process.exit();
})();