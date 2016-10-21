describe('Budget Demo App', function() {
    var goButton = element(by.id('login'));
    var submitLoginBtn = element(by.css('.bnt-submit-login'));
    var loginView = element(by.css('.login-container'));

    var urlChanged = function(url) {
        return function() {
            return browser.getCurrentUrl().then(function(actualUrl) {
                console.log(actualUrl)
                console.log(url)
                return url === actualUrl;
            });
        };
    };

    beforeEach(function() {
        browser.get('http://localhost:8000/app/#/authentication');
    });

    it('should have a title', function() {
        expect(browser.getTitle()).toEqual('Budget-App');
    });

    it('should should open login page', function() {
        expect(loginView.isPresent()).toBe(false);
        goButton.click();
        expect(loginView.isPresent()).toBe(true);
    });

    it('should should login to the app', function() {
        goButton.click();
        var email = element(by.css('.input-email'));
        var password = element(by.model('vm.pass'));

        email.sendKeys("email@email.com");
        password.sendKeys("xxx");
        submitLoginBtn.click();
        expect(browser.wait(urlChanged("http://localhost:8000/app/#/budget"), 3000));
    });

});
