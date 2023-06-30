const callWithRetry = async (fn: () => Promise<any>, depth : number = 0) : Promise<void> => {
    const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

	try {
		return await fn();
	}catch(e) {
		if (depth > 7) {
			throw e;
		}
		await wait(2 ** depth * 10);
	
		return callWithRetry(fn, depth + 1);
	}
}

export { callWithRetry }