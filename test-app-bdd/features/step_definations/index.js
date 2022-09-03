const { expect } = require("chai");
const { Given } = require("@cucumber/cucumber");
const { Builder, By, until } = require("selenium-webdriver");

Given("Test registration functionality", { timeout: 30000 }, async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/auth");
  await driver.findElement(By.id("dontHaveAnAccount")).click();
  await driver.findElement(By.name("firstName")).sendKeys("test");
  await driver.findElement(By.name("lastName")).sendKeys("test");
  await driver.findElement(By.name("address")).sendKeys("test");
  await driver.findElement(By.name("email")).sendKeys("test1@gmail.com");
  await driver.findElement(By.name("password")).sendKeys("test1234");
  await driver.findElement(By.name("confirmPassword")).sendKeys("test1234");
  await driver.findElement(By.name("number")).sendKeys("1234567890");
  await driver.sleep(3000);
  await driver.findElement(By.id("loginBtn")).click();
  await driver.sleep(3000);
  await driver.wait(until.elementLocated(By.id("authForm")), 30000);
  expect(await driver.wait(until.elementLocated(By.id("authForm"))));
  await driver.quit();
});

Given("Test login functionality", { timeout: 30000 }, async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/auth");
  await driver.findElement(By.name("email")).sendKeys("zanzerdawadi123@gmail.com");
  await driver.findElement(By.name("password")).sendKeys("02022057dil");
  await driver.sleep(3000);
  await driver.findElement(By.id("loginBtn")).click();
  await driver.wait(until.elementLocated(By.id("authForm")), 30000);
  expect(await driver.wait(until.elementLocated(By.id("authForm"))));
  await driver.quit();
});

Given("Test Food Search functionality", { timeout: 30000 }, async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/auth");
  await driver.findElement(By.name("email")).sendKeys("zanzerdawadi123@gmail.com");
  await driver.findElement(By.name("password")).sendKeys("02022057dil");
  await driver.findElement(By.id("loginBtn")).click();
  await driver.sleep(2000);
  await driver.executeScript("window.scrollBy(0,document.body.scrollHeight/5)");
  await driver.sleep(2000);
  await driver.findElement(By.id("orderNow")).click();
  await driver.sleep(2000);
  await driver.findElement(By.id("foodSearch")).sendKeys("sausage");
  await driver.sleep(2000);
  await driver.executeScript(scrollUp);
  await driver.sleep(1000);
  await driver.findElement(By.id("foodDetailBtn")).click();
  await driver.sleep(2000);
  await driver.wait(until.elementLocated(By.id("foodDetailPage")), 30000);
  expect(await driver.wait(until.elementLocated(By.id("foodDetailPage"))));
  await driver.quit();
});

Given("Test Room Search functionality", { timeout: 30000 }, async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/auth");
  await driver.findElement(By.name("email")).sendKeys("zanzerdawadi123@gmail.com");
  await driver.findElement(By.name("password")).sendKeys("02022057dil");
  await driver.findElement(By.id("loginBtn")).click();
  await driver.sleep(2000);
  await driver.executeScript("window.scrollBy(0,document.body.scrollHeight/5)");
  await driver.sleep(2000);
  await driver.findElement(By.id("bookNow")).click();
  await driver.sleep(2000);
  await driver.findElement(By.id("roomSearch")).sendKeys("double");
  await driver.sleep(2000);
  await driver.findElement(By.id("roomSearchBtn")).click();
  await driver.sleep(2000);
  await driver.findElement(By.id("roomDetailBtn")).click();
  await driver.sleep(2000);
  await driver.wait(until.elementLocated(By.id("roomDetailPage")), 30000);
  expect(await driver.wait(until.elementLocated(By.id("roomDetailPage"))));
  await driver.quit();
});

Given("Test Food Add and Remove functionality", { timeout: 30000 }, async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/auth");
  await driver.findElement(By.name("email")).sendKeys("zanzerdawadi123@gmail.com");
  await driver.findElement(By.name("password")).sendKeys("02022057dil");
  await driver.findElement(By.id("loginBtn")).click();
  await driver.sleep(2000);
  await driver.executeScript("window.scrollBy(0,document.body.scrollHeight/5)");
  await driver.sleep(2000);
  await driver.findElement(By.id("orderNow")).click();
  await driver.sleep(2000);
  await driver.executeScript("window.scrollBy(0,document.body.scrollHeight/7)");
  await driver.sleep(1000);
  await driver.findElement(By.id("openProfile")).click();
  await driver.sleep(1000);
  await driver.findElement(By.id("cartPage")).click();
  await driver.sleep(1000);
  await driver.executeScript(scrollUp);
  await driver.sleep(1000);
  await driver.findElement(By.id("addItem")).click();
  await driver.sleep(3000);
  await driver.findElement(By.id("removeItem")).click();
  await driver.sleep(3000);
  await driver.findElement(By.id("deleteItem")).click();
  await driver.sleep(3000);
  await driver.wait(until.elementLocated(By.id("placeOrder")), 30000);
  expect(await driver.wait(until.elementLocated(By.id("placeOrder"))));
  await driver.quit();
});

