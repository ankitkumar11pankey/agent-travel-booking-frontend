// 

const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const ejs = require("ejs");

async function renderInvoicePdf(invoice, items, extras = {}) {
  const folder = path.join(process.cwd(), "uploads", "invoices");
  if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });

  const bookingType = extras.bookingType || invoice.bookingType || "flight";
  const templateFile = bookingType === "flight" ? "invoice_flight.ejs"
                     : bookingType === "bus" ? "invoice_bus.ejs"
                     : "invoice_rail.ejs";

  const templatePath = path.join(__dirname, "templates", templateFile);

  const html = await ejs.renderFile(templatePath, { invoice, items, company: extras.company || null });

  const browser = await puppeteer.launch({ args: ["--no-sandbox", "--disable-setuid-sandbox"] });
  const page = await browser.newPage();

  await page.setContent(html, { waitUntil: "networkidle0" });

  const fileName = `${invoice.invoiceNumber}.pdf`;
  const filePath = path.join(folder, fileName);

  await page.pdf({ path: filePath, format: "A4", printBackground: true });

  await browser.close();

  // Ensure file exists before returning
  if (!fs.existsSync(filePath)) {
    throw new Error("PDF generation failed");
  }

  // Return relative path for DB
  return path.join("uploads", "invoices", fileName);
}

module.exports = { renderInvoicePdf };
