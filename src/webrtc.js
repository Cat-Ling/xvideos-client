function setWebRTCBlockingPolicy(webContents) {
    webContents.setWebRTCIPHandlingPolicy('disable_non_proxied_udp');
  }
  
  module.exports = { setWebRTCBlockingPolicy };
  
