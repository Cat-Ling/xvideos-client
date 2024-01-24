module.exports = {
  packagerConfig: {
    asar: true,
    icon: 'public/x',
    ignore: [
      'out/',
      'xdata/'
    ],
  },
  rebuildConfig: {},
  makers: [
/*    {
      
      name: '@electron-forge/maker-squirrel',
      config: {
//        iconUrl: 'public/x.ico',
        setupIcon: 'public/x.ico'
      } 
    },
*/   
    {
      name: '@electron-forge/maker-zip',
      platforms: ['all']
    },
/*    {
      name: '@electron-forge/maker-deb',
      config: {
        icon: 'public/x.png'
      },
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {
        icon: 'public/x.png'
      },
    },
*/    
  ],
/*  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    ],
    */
};
