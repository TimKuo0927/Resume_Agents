import puppeteer from 'puppeteer';
import fs from 'fs';

export class ResumePdfGenerator {
  async generatePdf(htmlContent: string, outputPath: string): Promise<void> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    await page.pdf({ path: outputPath, format: 'A4' });
    await browser.close();
  }
}
