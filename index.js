const puppeteer = require("puppeteer");
const download = require("image-downloader");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  console.log("Browser openned");
  const page = await browser.newPage();
  const url = "https://www.designveloper.com/";
  await page.goto(url);
  console.log("Page loaded");

  const imgLinks = await page.evaluate(() => {
    let imgElements = document.querySelectorAll("img");
    imgElements = [...imgElements];
    let imgLinks = imgElements.map((i) => i.getAttribute("src"));
    return imgLinks;
  });
  console.log(imgLinks);

  // Tải các ảnh này về thư mục hiện tại
  await Promise.all(
    imgLinks.map((imgUrl) =>
      download.image({
        url: imgUrl,
        dest: `${__dirname}/images/`,
      }),
    ),
  );

  await browser.close();
})();
