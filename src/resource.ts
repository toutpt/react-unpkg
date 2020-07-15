import { bundles } from './config';
import { Resource, Bundle } from './types';

/**
 * testResource is a function to check if a bundle is loaded
 * and it's global variable is available.
 */
function testResource(resource, cb?: any) {
	let loaded = false;
	if (resource.var) {
		loaded = !!window[resource.var];
	} else {
		console.error('no way to test if load happens on ', resource);
		loaded = true;
	}
	if (loaded) {
		if (cb) {
			cb();
		}
	} else if (cb) {
		setTimeout(() => {
			testResource(resource, cb);
		}, 500);
	}
	return loaded;
}

/**
 * utils to setup onload event listener
 */
function onLoad(scriptElement, resource, callback) {
	scriptElement.addEventListener('load', () => {
		testResource(resource, callback);
	});
}

function defaultGetURL(resource: Resource) {
	if (!resource) {
		return;
	}
	if (resource.url) {
		return resource.url;
	}
	if (resource.name && resource.version && resource.path) {
		return `https://unpkg.com/${resource.name}@${resource.version}${resource.path}`;
	}
	throw new Error(
		`resource is missing either url or name/version/path, ${JSON.stringify(resource)}`,
	);
}

class ResourceService {
	private _bundles: Map<string, Bundle>;
	public _getURL: (any) => string;
	private loaded: Record<string, boolean>;

	constructor(options: any = {}) {
		this._bundles = new Map<string, Bundle>();
		this.loaded = {};
		this._getURL = options.getURL;
		Object.keys(bundles || {}).forEach(k => {
			this._bundles.set(k, bundles[k]);
		});
		if (options?.bundles) {
			Object.keys(options.bundles || {}).forEach(k => {
				this._bundles.set(k, options.bundles[k]);
			});
		}
	}
	getURL(resource: Resource) {
		let url;
		if (this._getURL) {
			url = this._getURL(resource);
		}
		if (!url) {
			return defaultGetURL(resource);
		}
	}
	getBundle(id: string) {
		return this._bundles.get(id);
	}
	getVar(id: string) {
		const bundle = this.getBundle(id);
		const resources = Array.from(bundle.resources);
		const found = resources.reduce((acc: Array<any>, value: Resource) => {
			if (value.var) {
				acc.push(window[value.var]);
			}
			return acc;
		}, []);
		if (found.length === 0) {
			return;
		}
		if (found.length === 1) {
			return found[0];
		}
		return found;
	}
	getResources(id: string) {
		const bundle = this.getBundle(id);
		if (!bundle) {
			console.log('### no bundle found for', id, this._bundles.get(id));
			return [];
		}
		const buff = Array.from(bundle.resources);
		let deps = [];
		if (bundle.dependencies) {
			deps = bundle.dependencies.reduce((acc, bundleId) => {
				this.getResources(bundleId).forEach(r => {
					acc.push(r);
				});
				return acc;
			}, []);
		}
		return deps.concat(buff);
	}
	import(id: string) {
		const resources = this.getResources(id);
		console.log('####', resources, id);
		this.addLink(resources.filter(r => r.tag === 'link'));
		return this.addScripts(resources.filter(r => r.tag === 'script'));
	}

	/**
	 * addScripts consume the resources array using Array.shift api
	 * to add <script /> tags in the DOM and let the browser load the bundles.
	 * It wait for each script to be loaded using onload event
	 * before recursively call addScript on the array modified.
	 * Only exception is script configuration using defer property.
	 */
	addScripts(resources) {
		return new Promise((resolve, reject) => {
			const resource = resources.shift();
			const onFinish = () => {
				if (resources.length > 0) {
					return resolve(this.addScripts(resources));
				} else {
					return resolve();
				}
			};
			const uri = this.getURL(resource);
			if (uri && !this.loaded[uri]) {
				if (resource.tag === 'script') {
					this.loaded[uri] = true;
					if (testResource(resource)) {
						return onFinish();
					}
					const script = document.createElement('script');
					if (resource.nomodule) {
						script.setAttribute('nomodule', resource.nomodule);
					}
					script.setAttribute('type', resource.type ? resource.type : 'text/javascript');
					onLoad(script, resource, onFinish);
					script.setAttribute('src', uri);
					script.onerror = e => {
						console.error(e);
						reject();
					};
					document.head.appendChild(script);
				} else {
					return onFinish();
				}
			} else if (uri) {
				// uri and loaded
				if (testResource(resource, onFinish)) {
					return onFinish();
				}
			} else {
				return onFinish();
			}
		});
	}
	addLink(resources) {
		console.log('### addLink', resources);
		if (resources.length > 0) {
			resources.forEach(resource => {
				const link = document.createElement('link');
				link.setAttribute('rel', 'stylesheet');
				link.setAttribute('href', this.getURL(resource));
				link.onload = () => {
					console.log('link loaded', resource);
				};
				console.log('add <link href=', this.getURL(resource));
				document.head.appendChild(link);
			});
		}
	}
}

export { ResourceService };
