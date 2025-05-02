const loadImage = (
	url: string,
	succeedWidth?: number
): Promise<HTMLImageElement> => {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.src = url;
		img.onload = () => {
			if (succeedWidth === undefined) {
				resolve(img);
			} else if (succeedWidth === img.width) {
				resolve(img);
			} else {
				reject('Image width is not 32');
			}
		};
		img.onerror = (error) => reject(error);
	});
};

export const tryToGetFavicon = async (
	bookmarkUrl: string
): Promise<string | null> => {
	const url = new URL(bookmarkUrl);

	const hostFavicon = `https://www.google.com/s2/favicons?domain_url=${url.hostname}&sz=32`;
	try {
		await loadImage(hostFavicon, 32);
		return hostFavicon;
	} catch (error) {}

	const domain = url.host.split('.').slice(-2).join('.');
	const domainFavicon = `https://www.google.com/s2/favicons?domain_url=${domain}&sz=32`;
	try {
		await loadImage(domainFavicon, 32);
		return domainFavicon;
	} catch (error) {}

	const defaultFavicon = `${url.origin}/favicon.ico`;
	try {
		await loadImage(defaultFavicon);
		return defaultFavicon;
	} catch (error) {}

	return null;
};
