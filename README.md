# react-unpkg

This package provides some React components and the basic javascript API to leverage UMD over CDN

# How to use

you can check the src/stories folder to see how to use it.

```javascript
import { ResourceService, Import, CDNContext } from "react-unpkg";

const bundles = {...};

export function App() {
  <CDNContext.Provider value={new ResourceService({
    bundles,
  })}>
      <Import name="@material-ui/core">
          {(MaterialUI) => {
            return <MaterialUI.Button>Loaded</MaterialUI.Button>
          }}
      </Import>
  </CDNContext.Provider>
}
```
