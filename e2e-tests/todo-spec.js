'use strict';

describe('Budget Demo App', function() {
    var goButton = element(by.id('login'));
    var submitLoginBtn = element(by.css('.bnt-submit-login'));
    var loginView = element(by.css('.login-container'));
    var email = element(by.model('vm.email'));
    var pass = element(by.model('vm.pass'));

    beforeEach(function() {
        browser.get('http://localhost:8000/app/#/authentication');
        expect(loginView.isPresent()).toBe(false);
        goButton.click();
    });

    it('should have a title', function() {
        expect(browser.getTitle()).toEqual('Budget Buddy');
    });

    it('should should open login page', function() {
        expect(loginView.isPresent()).toBe(true);
    });

    it('should display invalid email error message if user enter invalid email address', function() {
        email.sendKeys("wrong email");
        pass.click();
        var invalidEmail = element(by.id('valid-email'));
        expect(invalidEmail.getText()).toEqual('Enter valid email address.');
    });

    it('it should dispaly required email message if email field is empty', function() {
        email.sendKeys("");
        pass.click();
        var invalidEmail = element(by.id('required-email'));
        expect(invalidEmail.getText()).toEqual('Email is required.');
    });

    it('it should dispaly required password message if pass field is empty', function() {
        pass.sendKeys("");
        email.click();
        var invalidPass = element(by.id('required-pass'));
        expect(invalidPass.getText()).toEqual('Password is required.');
    });
});
