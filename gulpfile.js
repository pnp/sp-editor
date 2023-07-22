var gulp = require('gulp');
var del = require('del');
var rename = require("gulp-rename");
var replace = require('gulp-replace');

gulp.task("comment-redirect", (done) => {
  gulp.src(["./node_modules/msal/src/UserAgentApplication.ts"])
  .pipe(replace(
    `\n            this.navigateWindow(urlNavigate);`,
    `\n            //this.navigateWindow(urlNavigate);`))
  .pipe(gulp.dest("./node_modules/msal/src/"));
  gulp.src(["./node_modules/msal/lib-es6/UserAgentApplication.js"])
  .pipe(replace(
    `\n                        this.navigateWindow(urlNavigate);`,
    `\n                        //this.navigateWindow(urlNavigate);`))
  .pipe(gulp.dest("./node_modules/msal/lib-es6/"));
  gulp.src(["./node_modules/msal/dist/msal.js"])
  .pipe(replace(
    `\n                        this.navigateWindow(urlNavigate);`,
    `\n                        //this.navigateWindow(urlNavigate);`))
  .pipe(gulp.dest("./node_modules/msal/dist/"));
  done();
});

gulp.task('clean', (done) => {
  console.log("Deleting old definitions");
  return del([
    'public/@pnp/common/**/*',
    'public/@pnp/config-store/**/*',
    'public/@pnp/graph/**/*',
    'public/@pnp/logging/**/*',
    'public/@pnp/nodejs/**/*',
    'public/@pnp/odata/**/*',
    'public/@pnp/pnpjs/**/*',
    'public/@pnp/sp/**/*',
    'public/@pnp/msaljsclient/**/*',
    'public/@pnp/queryable/**/*',
    'public/@pnp/core/**/*',
    'public/@pnp/sp-admin/**/*',
    'public/@microsoft/**/*',
    'public/msal/**/*',
    'public/react/**/*',
    'app/@pnp/adaljsclient/**/*',
    'public/vs/**/*',
    'public/@pnp/sp-addinhelpers/**/*',
    'public/@pnp/sp-clientsvc/**/*',
    'public/@pnp/sp-taxonomy/**/*',
    'public/@microsoft/microsoft-graph-types/**/*',
    'public/bundles/common.es5.umd.bundle.js',
    'public/bundles/config-store.es5.umd.bundle.js',
    'public/bundles/graph.es5.umd.bundle.js',
    'public/bundles/logging.es5.umd.bundle.js',
    'public/bundles/nodejs.es5.umd.js',
    'public/bundles/odata.es5.umd.bundle.js',
    'public/bundles/pnpjs.es5.umd.bundle.js',
    'public/bundles/sp-addinhelpers.es5.umd.bundle.js',
    'public/bundles/sp-clientsvc.es5.umd.bundle.js',
    'public/bundles/sp-taxonomy.es5.umd.bundle.js',
    'public/bundles/sp.es5.umd.bundle.js',
    'public/bundles/core.es5.umd.bundle.js',
    'public/bundles/queryable.es5.umd.bundle.js',
    'public/bundles/msaljsclient.es5.umd.bundle.js',
    'public/bundles/graph-sdk.es5.umd.bundle.js',
    'public/bundles/msal.js',
    'public/bundles/AuthCodeMSALBrowserAuthenticationProvider.es5.umd.bundle.js',
    'public/bundles/msal-browser.js',

  ], done);
});

gulp.task('copy:commmon', (done) => {
  console.log("Copy @pnp/common");
  gulp.src(['./node_modules/@pnp/common/**/*.d.ts', '!./node_modules/@pnp/common/node_modules/**/*.d.ts'])
    .pipe(gulp.dest('./public/@pnp/common/'))
  gulp.src('./dist/common.es5.umd.bundle.js')
    .pipe(replace(/(\/\/.*?sourceMappingURL\s*=.*\.js\.map)/g, ''))
    .pipe(gulp.dest('./public/bundles/'))
  done();
});

gulp.task('copy:config-store', (done) => {
  console.log("Copy @pnp/config-store");
  gulp.src(['./node_modules/@pnp/config-store/**/*.d.ts', '!./node_modules/@pnp/config-store/node_modules/**/*.d.ts'])
    .pipe(gulp.dest('./public/@pnp/config-store/'))
  gulp.src('./dist/config-store.es5.umd.bundle.js')
    .pipe(replace(/(\/\/.*?sourceMappingURL\s*=.*\.js\.map)/g, ''))
    .pipe(gulp.dest('./public/bundles/'))
  done();
});

