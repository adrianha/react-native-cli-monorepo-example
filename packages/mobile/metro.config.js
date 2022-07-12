/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const defaultAssetExts =
  require('metro-config/src/defaults/defaults').assetExts;
const PATH = require('path');
const FS = require('fs');

function resolvePath(...parts) {
  const thisPath = PATH.resolve(...parts);
  if (!FS.existsSync(thisPath)) return;

  return FS.realpathSync(thisPath);
}

function isExternalModule(modulePath) {
  return modulePath.substring(0, __dirname.length) !== __dirname;
}

function listDirectories(rootPath, cb) {
  FS.readdirSync(rootPath).forEach(fileName => {
    if (fileName.charAt(0) === '.') return;

    let fullFileName = PATH.join(rootPath, fileName),
      stats = FS.lstatSync(fullFileName),
      symbolic = false;

    if (stats.isSymbolicLink()) {
      fullFileName = resolvePath(fullFileName);
      if (!fullFileName) return;

      stats = FS.lstatSync(fullFileName);

      symbolic = true;
    }

    if (!stats.isDirectory()) return;

    const external = isExternalModule(fullFileName);
    cb({rootPath, symbolic, external, fullFileName, fileName});
  });
}

function buildFullModuleMap(
  moduleRoot,
  mainModuleMap,
  externalModuleMap,
  _alreadyVisited,
  _prefix,
) {
  if (!moduleRoot) return;

  const alreadyVisited = _alreadyVisited || {},
    prefix = _prefix;

  if (alreadyVisited && alreadyVisited.hasOwnProperty(moduleRoot)) return;

  listDirectories(
    moduleRoot,
    ({fileName, fullFileName, symbolic, external}) => {
      if (symbolic) {
        return buildFullModuleMap(
          resolvePath(fullFileName, 'node_modules'),
          mainModuleMap,
          externalModuleMap,
          alreadyVisited,
        );
      }

      const moduleMap = external ? externalModuleMap : mainModuleMap,
        moduleName = prefix ? PATH.join(prefix, fileName) : fileName;

      if (fileName.charAt(0) !== '@') {
        moduleMap[moduleName] = fullFileName;
      } else {
        return buildFullModuleMap(
          fullFileName,
          mainModuleMap,
          externalModuleMap,
          alreadyVisited,
          fileName,
        );
      }
    },
  );
}

function buildModuleResolutionMap() {
  const moduleMap = {},
    externalModuleMap = {};

  buildFullModuleMap(baseModulePath, moduleMap, externalModuleMap);

  // Root project modules take precedence over external modules
  return Object.assign({}, externalModuleMap, moduleMap);
}

const baseModulePath = resolvePath(__dirname, 'node_modules'),
  // build full module map for proper
  // resolution of modules in external roots
  extraNodeModules = buildModuleResolutionMap();

const blacklistModules = ['react', 'react-native'];
const blockList = [
  new RegExp(PATH.join(__dirname, 'android/.*')),
  new RegExp(PATH.join(__dirname, 'ios/.*')),
];
blacklistModules.forEach(blacklistModule => {
  const blacklistModulePath = resolvePath(
    resolvePath(__dirname, '../util'),
    'node_modules',
    blacklistModule,
  );
  if (blacklistModulePath) {
    blockList.push(
      new RegExp(
        blacklistModulePath.replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, '\\$&') +
          '/.*',
      ),
    );
  }
});

// workaround for enabling symlink
module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    assetExts: defaultAssetExts.filter(assetExt => assetExt !== 'json'),
    extraNodeModules,
    blockList,
  },
  watchFolders: [
    PATH.join(__dirname),
    PATH.join(__dirname, '../util'),
    PATH.join(__dirname, '../../node_modules'),
    PATH.join(__dirname, '../../../cli'), // /path/to/cloned/cli/
    PATH.join(__dirname, '../../../cli/packages/cli/node_modules'), // /path/to/cloned/cli/
  ],
};
