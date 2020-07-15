import React from "react";
import ReactDOM from "react-dom";

import { ResourceService, Import, CDNContext } from "../index";

// share global for UMDs to find React & ReactDOM
window.React = React;
window.ReactDOM = ReactDOM;

export default { title: "React-unpkg Components" };

const bundles = {
  '@material-ui/core': {
    dependencies: [],
		resources: [
			{
				tag: 'script',
				name: '@material-ui/core',
				version: '4.10.0',
				path: '/umd/material-ui.production.min.js',
				var: 'MaterialUI',
      },
      {
        tag: 'link',
        url: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap',
      }
		],
  }
}
export const Test = () => (
  <CDNContext.Provider value={new ResourceService({
    bundles,
  })}>
      <Import name="@material-ui/core">
          {(MaterialUI) => {
            return <MaterialUI.Button>Loaded</MaterialUI.Button>
          }}
      </Import>
  </CDNContext.Provider>
);