gulp.task('copy:graph', (done) => {
  console.log("Copy @pnp/graph");
  gulp.src(['./node_modules/@pnp/graph/**/*.d.ts', '!./node_modules/@pnp/graph/node_modules/**/*.d.ts'])
    .pipe(gulp.dest('./public/@pnp/graph/'))
  gulp.src('./dist/graph.es5.umd.bundle.js')
    .pipe(replace(/(\/\/.*?sourceMappingURL\s*=.*\.js\.map)/g, ''))
    .pipe(gulp.dest('./public/bundles/'))
  done();
});

gulp.task('copy:logging', (done) => {
  console.log("Copy @pnp/logging");
  gulp.src(['./node_modules/@pnp/logging/**/*.d.ts', '!./node_modules/@pnp/logging/node_modules/**/*.d.ts'])
    .pipe(gulp.dest('./public/@pnp/logging/'))
  gulp.src('./dist/logging.es5.umd.bundle.js')
    .pipe(replace(/(\/\/.*?sourceMappingURL\s*=.*\.js\.map)/g, ''))
    .pipe(gulp.dest('./public/bundles/'))
  done();
});

gulp.task('copy:odata', (done) => {
  console.log("Copy @pnp/odata");
  gulp.src(['./node_modules/@pnp/odata/**/*.d.ts', '!./node_modules/@pnp/odata/node_modules/**/*.d.ts'])
    .pipe(gulp.dest('./public/@pnp/odata/'))
  gulp.src('./dist/odata.es5.umd.bundle.js')
    .pipe(replace(/(\/\/.*?sourceMappingURL\s*=.*\.js\.map)/g, ''))
    .pipe(gulp.dest('./public/bundles/'))
  done();
});

gulp.task('copy:pnpjs', (done) => {
  console.log("Copy @pnp/pnpjs");
  gulp.src(['./node_modules/@pnp/pnpjs/**/*.d.ts', '!./node_modules/@pnp/pnpjs/node_modules/**/*.d.ts'])
    .pipe(gulp.dest('./public/@pnp/pnpjs/'))
  // gulp.src('./dist/pnpjs.es5.umd.bundle.js')
  //  .pipe(gulp.dest('./public/bundles/'))
  gulp.src('./node_modules/@pnp/pnpjs/dist/pnp.js')
    .pipe(rename('pnpjs.es5.umd.bundle.js'))
    .pipe(replace(/(\/\/.*?sourceMappingURL\s*=.*\.js\.map)/g, ''))
    .pipe(gulp.dest('./public/bundles/'))
  done();
});

gulp.task('copy:sp', (done) => {
  console.log("Copy @pnp/sp");
  gulp.src(['./node_modules/@pnp/sp/**/*.d.ts', '!./node_modules/@pnp/sp/node_modules/**/*.d.ts'])
    .pipe(gulp.dest('./public/@pnp/sp/'))
  gulp.src('./dist/sp.es5.umd.bundle.js')
    .pipe(replace(/(\/\/.*?sourceMappingURL\s*=.*\.js\.map)/g, ''))
    .pipe(gulp.dest('./public/bundles/'))
  done();
});

gulp.task('copy:queryable', (done) => {
  console.log("Copy @pnp/queryable");
  gulp.src(['./node_modules/@pnp/queryable/**/*.d.ts', '!./node_modules/@pnp/queryable/node_modules/**/*.d.ts'])
    .pipe(gulp.dest('./public/@pnp/queryable/'))
  gulp.src('./dist/queryable.es5.umd.bundle.js')
    .pipe(replace(/(\/\/.*?sourceMappingURL\s*=.*\.js\.map)/g, ''))
    .pipe(gulp.dest('./public/bundles/'))
  done();
});

gulp.task('copy:core', (done) => {
  console.log("Copy @pnp/core");
  gulp.src(['./node_modules/@pnp/core/**/*.d.ts', '!./node_modules/@pnp/core/node_modules/**/*.d.ts'])
    .pipe(gulp.dest('./public/@pnp/core/'))
  gulp.src('./dist/core.es5.umd.bundle.js')
    .pipe(replace(/(\/\/.*?sourceMappingURL\s*=.*\.js\.map)/g, ''))
    .pipe(gulp.dest('./public/bundles/'))
  done();
});

gulp.task('copy:msaljsclient', (done) => {
  console.log("Copy @pnp/msaljsclient");
  gulp.src(['./node_modules/@pnp/msaljsclient/**/*.d.ts', '!./node_modules/@pnp/msaljsclient/node_modules/**/*.d.ts'])
    .pipe(gulp.dest('./public/@pnp/msaljsclient/'))
  gulp.src('./dist/msaljsclient.es5.umd.bundle.js')
    .pipe(replace(/(\/\/.*?sourceMappingURL\s*=.*\.js\.map)/g, ''))
    .pipe(gulp.dest('./public/bundles/'))
  done();
});

