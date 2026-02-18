const { By } = require("selenium-webdriver");

module.exports = class LoginPage {
   static usernameInput = By.xpath('//*[@id="user-name"]');
   static passwordInput = By.id("password");
   static loginButton = By.xpath('//*[@id="login-button"]');
   static pageTitle = By.className("title");
   static errorMassage = By.xpath('//h3[@data-test="error"]');
};
