const { until } = require("selenium-webdriver");
const LoginPage = require("../pageobjects/login.page");
const assert = require("assert");
const { log } = require("console");
module.exports = class LoginAction {
   constructor(driver) {
      this.driver = driver;
   }

   async openLoginPage(url) {
      await this.driver.get(url);
   }
   async inputUsername(username) {
      await this.driver.findElement(LoginPage.usernameInput).sendKeys(username);
   }
   async inputPassword(password) {
      await this.driver.findElement(LoginPage.passwordInput).sendKeys(password);
   }
   async clickLoginButton() {
      await this.driver.findElement(LoginPage.loginButton).click();
   }

   async assertLoginSuccess() {
      await this.driver.wait(until.elementLocated(LoginPage.pageTitle), 5000);
      const title = await this.driver
         .findElement(LoginPage.pageTitle)
         .getText();

      assert.strictEqual(title, "Products");
   }
   async assertLoginFailed(expectErrorMassage) {
      await this.driver.wait(
         until.elementLocated(LoginPage.errorMassage),
         5000,
      );
      const actualError = await this.driver
         .findElement(LoginPage.errorMassage)
         .getText();
      // console.log(JSON.stringify(actualError), "<<<< actualError");

      assert.strictEqual(actualError, expectErrorMassage);
   }
};
