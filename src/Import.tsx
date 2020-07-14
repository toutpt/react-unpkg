import React, { useContext, useEffect, useState } from 'react';
import { CDNContext } from './Context';

export function Import({name, children}) {
	const cdn = useContext(CDNContext);
	const [state, setModule] = useState({id: name, mod: undefined});

	useEffect(() => {
		cdn.import(name).then(() => {
			console.log('#### Import loaded')
			setModule({ id:name, mod: cdn.getVar(name) });
		}).catch(e => {
			console.error(e);
		});
	}, [name, cdn]);
	if (typeof children !== 'function') {
		throw new Error('children must be a function');
	}
	if (state.id === name && state.mod) {
		// loaded
		return children(state.mod);
	}
	return <p>Loading</p>;
}
