exports.config = {
  // See http://brunch.io/#documentation for docs.
  files: {
    javascripts: {
      joinTo: {
        "js/app.js": /^(web\/static\/js)/,
        "js/vendor.js": /^(web\/static\/vendor)|(deps)|(node_modules)/
      },

      // To change the order of concatenation of files, explicitly mention here
      // https://github.com/brunch/brunch/tree/master/docs#concatenation
      order: {
        before: [
          "web/static/vendor/jquery/jquery.min.js",
          "web/static/vendor/bootstrap/bootstrap.min.js"
        ]
      }
    },
    stylesheets: {
      joinTo: {
        "css/app.css": /^(web\/static\/css)/,
        "css/vendor.css": /^(web\/static\/vendor)|(deps)|(node_modules)/
      }
    },
    templates: {
      joinTo: "js/app.js"
    }
  },

  conventions: {
    // This option sets where we should place non-css and non-js assets in.
    // By default, we set this to "/web/static/assets". Files in this directory
    // will be copied to `paths.public`, which is "priv/static" by default.
    assets: /^(web\/static\/assets)/
  },

  // Phoenix paths configuration
  paths: {
    // Dependencies and current project directories to watch
    watched: [
      "web/static",
      "test/static"
    ],

    // Where to compile files to
    public: "priv/static"
  },

  // Configure your plugins
  plugins: {
    babel: {
      presets: ["es2015", "react"],
      // Do not use ES6 compiler in vendor code
      ignore: [/web\/static\/vendor/]
    }
  },

  modules: {
    autoRequire: {
      "js/app.js": ["web/static/js/app"]
    }
  },

  npm: {
    enabled: true,
    // Whitelist the npm deps to be pulled in as front-end assets.
    // All other deps in package.json will be excluded from the bundle.
    whitelist: ["phoenix", "phoenix_html", "react", "react-dom", "react-router", "lodash"]
  }
};
