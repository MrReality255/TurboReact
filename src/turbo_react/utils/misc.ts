export const MiscUtils = {
	distint<T>(options: T[]): T[] {
		return options.filter((v, idx, arr) => arr.indexOf(v) == idx);
	},
	using<T, R = T>(value: T, fct: (value: T) => R) {
		return fct(value);
	},
	orUndefined<T, R = T>(
		x: T | undefined,
		fct: (x: T) => R,
		defaultValue?: R | undefined
	): R | undefined {
		return x !== undefined ? fct(x) : defaultValue;
	},
};
