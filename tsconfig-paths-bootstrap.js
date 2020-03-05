const tsConfigPaths = require('tsconfig-paths');

const baseUrl = './dist'; // Either absolute or relative path. If relative it's resolved to current working directory.
tsConfigPaths.register({
  baseUrl,
  paths: {
    "@shared.all/*": ["src/shared/*"],
    "@shared.admin/*": ["src/modules.app/admin.app/shared/*"],
    "@shared.restaurant/*": ["src/modules.app/restaurant.app/shared/*"],
    "@shared.supplier/*": ["src/modules.app/supplier.app/shared/*"],
    "@modules.private/*": ["src/modules.private/*"],
  }
});