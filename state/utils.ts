import { GameConstants } from '../constants';

export namespace Utils {
	export function padEmptyStrings(length = 6) {
		return ''.padEnd(length, GameConstants.FILLER_VALUE);
	}
	/**
	 * Log the args of a method call
	 */
	export function debug<T>() {
		return (
			target: any,
			method: string,
			descriptor: PropertyDescriptor
		) => {
			const original = descriptor.value!;
			Object.defineProperty(target, method, {
				...descriptor,
				value(...args: any[]) {
					// @ts-ignore
					const returns = original.bind(this)(...args);
					console.log(
						`${
							target.debugID ||
							target.name ||
							target.constructor.name
						}.${method}(${args.join(', ')}): ${returns}`
					);
					return returns;
				}
			});
		};
	}
}