Given("Test Food Order functionality", { timeout: 30000 }, async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/auth");
  await driver.findElement(By.name("email")).sendKeys("zanzerdawadi123@gmail.com");
  await driver.findElement(By.name("password")).sendKeys("02022057dil");
  await driver.findElement(By.id("loginBtn")).click();
  await driver.sleep(2000);
  await driver.executeScript("window.scrollBy(0,document.body.scrollHeight/5)");
  await driver.sleep(2000);
  await driver.findElement(By.id("orderNow")).click();
  await driver.sleep(2000);
  await driver.executeScript("window.scrollBy(0,document.body.scrollHeight/7)");
  await driver.sleep(1000);
  await driver.findElement(By.id("openProfile")).click();
  await driver.sleep(1000);
  await driver.findElement(By.id("cartPage")).click();
  await driver.sleep(1000);
  await driver.executeScript(scrollUp);
  await driver.sleep(1000);
  await driver.findElement(By.id("placeOrder")).click();
  await driver.sleep(1000);
  await driver.findElement(By.id("orderNowKhalti")).click();
  await driver.sleep(2000);
  await driver.wait(until.elementLocated(By.id("orderNowKhalti")), 30000);
  expect(await driver.wait(until.elementLocated(By.id("orderNowKhalti"))));
  await driver.quit();
});

Given("Test Room Booking Form functionality", { timeout: 30000 }, async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/auth");
  await driver.findElement(By.name("email")).sendKeys("zanzerdawadi123@gmail.com");
  await driver.findElement(By.name("password")).sendKeys("02022057dil");
  await driver.findElement(By.id("loginBtn")).click();
  await driver.sleep(2000);
  await driver.executeScript("window.scrollBy(0,document.body.scrollHeight/5)");
  await driver.sleep(1000);
  await driver.findElement(By.id("bookNow")).click();
  await driver.sleep(2000);
  await driver.findElement(By.id("bookNowBtn")).click();
  await driver.sleep(1000);
  await driver.findElement(By.id("bookName")).sendKeys("dilip");
  await driver.findElement(By.id("bookEmail")).sendKeys("zanzerdaawadi123@gmail.com");
  await driver.findElement(By.id("bookPhone")).sendKeys("9876543210");
  await driver.findElement(By.id("bookRoomBtn")).click();
  await driver.sleep(3000);
  await driver.wait(until.elementLocated(By.id("bookRoomBtn")), 30000);
  expect(await driver.wait(until.elementLocated(By.id("bookRoomBtn"))));
  await driver.quit();
});

Given("Test Room Booking Delete functionality", { timeout: 30000 }, async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/auth");
  await driver.findElement(By.name("email")).sendKeys("zanzerdawadi123@gmail.com");
  await driver.findElement(By.name("password")).sendKeys("02022057dil");
  await driver.findElement(By.id("loginBtn")).click();
  await driver.sleep(2000);
  await driver.executeScript("window.scrollBy(0,document.body.scrollHeight/5)");
  await driver.sleep(1000);
  await driver.findElement(By.id("bookNow")).click();
  await driver.sleep(2000);
  await driver.findElement(By.id("myBooking")).click();
  await driver.sleep(4000);
  await driver.findElement(By.id("roomBookingDelete")).click();
  await driver.sleep(3000);
  await driver.wait(until.elementLocated(By.id("roomBookingDelete"), 30000));
  expect(await driver.wait(until.elementLocated(By.id("roomBookingDelete"))));
  await driver.quit();
});

