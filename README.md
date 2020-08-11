# react-unpkg

This package provides some React components and the basic javascript API to leverage UMD over CDN

# How to use

To use it you have two things to do. Bootstrap your application using the following API and then start creating components !

```javascript
// the index.js file:
import { ResourceService, Import, CDNContext } from "react-unpkg";
import App from './App';

const bundles = {
  'react-dom': {
    resources: [
      {
        tag: 'script',
        name: 'react-dom',
        version: '16.12.0',
        path: '/umd/react-dom.development.js',
        var: 'ReactDOM',
      },
    ]
  },
  react: {
    dependencies: ['react-dom'],
    resources: [
      {
        tag: 'script',
        name: 'react',
        version: '16.12.0',
        path: '/umd/react.development.js',
        var: 'React',
      },
    ],
  },
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
};

const new $resources = new ResourceService({
  bundles,
});


$resources.import('react').then(() => {
  $resources.import('react-dom').then((ReactDOM) => {
    ReactDOM.render(<App resources={resources} />, document.getElementById('app'));
  });
});


// App.js file:
export function App(props) {
  <CDNContext.Provider value={props.resources}>
      <Import name="@material-ui/core">
          {(MaterialUI) => {
            return <MaterialUI.Button>Loaded</MaterialUI.Button>
          }}
      </Import>
  </CDNContext.Provider>
}
```
