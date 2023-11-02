import * as Keychain from 'react-native-keychain';

class Storage {
  async storeToken(token: string) {
    try {
      await Keychain.setGenericPassword('token', token);
    } catch (err) {
      console.log('Error storing token.', err);
    }
  }

  async retrieveToken() {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials && credentials.password) return credentials.password;
      else console.log('No token found.');
    } catch (err) {
      console.log('Error retrieving token.', err);
    }
  }

  async deleteToken() {
    try {
      await Keychain.resetGenericPassword();
    } catch (err) {
      console.log('Error deleting token.', err);
    }
  }
}

export default new Storage();
