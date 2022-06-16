const defaultConfigFontStyle = {
  filename: 'font_style',
  filter: {
    type: 'custom-fontStyle',
  },
};
const defaultConfigFontSize = {
  filename: 'font_size',
  filter: {
    type: 'custom-fontStyle',
  },
};
const defaultConfigBreakpoint = {
  filename: 'breakpoint',
  filter: function (token) {
    if (token?.attributes?.category === 'breakpoints') {
      return token;
    }
  },
};
const defaultConfigColor = {
  filename: 'color',
  filter: {
    type: 'color',
  },
};
const defaultConfigElevation = {
  filename: 'elevation',
  filter: {
    type: 'custom-shadow',
  },
};
const defaultConfig = {
  breakpoint: defaultConfigBreakpoint,
  elevation: defaultConfigElevation,
  fontSize: defaultConfigFontSize,
  fontStyle: defaultConfigFontStyle,
  color: defaultConfigColor,
};

const createFiles = (extension, configFiles) => {
  const files = configFiles.map((item) => ({
    destination:
      defaultConfig[item.id].filename +
      '.' +
      (item.customExtension || extension),
    format: item.format,
    filter: defaultConfig[item.id].filter,
  }));
  return files;
};

module.exports = {
  source: ['tokens/*.json'],
  platforms: {
    android: {
      transformGroup: 'android',
      buildPath: 'build/android/',
      files: createFiles('xml', [
        {
          id: 'fontSize',
          format: 'custom/format/android-font-size-xml',
        },
        {
          id: 'fontStyle',
          format: 'custom/format/android-font-style-xml',
        },
        {
          id: 'color',
          format: 'android/resources',
        },
      ]),
    },
    'json-nested': {
      transformGroup: 'web',
      buildPath: 'build/json/',
      files: createFiles('json', [
        {
          id: 'breakpoint',
          format: 'json/nested',
        },
        {
          id: 'fontStyle',
          format: 'json/nested',
        },
        {
          id: 'color',
          format: 'json/nested',
        },
        {
          id: 'elevation',
          format: 'json/nested',
        },
      ]),
    },
    js: {
      transformGroup: 'js',
      buildPath: 'build/js/',
      filed: createFiles('js', [
        {
          id: 'breakpoint',
          format: 'javascript/es6',
        },
        {
          id: 'fontStyle',
          format: 'javascript/es6',
        },
        {
          id: 'color',
          format: 'javascript/es6',
        },
        {
          id: 'elevation',
          format: 'javascript/es6',
        },
      ]),
    },
    ts: {
      transformGroup: 'js',
      buildPath: 'build/ts/',
      files: createFiles('ts', [
        {
          id: 'breakpoint',
          format: 'javascript/es6',
        },
        {
          id: 'breakpoint',
          customExtension: 'd.ts',
          format: 'typescript/es6-declarations',
        },
        {
          id: 'fontStyle',
          format: 'javascript/es6',
        },
        {
          id: 'fontStyle',
          customExtension: 'd.ts',
          format: 'typescript/es6-declarations',
        },
        {
          id: 'color',
          format: 'javascript/es6',
        },
        {
          id: 'color',
          customExtension: '.d.ts',
          format: 'typescript/es6-declarations',
        },
        {
          id: 'elevation',
          format: 'javascript/es6',
        },
        {
          id: 'elevation',
          customExtension: '.d.ts',
          format: 'typescript/es6-declarations',
        },
      ]),
    },
    ios: {
      transformGroup: 'ios',
      buildPath: 'build/ios/',
      files: [
        {
          destination: 'StyleDictionaryColor.h',
          format: 'ios/colors.h',
          className: 'StyleDictionaryColor',
          type: 'StyleDictionaryColorName',
          filter: {
            type: 'color',
          },
        },
        {
          destination: 'StyleDictionaryColor.m',
          format: 'ios/colors.m',
          className: 'StyleDictionaryColor',
          type: 'StyleDictionaryColorName',
          filter: {
            type: 'color',
          },
        },
        {
          destination: 'StyleDictionarySize.h',
          format: 'ios/static.h',
          className: 'StyleDictionarySize',
          type: 'float',
          filter: {
            type: 'number',
          },
        },
        {
          destination: 'StyleDictionarySize.m',
          format: 'ios/static.m',
          className: 'StyleDictionarySize',
          type: 'float',
          filter: {
            type: 'number',
          },
        },
      ],
    },
    'ios-swift': {
      transformGroup: 'ios-swift',
      buildPath: 'build/ios-swift/',
      files: [
        {
          destination: 'StyleDictionary.swift',
          format: 'ios-swift/class.swift',
          className: 'StyleDictionary',
          filter: {},
        },
      ],
    },
    'ios-swift-separate-enums': {
      transformGroup: 'ios-swift-separate',
      buildPath: 'build/ios-swift/',
      files: [
        {
          destination: 'StyleDictionaryColor.swift',
          format: 'ios-swift/enum.swift',
          className: 'StyleDictionaryColor',
          filter: {
            type: 'color',
          },
        },
        {
          destination: 'StyleDictionarySize.swift',
          format: 'ios-swift/enum.swift',
          className: 'StyleDictionarySize',
          type: 'float',
          filter: {
            type: 'number',
          },
        },
      ],
    },
  },
};
