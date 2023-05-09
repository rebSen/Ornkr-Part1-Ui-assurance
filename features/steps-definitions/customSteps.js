const { When, Then, After, Before, Given } = require("@cucumber/cucumber");
const { expect } = require("chai");
const webdriver = require("selenium-webdriver");
const { By, ExpectedConditions, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

let driver;

Before(function () {
  console.log("inside before");
  driver = new webdriver.Builder()
    .forBrowser("chrome")
    .setChromeOptions(new chrome.Options().addArguments("--disable-features=CookiePrompt"))
    .build();
});

After(function () {
  console.log("inside after");
  driver.quit();
});

Given("I visit ornikar homepage", { timeout: 700 * 1000 }, async () => {
  await driver.get("https://www.ornikar.com/assurance-auto");
});

When("I accept cookies", { timeout: 700 * 1000 }, async function () {
  try {
    const cookiesButton = await driver.findElement(By.xpath("//*[@id='axeptio_overlay']/div/div/div[1]/div[1]/div[1]"));
    await cookiesButton.click();
  } catch (err) {
    console.log("error :", err);
  }
});

Then("I can click on the estimate my rate button", { timeout: 700 * 1000 }, async function () {
  const elementToClick = driver.findElement(By.xpath('//a[@class="Wrapper_1nnIU3 Primary_JHcVmg Clickable_2CHx7g"]'));
  await elementToClick.click();
});

Then("I can see the first question of the survey", { timeout: 1200 * 1000 }, async () => {
  let pageSource = await driver.getPageSource();
  expect(pageSource).to.include("Vous êtes-vous déjà inscrit.e chez Ornikar pour le code ou la conduite ?");
});
