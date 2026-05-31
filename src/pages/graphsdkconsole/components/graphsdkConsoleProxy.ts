/**
 * Returns a string of JS that, when injected into the inspected page,
 * patches `console.log/info/warn/error/debug` plus error/unhandledrejection
 * listeners so that each call is forwarded back to the SP Editor devtools
 * panel via window.postMessage -> content.js -> chrome.runtime.onMessage.
 *
 * Idempotent: re-injecting (via repeated runs) is a no-op.
 */
export const GRAPHSDK_CONSOLE_PROXY_SOURCE = `(function(){
  if (window.__spEditorGraphSdkConsoleProxied) return;
  window.__spEditorGraphSdkConsoleProxied = true;
  function fmt(a){
    try {
      if (a === null) return 'null';
      if (a === undefined) return 'undefined';
      if (a instanceof Error) return (a.stack || (a.name + ': ' + a.message));
      if (typeof a === 'string') return a;
      if (typeof a === 'function') return a.toString();
      return JSON.stringify(a, function(_k, v){
        if (v instanceof Error) return v.stack || v.message;
        return v;
      }, 2);
    } catch (e) { try { return String(a); } catch(_e){ return '[unserializable]'; } }
  }
  function send(level, args){
    try {
      window.postMessage(JSON.stringify({
        source: 'sp-editor-graphsdk-console',
        level: level,
        args: Array.prototype.map.call(args, fmt),
        ts: Date.now()
      }), '*');
    } catch (e) { /* swallow */ }
  }
  var originals = {};
  ['log','info','warn','error','debug'].forEach(function(level){
    originals[level] = console[level] && console[level].bind(console);
    console[level] = function(){ send(level, arguments); if (originals[level]) try { originals[level].apply(null, arguments); } catch(_e){} };
  });
  window.addEventListener('error', function(e){
    var msg = e && e.message ? e.message : 'Error';
    if (e && e.error && e.error.stack) msg += '\\n' + e.error.stack;
    send('error', [msg]);
  });
  window.addEventListener('unhandledrejection', function(e){
    var r = e && e.reason;
    var text = (r && (r.stack || r.message)) ? (r.stack || r.message) : (typeof r === 'string' ? r : JSON.stringify(r));
    send('error', ['Unhandled promise rejection: ' + text]);
  });
})();`
