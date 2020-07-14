# react-unpkg

This package provides some React components and the basic javascript API to leverage UMD over CDN

# How to use

```javascript
import { ResourceService, Import, CDNContext } from 'react-unpkg';

// instanciate the service with a given config
const $resource = new ResourceService(config);

// you can either directly use the API
$resource.import('react').then(() => {
    // from here the global vars are available
    ReactDOM.render(
        // you have to add the React CDN Context Provider
        <CDNContext.Provider value={$resource}>
            <p>Then you can use the Import component</p>
            <Import name="@material/core">
                {({Button}) => <Button color="primary">Hello World</Button>;}
            </Import>
        </CDNContext.Provider>,
        document.getElementById('root')
    );
});
```