gulp.task('copy:sp-admin', (done) => {
  console.log("Copy @pnp/sp-admin");
  gulp.src(['./node_modules/@pnp/sp-admin/**/*.d.ts', '!./node_modules/@pnp/sp-admin/node_modules/**/*.d.ts'])
    .pipe(gulp.dest('./public/@pnp/sp-admin/'))
  gulp.src('./dist/sp-admin.es5.umd.bundle.js')
    .pipe(replace(/(\/\/.*?sourceMappingURL\s*=.*\.js\.map)/g, ''))
    .pipe(gulp.dest('./public/bundles/'))
  done();
});

gulp.task('copy:sp-addinhelpers', (done) => {
  console.log("Copy @pnp/sp-addinhelpers");
  gulp.src(['./node_modules/@pnp/sp-addinhelpers/**/*.d.ts', '!./node_modules/@pnp/sp-addinhelpers/node_modules/**/*.d.ts'])
    .pipe(gulp.dest('./public/@pnp/sp-addinhelpers/'))
  gulp.src('./dist/sp-addinhelpers.es5.umd.bundle.js')
    .pipe(replace(/(\/\/.*?sourceMappingURL\s*=.*\.js\.map)/g, ''))
    .pipe(gulp.dest('./public/bundles/'))
  done();
});

//  gulp.task('copy:adaljsclient', (done) => {
//    console.log("Copy @pnp/adaljsclient");
//    gulp.src('./node_modules/@pnp/adaljsclient/**/*.d.ts')
//      .pipe(gulp.dest('./public/@pnp/adaljsclient/'))
//    gulp.src('./dist/adaljsclient.es5.umd.bundle.js')
//      .pipe(replace(/(\/\/.*?sourceMappingURL\s*=.*\.js\.map)/g, ''))
//      .pipe(gulp.dest('./public/bundles/'))
//    done();
//  });

gulp.task('copy:sp-clientsvc', (done) => {
  console.log("Copy @pnp/sp-clientsvc");
  gulp.src('./node_modules/@pnp/sp-clientsvc/src/**/*')
    .pipe(gulp.dest('./public/@pnp/sp-clientsvc/'))
  gulp.src('./node_modules/@pnp/sp-clientsvc/dist/sp-clientsvc.es5.umd.bundle.js')
    .pipe(replace(/(\/\/.*?sourceMappingURL\s*=.*\.js\.map)/g, ''))
    .pipe(gulp.dest('./public/bundles/'))
  done();
});

gulp.task('copy:sp-taxonomy', (done) => {
  console.log("Copy @pnp/sp-taxonomy");
  gulp.src('./node_modules/@pnp/sp-taxonomy/src/**/*')
    .pipe(gulp.dest('./public/@pnp/sp-taxonomy/'))
  gulp.src('./node_modules/@pnp/sp-taxonomy/dist/sp-taxonomy.es5.umd.bundle.js')
    .pipe(replace(/(\/\/.*?sourceMappingURL\s*=.*\.js\.map)/g, ''))
    .pipe(gulp.dest('./public/bundles/'))
  done();
});

gulp.task('copy:microsoft-graph-types', (done) => {
  console.log("Copy @microsoft/microsoft-graph-types");
  gulp.src('./node_modules/@microsoft/microsoft-graph-types/microsoft-graph.d.ts')
    .pipe(rename('index.d.ts'))
    .pipe(gulp.dest('./public/@microsoft/microsoft-graph-types/'));
  done();
});

gulp.task('copy:microsoft-graph-client', (done) => {
  console.log("Copy @microsoft/microsoft-graph-client");
  gulp.src(['./node_modules/@microsoft/microsoft-graph-client/**/*.d.ts'])
    .pipe(gulp.dest('./public/@microsoft/microsoft-graph-client/'))
    gulp.src(['./node_modules/@microsoft/microsoft-graph-client/lib/src/**/*.d.ts'])
    .pipe(gulp.dest('./public/@microsoft/microsoft-graph-client/'))
  gulp.src('./dist/graph-sdk.es5.umd.bundle.js')
  .pipe(replace(/(\/\/.*?sourceMappingURL\s*=.*\.js\.map)/g, ''))
  .pipe(gulp.dest('./public/bundles/'))
    done();
});

