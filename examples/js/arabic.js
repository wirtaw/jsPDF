const doc = new jsPDF();
doc.addFont("test/reference/Amiri-Regular.ttf", "Amiri", "normal");

doc.setFont("Amiri"); // set font
doc.setFontSize(50);

const arabicText = "إذا لم تستح فاصنع ما شئت";

doc.text(arabicText, 10, 60);
