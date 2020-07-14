import React from "react";


import { ResourceService, Import, CDNContext } from "../index";


export default { title: "Exercise Component" };

// If you don't want to use Chakra, simply uncomment the following story,
// and comment the one after.

// export const Basic = () => <MyModal />;
const bundles = {
  '@material-ui/core': {
    dependencies: [],
		resources: [
			{
				tag: 'script',
				name: '@material-ui/core',
				version: '4.11.0',
				path: '/umd/material-ui.development.js',
				var: 'MaterialUI',
			}
		],
  }
}
export const Test = () => (
  <CDNContext.Provider value={new ResourceService({
    bundles,
  })}>
      <Import name="@material/core">
        {(mod) => {
          console.log(mod);
          return <p>Loaded</p>;
        }}
      </Import>
  </CDNContext.Provider>
);
