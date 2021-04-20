function isWindows() {
	return navigator.platform === 'Win32' || navigator.platform === 'Win64';
}

export default isWindows;
