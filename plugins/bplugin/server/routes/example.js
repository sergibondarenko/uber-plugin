export default function(server) {
  server.route({
    path: '/api/bplugin/example',
    method: 'GET',
    handler() {
      return { time: new Date().toISOString() };
    },
  });
}
