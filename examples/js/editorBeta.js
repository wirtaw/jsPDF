/* global ace, $, PDFObject, pdf, doc */
/**
 * jsPDFEditor
 * @return {[type]} [description]
 */
let editor;

const demos = Object.freeze({
    "images.js": "Images",
    "images_png.js": "Images (png)",
    "font-faces.js": "Font faces, text alignment and rotation",
    "two-page.js": "Two page Hello World",
    "circles.js": "Circles",
    "cell.js": "Cell",
    "font-size.js": "Font sizes",
    "landscape.js": "Landscape",
    "lines.js": "Lines",
    "rectangles.js": "Rectangles",
    "string-splitting.js": "String Splitting",
    "text-colors.js": "Text colors",
    "triangles.js": "Triangles",
    "user-input.js": "User input",
    "acroforms.js": "AcroForms",
    "annotations.js": "Annotations",
    "autoprint.js": "Auto print",
    "arabic.js": "Arabic",
    "russian.js": "Russian",
    "japanese.js": "Japanese",
    "password.js": "Password"
});

/**
 * Update the iframe with current PDF.
 *
 * @param  {boolean} skipEval If true, will skip evaluation of the code
 * @return
 */
const update = function(skipEval) {
    setTimeout(function() {
        if (!skipEval) {
          eval(
            "try{" +
              editor.getValue() +
              "} catch(e) { console.error(e.message,e.stack,e); }"
          );
        }
        if (typeof doc !== "undefined")
          try {
            if (
              navigator.appVersion.indexOf("MSIE") !== -1 ||
              navigator.appVersion.indexOf("Edge") !== -1 ||
              navigator.appVersion.indexOf("Trident") !== -1
            ) {
              const options = Object.freeze({
                pdfOpenParams: {
                  navpanes: 0,
                  toolbar: 0,
                  statusbar: 0,
                  view: "FitV"
                },
                forcePDFJS: true,
                PDFJS_URL: "examples/PDF.js/web/viewer.html"
              });
              PDFObject.embed(doc.output("bloburl"), "#preview-pane", options);
            } else {
              PDFObject.embed(doc.output("datauristring"), "#preview-pane");
            }
          } catch (e) {
            alert("Error " + e);
          }
      }, 0);
};

const aceEditor = function() {
    editor = ace.edit("editor");
    editor.setTheme("ace/theme/github");
    editor.setOptions({
      fontFamily: "monospace",
      fontSize: "12px"
    });
    editor.getSession().setMode("ace/mode/javascript");
    editor.getSession().setUseWorker(false); // prevent "SecurityError: DOM Exception 18"

    let timeout;
    editor.getSession().on("change", function() {
      // Hacky workaround to disable auto refresh on user input
      if (
        $("#auto-refresh").is(":checked") &&
        $("#template").val() != "user-input.js"
      ) {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(function() {
          update();
        }, 200);
      }
    });
};

const loadSelectedFile = async function(params) {
    
};

const populateDropdown = function() {
    const template = document.getElementById('template');
    template.innerText = '';
    // let options = "";
    for (let demo in demos) {
      // options += '<option value="' + demo + '">' + demos[demo] + "</option>";
      const optionId = 'option-' + demo.replaceAll('.', '_');
      const option = document.createElement('option');
      option.setAttribute('class', 'field');
      option.setAttribute('id', optionId);
      option.setAttribute('value', demo);
      option.innerText = demos[demo];

      option.addEventListener('change', (event) => {
        loadSelectedFile();
      });

      template.appendChild(option);
    }
};

const init = function() {
    aceEditor();

    populateDropdown();
};

document.addEventListener('DOMContentLoaded', function() {
    window.jsPDF = window.jspdf.jsPDF;
    init();
});