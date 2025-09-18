const { body } = require("express-validator");

const preferencesValidation = [
  body("preferences")
    .isArray().withMessage("Preferences must be an array")
    .custom((arr) => {
      const invalids = arr
        .map((p, i) => (typeof p !== "string" ? { index: i, type: typeof p } : null))
        .filter(Boolean);
      if (invalids.length > 0) {
        throw new Error(
          `Invalid preferences at indices: ${invalids
            .map((inv) => `${inv.index} (type: ${inv.type})`)
            .join(", ")}`
        );
      }
      return true;
    }),
];

module.exports = { preferencesValidation };
