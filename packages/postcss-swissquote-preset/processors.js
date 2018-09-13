const debug = require("debug")("postcss-swissquote-preset");

const features = require("./src/features");

module.exports = function(config, crafty) {
  // All processors used to make the CSS readable by a browser
  const processors = features(config);

  // Extend with Crafty
  if (crafty) {
    crafty.getImplementations("postcss").forEach(preset => {
      debug(`${preset.presetName}.postcss(Crafty, postcssConfig)`);
      preset.postcss(crafty, processors);
      debug("preset executed");
    });
  }

  // Make a valid format for postcss
  return processors
    .values()
    .filter(item => item.isEnabled())
    .map(item => item.instantiate());
};
