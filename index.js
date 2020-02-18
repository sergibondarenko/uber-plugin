import aplugin from './plugins/aplugin';
import bplugin from './plugins/bplugin';

module.exports = function (kibana) {
  return [
    aplugin(kibana),
    bplugin(kibana),
  ];
};
