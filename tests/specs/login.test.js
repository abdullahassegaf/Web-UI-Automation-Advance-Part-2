const { Builder } = require("selenium-webdriver");
const LoginAction = require("../actions/login.action.js");
const {
   compareScreenshot,
} = require("../../utilities/visual_regresion.helper.js");
describe("Login Test", () => {
   let driver;
   let loginAction;

   beforeEach(async () => {
      driver = await new Builder().forBrowser("firefox").build();
      loginAction = new LoginAction(driver);

      await loginAction.openLoginPage("https://www.saucedemo.com/");
   });

   afterEach(async () => {
      await driver.quit();
   });
   it("should login with valid credential", async () => {
      await loginAction.inputUsername("standard_user");
      await loginAction.inputPassword("secret_sauce");
      await loginAction.clickLoginButton();
      await loginAction.assertLoginSuccess();

      await compareScreenshot(driver, "login-success");
   });
   it("should login with invalid username", async () => {
      await loginAction.inputUsername("invalid_username");
      await loginAction.inputPassword("secret_sauce");
      await loginAction.clickLoginButton();
      await loginAction.assertLoginFailed(
         "Epic sadface: Username and password do not match any user in this service",
      );
      await sharingAction.partialPageScreenshot(
         LoginPage.errorMassage,
         "login-failed-wrong-password",
      );
      await compareScreenshot(driver, "login-failed-wrong-password");
   });
   it("should login with wrong password", async () => {
      await loginAction.inputUsername("standard_user");
      await loginAction.inputPassword("salah");
      await loginAction.clickLoginButton();
      await loginAction.assertLoginFailed(
         "Epic sadface: Username and password do not match any user in this service",
      );

      await compareScreenshot(driver, "login-failed-wrong-password");
   });
   it("should login with Locked_out_user", async () => {
      await loginAction.inputUsername("locked_out_user");
      await loginAction.inputPassword("secret_sauce");
      await loginAction.clickLoginButton();
      await loginAction.assertLoginFailed(
         "Epic sadface: Sorry, this user has been locked out.",
      );
      await compareScreenshot(driver, "login-failed-locked-out");
   });
});