Given("Test User Admin Communication functionality", { timeout: 30000 }, async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/auth");
  await driver.findElement(By.name("email")).sendKeys("zanzerdawadi123@gmail.com");
  await driver.findElement(By.name("password")).sendKeys("02022057dil");
  await driver.findElement(By.id("loginBtn")).click();
  await driver.sleep(2000);
  await driver.sleep(1000);
  await driver.findElement(By.id("contactUs")).click();
  await driver.sleep(1000);
  await driver.findElement(By.name("firstName")).sendKeys("Test");
  await driver.findElement(By.name("lastName")).sendKeys("Dawadi");
  await driver.findElement(By.name("email")).sendKeys("zanzerdawadi123@gmail");
  await driver.findElement(By.name("comment")).sendKeys("hello admin");
  await driver.findElement(By.id("contactUsBtn")).click();
  await driver.sleep(4000);
  await driver.wait(until.elementLocated(By.id("contactUsBtn"), 30000));
  expect(await driver.wait(until.elementLocated(By.id("contactUsBtn"))));
  await driver.quit();
});

Given("Test Food Order History functionality", { timeout: 30000 }, async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/auth");
  await driver.findElement(By.name("email")).sendKeys("zanzerdawadi123@gmail.com");
  await driver.findElement(By.name("password")).sendKeys("02022057dil");
  await driver.findElement(By.id("loginBtn")).click();
  await driver.sleep(8000);
  await driver.findElement(By.id("openProfile")).click();
  await driver.sleep(1000);
  await driver.findElement(By.id("orderHistory")).click();
  await driver.sleep(1000);
  await driver.findElement(By.id("orderDetailBtn")).click();
  await driver.sleep(4000);
  await driver.wait(until.elementLocated(By.id("orderDetailBtn"), 30000));
  expect(await driver.wait(until.elementLocated(By.id("orderDetailBtn"))));
  await driver.quit();
});

Given("Test Admin Food Add functionality", { timeout: 300000 }, async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/auth");
  await driver.findElement(By.name("email")).sendKeys("dilipdawadi0@gmail.com");
  await driver.findElement(By.name("password")).sendKeys("02022057dil");
  await driver.findElement(By.id("loginBtn")).click();
  await driver.sleep(2000);
  await driver.findElement(By.id("foodPageBtn")).click();
  await driver.sleep(2000);
  await driver.findElement(By.name("title")).sendKeys("Test Food");
  await driver.findElement(By.name("Description")).sendKeys("Test Food Description");
  await driver.findElement(By.name("price")).sendKeys("100");
  await driver.findElement(By.id("foodAddBtn")).click();
  await driver.wait(until.elementLocated(By.id("foodAddBtn"), 30000));
  expect(await driver.wait(until.elementLocated(By.id("foodAddBtn"))));
  await driver.quit();
});

Given("Test Admin Food Order Details functionality", { timeout: 300000 }, async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/auth");
  await driver.findElement(By.name("email")).sendKeys("dilipdawadi0@gmail.com");
  await driver.findElement(By.name("password")).sendKeys("02022057dil");
  await driver.findElement(By.id("loginBtn")).click();
  await driver.sleep(2000);
  await driver.findElement(By.id("orderDetails")).click();
  await driver.sleep(2000);
  await driver.findElement(By.id("orderDetailsBtn")).click();
  await driver.sleep(2000);
  await driver.wait(until.elementLocated(By.id("orderDetails"), 30000));
  expect(await driver.wait(until.elementLocated(By.id("orderDetails"))));
  await driver.quit();
});

Given("Test Admin Spam Details functionality", { timeout: 300000 }, async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/auth");
  await driver.findElement(By.name("email")).sendKeys("dilipdawadi0@gmail.com");
  await driver.findElement(By.name("password")).sendKeys("02022057dil");
  await driver.findElement(By.id("loginBtn")).click();
  await driver.sleep(2000);
  await driver.findElement(By.id("spamDetails")).click();
  await driver.sleep(2000);
  await driver.findElement(By.id("spammerReportBtn")).click();
  await driver.sleep(2000);
  await driver.wait(until.elementLocated(By.id("spamDetails"), 30000));
  expect(await driver.wait(until.elementLocated(By.id("spamDetails"))));
  await driver.quit();
});

Given("Test Log Out functionality", { timeout: 300000 }, async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/auth");
  await driver.findElement(By.name("email")).sendKeys("dilipdawadi0@gmail.com");
  await driver.findElement(By.name("password")).sendKeys("02022057dil");
  await driver.findElement(By.id("loginBtn")).click();
  await driver.sleep(8000);
  await driver.findElement(By.id("openProfile")).click();
  await driver.sleep(2000);
  await driver.findElement(By.id("logout")).click();
  await driver.wait(until.elementLocated(By.id("loginPage"), 30000));
  expect(await driver.wait(until.elementLocated(By.id("loginPage"))));
  await driver.quit();
});

function scrollUp() {
  window.scrollTo(0, -document.body.scrollHeight / 1);
}
