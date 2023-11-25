import * as Keychain from 'react-native-keychain';

class Storage {
  async storeToken(token: string, tokenExpiration: string) {
    try {
      const tokenData = { token, tokenExpiration };
      await Keychain.setGenericPassword('tokenData', JSON.stringify(tokenData));
    } catch (err) {
      console.error('Error storing token.', err);
    }
  }

  async retrieveToken() {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials && credentials.password) return JSON.parse(credentials.password);
      else console.log('No token found.');
    } catch (err) {
      console.error('Error retrieving token.', err);
    }
  }

  async deleteToken() {
    try {
      await Keychain.resetGenericPassword();
    } catch (err) {
      console.error('Error deleting token.', err);
    }
  }
}

export default new Storage();