gulp.task('copy:msal', (done) => {
  console.log("Copy msal");
  gulp.src(['./node_modules/msal/lib-es6/**/*.d.ts'])
    .pipe(gulp.dest('./public/msal/'))
  gulp.src('./node_modules/msal/dist/msal.js')
    .pipe(rename('msal.js'))
    .pipe(gulp.dest('./public/bundles/'))
    done();
});

gulp.task('copy:msal-browser', (done) => {
  console.log("Copy msal-browser");
  gulp.src(['./node_modules/@azure/msal-browser/dist/**/*.d.ts'])
    .pipe(gulp.dest('./public/@azure/msal-browser/'))
  gulp.src('./node_modules/@azure/msal-browser/lib/msal-browser.js')
    .pipe(gulp.dest('./public/bundles/'))
    done();
});

gulp.task('copy:AuthCodeMSALBrowserAuthenticationProvider', (done) => {
  console.log("Copy AuthCodeMSALBrowserAuthenticationProvider.es5.umd.bundle.js");
  gulp.src('./dist/AuthCodeMSALBrowserAuthenticationProvider.es5.umd.bundle.js')
    .pipe(replace(/(\/\/.*?sourceMappingURL\s*=.*\.js\.map)/g, ''))
    .pipe(gulp.dest('./public/bundles/'))
  done();
});

gulp.task('copy:react', (done) => {
  console.log("Copy react");
  gulp.src(['./node_modules/@types/react/**/*.d.ts'])
    .pipe(gulp.dest('./public/react/'))
    done();
});

gulp.task('copy:mgt-react', (done) => {
  console.log("Copy @microsoft/mgt-react");
  gulp.src(['./node_modules/@microsoft/mgt-react/dist/es6/**/*.d.ts'])
    .pipe(gulp.dest('./public/@microsoft/mgt-react/'));
  gulp.src(['./node_modules/@microsoft/mgt-components/dist/es6/**/*.d.ts'])
    .pipe(gulp.dest('./public/@microsoft/mgt-components/'));
  gulp.src(['./node_modules/@microsoft/mgt-element/dist/es6/**/*.d.ts'])
    .pipe(gulp.dest('./public/@microsoft/mgt-element/'));
  gulp.src(['./node_modules/@microsoft/mgt/dist/es6/**/*.d.ts'])
    .pipe(gulp.dest('./public/@microsoft/mgt/'));
  gulp.src(['./node_modules/@microsoft/mgt-msal-provider/dist/es6/**/*.d.ts'])
    .pipe(gulp.dest('./public/@microsoft/mgt-msal-provider/'));
  gulp.src(['./node_modules/@microsoft/mgt-teams-provider/dist/es6/**/*.d.ts'])
    .pipe(gulp.dest('./public/@microsoft/mgt-teams-provider/'));
  gulp.src(['./node_modules/@microsoft/mgt-sharepoint-provider/dist/es6/**/*.d.ts'])
    .pipe(gulp.dest('./public/@microsoft/mgt-sharepoint-provider/'));
  gulp.src(['./node_modules/@microsoft/mgt-proxy-provider/dist/es6/**/*.d.ts'])
    .pipe(gulp.dest('./public/@microsoft/mgt-proxy-provider/'));
  done();
});

gulp.task('copy:monaco-editor', (done) => {
  console.log("Copy monaco-editor");
  gulp.src('./node_modules/monaco-editor/min/**/*')
    .pipe(replace(/(\/\/.*?sourceMappingURL\s*=.*\.js\.map)/g, ''))
    .pipe(gulp.dest('./public/'));
  // gulp.src('./node_modules/monaco-editor/min-maps/**/*')
  //   .pipe(gulp.dest('./public/monaco-editor/min-maps/'));
  // gulp.src('./node_modules/monaco-editor/*', { nodir: true })
  //   .pipe(gulp.dest('./public/monaco-editor/'));
  done();
});

gulp.task('default',
  gulp.series(['clean',
  //  'copy:commmon',
   // 'copy:config-store',
    'copy:graph',
    'copy:logging',
   // 'copy:odata',
   // 'copy:pnpjs',
    'copy:sp',
    'copy:sp-admin',
    'copy:queryable',
    'copy:core',
    'copy:msaljsclient',
    // 'copy:adaljsclient',
   // 'copy:sp-addinhelpers',
   // 'copy:sp-clientsvc',
   // 'copy:sp-taxonomy',
    'copy:microsoft-graph-types',
    'copy:microsoft-graph-client',
   // 'copy:msal',
    'copy:msal-browser',
   // 'copy:AuthCodeMSALBrowserAuthenticationProvider',
    'copy:react',
    'copy:mgt-react',
    'copy:monaco-editor',
  ]));
