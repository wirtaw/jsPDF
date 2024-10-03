var doc = new jsPDF();
doc.addFont("test/reference/PTSans.ttf", "PTSans", "normal");

doc.setFont("PTSans"); // set font
doc.setFontSize(50);
doc.text("А ну чики брики и в дамки!", 10, 10);
