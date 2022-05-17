const StyleDictionary = require('style-dictionary')
const baseConfig = require('./config')
const _ = require('lodash');
const fs = require('fs');

const logIfValueNotExist = (message, token) => {
  if (!token?.hasOwnProperty('value')) {
    console.log(`${message} token`, token)
  }
}

StyleDictionary.registerFormat({
  name: 'custom/format/android-font-style-xml',
  formatter: _.template(fs.readFileSync(__dirname + '/templates/android-font-style-xml.template'))
});
StyleDictionary.registerFormat({
  name: 'custom/format/android-font-size-xml',
  formatter: _.template(fs.readFileSync(__dirname + '/templates/android-font-size-xml.template'))
});

StyleDictionary.registerTransform({
  name: 'size/px',
  type: 'value',
  matcher: token => {
    logIfValueNotExist('size/px matcher', token)
    return (token.unit === 'pixel' || token.type === 'dimension') && token.value !== 0
  },
  transformer: token => {
    logIfValueNotExist('size/px transformer', token)
    return `${token.value}px`
  }
})

StyleDictionary.registerTransform({
  name: 'size/percent',
  type: 'value',
  matcher: token => {
    logIfValueNotExist('size/percent matcher', token)
    return token.unit === 'percent' && token.value !== 0
  },
  transformer: token => {
    logIfValueNotExist('size/percent transformer', token)
    return `${token.value}%`
  }
})

StyleDictionary.registerTransformGroup({
  name: 'custom/css',
  transforms: StyleDictionary.transformGroup['css'].concat([
    'size/px',
    'size/percent'
  ])
})

StyleDictionary.registerTransformGroup({
  name: 'custom/less',
  transforms: StyleDictionary.transformGroup['less'].concat([
    'size/px',
    'size/percent'
  ])
})

StyleDictionary.registerTransformGroup({
  name: 'custom/scss',
  transforms: StyleDictionary.transformGroup['less'].concat([
    'size/px',
    'size/percent'
  ])
})

StyleDictionary.registerFilter({
  name: 'validToken',
  matcher: function(token) {
    logIfValueNotExist('validToken matcher', token)
    return ['dimension', 'string', 'number', 'color'].includes(token.type)
  }
})

const StyleDictionaryExtended = StyleDictionary.extend(baseConfig)

StyleDictionaryExtended.buildAllPlatforms()