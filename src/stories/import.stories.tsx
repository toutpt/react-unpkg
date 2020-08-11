import React from "react";
import ReactDOM from "react-dom";

import { ResourceService, Import, CDNContext } from "../index";
import { bundles } from './config';

// share global for UMDs to find React & ReactDOM
window.React = React;
window.ReactDOM = ReactDOM;

export default { title: "React-unpkg Components" };

export const Lazy = () => {
	const [show, setShow] = React.useState(false);
	return (
		<CDNContext.Provider value={new ResourceService({
			bundles,
		})}>
				<button disabled={show} onClick={() => setShow(!show)}>{!show ? 'Display lazy loaded component' : 'Done !'}</button>
				<div>
					{show && (
						<Import name="@material-ui/core">
								{(MaterialUI) => {
									return <MaterialUI.Button>I am a MaterialUI Button</MaterialUI.Button>
								}}
						</Import>
					)}
				</div>
		</CDNContext.Provider>
	);
}
