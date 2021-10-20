const Twetch = require("@twetch/sdk");
const clientId = "";
const twetch = new Twetch({ clientIdentifier: clientId });
class Auth {
  constructor() {
    this.authenticated = localStorage.tokenTwetchAuth || false;
  }

  login(cb) {
    try {
      twetch.authenticate();
      this.authenticated = true;
      cb();
    } catch (e) {
      this.authenticated = false;
      console.log(e);
    }
  }

  logout(cb) {
    localStorage.clear();
    this.authenticated = false;
    cb();
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
