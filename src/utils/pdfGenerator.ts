import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Product } from '@/lib/mockData';

interface Part {
  category: string;
  name: string;
  condition: string;
  quantity: number;
  price: number;
}

export const generateQuotationPDF = (
  buildName: string = "Custom Build",
  parts: Part[],
  total: number,
  estimatedWattage: number
) => {
  const doc = new jsPDF();
  const themeColor = [0, 240, 255] as [number, number, number]; // Cyan #00F0FF
  const secondaryColor = [80, 80, 80] as [number, number, number];

  // --- HELPER CONFIG ---
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  // --- HEADER BACKGROUND ---
  doc.setFillColor(15, 23, 42); // Dark Navy Background
  doc.rect(0, 0, pageWidth, 40, 'F');

  // --- LOGO / BRAND ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.setTextColor(...themeColor);
  doc.text("NEXUS PC", margin, 25);

  doc.setFontSize(10);
  doc.setTextColor(200, 200, 200);
  doc.text("Premium Custom Computes", margin, 32);

  // --- CONTACT INFO (Right Aligned Header) ---
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  const contactX = pageWidth - margin;
  doc.text("123 Tech Avenue, Colombo 04", contactX, 15, { align: 'right' });
  doc.text("support@nexuspc.lk", contactX, 20, { align: 'right' });
  doc.text("+94 77 123 4567", contactX, 25, { align: 'right' });
  doc.text("www.nexuspc.lk", contactX, 30, { align: 'right' });

  // --- QUOTATION DETAILS ---
  let yPos = 55;

  // Left Side: Bill To
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Quotation For:", margin, yPos);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...secondaryColor);
  doc.text("Valued Customer", margin, yPos + 6);
  if (buildName) doc.text(`Ref: ${buildName}`, margin, yPos + 11);

  // Right Side: Quote Stats
  const date = new Date();
  const expiryDate = new Date();
  expiryDate.setDate(date.getDate() + 7);

  const rightColX = pageWidth - margin - 50;

  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0);
  doc.text("Quotation #:", rightColX, yPos);
  doc.text("Date:", rightColX, yPos + 6);
  doc.text("Valid Until:", rightColX, yPos + 12);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(...secondaryColor);
  doc.text(`Q-${Math.floor(Math.random() * 10000)}`, pageWidth - margin, yPos, { align: "right" });
  doc.text(date.toLocaleDateString(), pageWidth - margin, yPos + 6, { align: "right" });
  doc.text(expiryDate.toLocaleDateString(), pageWidth - margin, yPos + 12, { align: "right" });

  // --- TABLE ---
  yPos += 25;

  const tableHead = [["No.", "Item Description", "Condition", "Qty", "Unit Price", "Total"]];
  const tableBody = parts.map((part, index) => [
    index + 1,
    part.name,
    part.condition.toUpperCase(),
    part.quantity,
    `LKR ${part.price.toLocaleString()}`,
    `LKR ${(part.price * part.quantity).toLocaleString()}`
  ]);

  autoTable(doc, {
    startY: yPos,
    head: tableHead,
    body: tableBody,
    theme: 'grid',
    headStyles: {
      fillColor: [15, 23, 42],
      textColor: [0, 240, 255],
      fontStyle: 'bold',
      halign: 'center'
    },
    columnStyles: {
      0: { halign: 'center', cellWidth: 15 },
      1: { cellWidth: 'auto' },
      2: { halign: 'center', cellWidth: 25 },
      3: { halign: 'center', cellWidth: 15 },
      4: { halign: 'right', cellWidth: 35 },
      5: { halign: 'right', cellWidth: 40, fontStyle: 'bold' }
    },
    styles: {
      fontSize: 9,
      cellPadding: 4,
      valign: 'middle'
    },
    alternateRowStyles: {
      fillColor: [245, 247, 250]
    }
  });

  // --- SUMMARY SECTION ---
  // @ts-ignore
  let finalY = doc.lastAutoTable.finalY + 10;

  // Power Estimate (Bottom Left)
  doc.setDrawColor(200);
  doc.setFillColor(245, 247, 250);
  doc.roundedRect(margin, finalY, 60, 25, 2, 2, 'FD');

  doc.setFontSize(8);
  doc.setTextColor(100);
  doc.text("ESTIMATED POWER", margin + 5, finalY + 8);

  doc.setFontSize(14);
  doc.setTextColor(0);
  doc.setFont("helvetica", "bold");
  doc.text(`${estimatedWattage} W`, margin + 5, finalY + 18);

  // Totals (Bottom Right)
  const summaryX = pageWidth - margin - 80;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...secondaryColor);
  doc.text("Subtotal:", summaryX, finalY + 5);
  doc.text(`LKR ${total.toLocaleString()}`, pageWidth - margin, finalY + 5, { align: 'right' });

  doc.text("Tax (0%):", summaryX, finalY + 11);
  doc.text("LKR 0", pageWidth - margin, finalY + 11, { align: 'right' });

  // Divider
  doc.setDrawColor(200);
  doc.line(summaryX, finalY + 15, pageWidth - margin, finalY + 15);

  // Grand Total
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0);
  doc.text("Total:", summaryX, finalY + 24);
  doc.setTextColor(0, 150, 255); // Blue for total
  doc.text(`LKR ${total.toLocaleString()}`, pageWidth - margin, finalY + 24, { align: 'right' });

  // --- FOOTER ---
  const footerY = pageHeight - 30;

  doc.setDrawColor(0, 240, 255);
  doc.setLineWidth(0.5);
  doc.line(margin, footerY, pageWidth - margin, footerY);

  doc.setFontSize(8);
  doc.setTextColor(100);
  doc.setFont("helvetica", "normal");

  const terms = [
    "Terms & Conditions:",
    "1. Prices are subject to change without prior notice due to market fluctuations.",
    "2. Warranty covers manufacturing, defects only. Physical damage is not covered.",
    "3. Goods once sold will not be taken back.",
    "4. This quotation is valid for 7 days from the date of issue."
  ];

  let termY = footerY + 8;
  terms.forEach(term => {
    doc.text(term, margin, termY);
    termY += 4;
  });

  doc.text("Thank you for choosing NEXUS PC!", pageWidth - margin, footerY + 12, { align: 'right', maxWidth: 60 });

  // Save the PDF
  const safeName = buildName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  doc.save(`Quote_${safeName}_${Date.now()}.pdf`);
};

export const mapBuilderPartsToPDF = (selectedParts: Record<string, { product: Product; quantity: number }[]>): Part[] => {
  const partsList: Part[] = [];

  // Define a sort order if needed, but for now simple iteration
  Object.entries(selectedParts).forEach(([category, items]) => {
    if (Array.isArray(items)) {
      items.forEach(item => {
        partsList.push({
          category: category.replace('-', ' '),
          name: item.product.name,
          condition: item.product.condition,
          quantity: item.quantity,
          price: item.product.price
        });
      });
    }
  });

  return partsList;
};
