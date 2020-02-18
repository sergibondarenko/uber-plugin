import { resolve } from 'path';
import { existsSync } from 'fs';

import { i18n } from '@kbn/i18n';

import exampleRoute from './server/routes/example';

export default function(kibana) {
  return new kibana.Plugin({
    id: 'bplugin',
    configPrefix: 'uberplugin.bplugin',
    publicDir: resolve(__dirname, 'public'),
    require: ['elasticsearch'],
    uiExports: {
      app: {
        title: 'Bplugin',
        description: 'An awesome Kibana plugin',
        main: 'plugins/bplugin/app',
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
        const featureId = 'bplugin';

        xpackMainPlugin.registerFeature({
          id: featureId,
          name: i18n.translate('bplugin.featureRegistry.featureName', {
            defaultMessage: 'bplugin',
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
