// I know we don't need this in a separate file. But I'll do it anyway. Fight me.

function setWebRTCBlockingPolicy(webContents) {
    webContents.setWebRTCIPHandlingPolicy('disable_non_proxied_udp');
  }
  
  module.exports = { setWebRTCBlockingPolicy };
  
