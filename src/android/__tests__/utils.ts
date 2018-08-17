import * as path from 'path';

import * as utils from '../../utils';
import * as androidUtils from '../utils';

describe('android/utils', () => {

  describe('resolveSDKRoot', () => {

    let originalProcessEnv;

    beforeEach(() => {
      originalProcessEnv = process.env;
    });

    afterEach(() => {
      process.env = originalProcessEnv;
    });

    it('should fail with empty env', async () => {
      process.env = {};
      await expect(androidUtils.resolveSDKRoot()).rejects.toThrowError('No valid Android SDK root found.');
    });

  });

  describe('getAVDFromINI', () => {

    it('should properly parse Pixel_2_API_28', async () => {
      const ini = await utils.readINI(path.resolve(__dirname, './fixtures/avd/Pixel_2_API_28.ini'));
      ini.path = path.resolve(__dirname, './fixtures/avd/Pixel_2_API_28.avd'); // patch path

      const expected = {
        id: 'Pixel_2_API_28',
        path: ini.path,
        name: 'Pixel 2 API 28',
        target: 28,
        screenDPI: 420,
        screenWidth: 1080,
        screenHeight: 1920,
      };

      const avd = await androidUtils.getAVDFromINI(ini);
      expect(avd).toEqual(expected);
    });

    it('should properly parse Pixel_2_XL_API_28', async () => {
      const ini = await utils.readINI(path.resolve(__dirname, './fixtures/avd/Pixel_2_XL_API_28.ini'));
      ini.path = path.resolve(__dirname, './fixtures/avd/Pixel_2_XL_API_28.avd'); // patch path

      const expected = {
        id: 'Pixel_2_XL_API_28',
        path: ini.path,
        name: 'Pixel 2 XL API 28',
        target: 28,
        screenDPI: 560,
        screenWidth: 1440,
        screenHeight: 2880,
      };

      const avd = await androidUtils.getAVDFromINI(ini);
      expect(avd).toEqual(expected);
    });

    it('should properly parse avdmanager_1', async () => {
      const ini = await utils.readINI(path.resolve(__dirname, './fixtures/avd/avdmanager_1.ini'));
      ini.path = path.resolve(__dirname, './fixtures/avd/avdmanager_1.avd'); // patch path

      const expected = {
        id: 'avdmanager_1',
        path: ini.path,
        name: 'avdmanager 1',
        target: 28,
        screenDPI: null,
        screenWidth: null,
        screenHeight: null,
      };

      const avd = await androidUtils.getAVDFromINI(ini);
      expect(avd).toEqual(expected);
    });

  });

});
