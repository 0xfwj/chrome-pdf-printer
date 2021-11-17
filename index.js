const htmlPdf = require("html-pdf-chrome");

const DEFAULT_CHROME_FLAGS = [
  "--disable-gpu",
  "--headless",
  "--hide-scrollbars",
];

class ChromePDFPrinter {
  constructor(options) {
    this.options = options || {};
  }

  buildHtmlPdfChromeOptions() {
    const printOptions = {};
    if (this.options.landscape !== undefined) {
      printOptions.landscape = !!this.options.landscape;
    }

    if (this.options.printBackground !== undefined) {
      printOptions.printBackground = !!this.options.printBackground;
    }

    if (this.options.marginTop !== undefined) {
      printOptions.marginTop = this.options.marginTop;
    }
    if (this.options.marginBottom !== undefined) {
      printOptions.marginBottom = this.options.marginBottom;
    }
    if (this.options.marginLeft !== undefined) {
      printOptions.marginLeft = this.options.marginLeft;
    }
    if (this.options.marginRight !== undefined) {
      printOptions.marginRight = this.options.marginRight;
    }

    if (this.options.paperWidth !== undefined) {
      printOptions.paperWidth = parseFloat(this.options.paperWidth);
    }

    if (this.options.paperHeight !== undefined) {
      printOptions.paperHeight = parseFloat(this.options.paperHeight);
    }

    if (this.options.pageRanges !== undefined) {
      printOptions.pageRanges = this.options.pageRanges;
    }

    if (this.options.displayHeaderFooter !== undefined) {
      printOptions.displayHeaderFooter = !!this.options.displayHeaderFooter;
    }

    if (this.options.headerTemplate !== undefined) {
      printOptions.headerTemplate = this.options.headerTemplate;
    }

    if (this.options.footerTemplate !== undefined) {
      printOptions.footerTemplate = this.options.footerTemplate;
    }

    if (this.options.scale !== undefined) {
      let scale = this.options.scale;
      if (scale < 0.1) {
        console.warn(`scale cannot be lower than 0.1, using 0.1`);
        scale = 0.1;
      }
      if (scale > 2) {
        console.warn(`scale cannot be higher than 2, using 2`);
        scale = 2;
      }
      printOptions.scale = scale;
    }

    return {
      url: this.options.url,
      pdf: this.options.pdf,
      host: this.options.host || undefined,
      port: this.options.port || undefined,
      chromePath: this.options.chromePath || "",
      chromeFlags: this.options.chromeFlags || DEFAULT_CHROME_FLAGS,
      printOptions: printOptions,
      completionTrigger: new htmlPdf.CompletionTrigger.Timer(20000),
    };
  }

  static async printPDF(url, filename, options) {
    const printer = new ChromePDFPrinter(options);
    const htmlPdfOptions = printer.buildHtmlPdfChromeOptions();
    const pdf = await htmlPdf.create(url, htmlPdfOptions);
    await pdf.toFile(filename);
    console.log(`Saved ${filename}`);
  }

}

module.exports = ChromePDFPrinter;
module.exports.default = ChromePDFPrinter;
