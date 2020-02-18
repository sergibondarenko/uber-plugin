import { resolve } from 'path';
import { existsSync } from 'fs';

import { i18n } from '@kbn/i18n';

import exampleRoute from './server/routes/example';

export default function(kibana) {
  return new kibana.Plugin({
    id: 'aplugin',
    configPrefix: 'uberplugin.aplugin',
    publicDir: resolve(__dirname, 'public'),
    require: ['elasticsearch'],
    uiExports: {
      app: {
        title: 'Aplugin',
        description: 'An awesome Kibana plugin',
        main: 'plugins/aplugin/app',
      },
      styleSheetPaths: [
        resolve(__dirname, 'public/app.scss'),
        resolve(__dirname, 'public/app.css'),
      ].find(p => existsSync(p)),
    },

    config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
      }).default();
    },

    // eslint-disable-next-line no-unused-vars
    init(server, options) {
      const xpackMainPlugin = server.plugins.xpack_main;
      if (xpackMainPlugin) {
        const featureId = 'aplugin';

        xpackMainPlugin.registerFeature({
          id: featureId,
          name: i18n.translate('aplugin.featureRegistry.featureName', {
            defaultMessage: 'aplugin',
          }),
          navLinkId: featureId,
          icon: 'questionInCircle',
          app: [featureId, 'kibana'],
          catalogue: [],
          privileges: {
            all: {
              api: [],
              savedObject: {
                all: [],
                read: [],
              },
              ui: ['show'],
            },
            read: {
              api: [],
              savedObject: {
                all: [],
                read: [],
              },
              ui: ['show'],
            },
          },
        });
      }

      // Add server routes and initialize the plugin here
      exampleRoute(server);
    },
  });
}
