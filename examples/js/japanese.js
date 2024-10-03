var doc = new jsPDF();

doc.addFont("test/reference/MouhitsuBold.ttf", "Mouhitsu", "bold");

doc.setFont("Mouhitsu", "bold"); // set font
doc.setFontSize(50);

doc.text("なに", 20, 20);
