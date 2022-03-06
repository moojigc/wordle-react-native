import { GameConstants } from '../constants/GameConstants';

export namespace Utils {
	export function padEmptyStrings(length = 6) {
		return ''.padEnd(length, GameConstants.FILLER_VALUE);
	}
	type Fn = (...args: any[]) => any;
	/**
	 * Log the args of a method call
	 */
	export function log<T extends Fn>() {
		return (
			target: any,
			method: string,
			descriptor: TypedPropertyDescriptor<T>
		) => {
			const original = descriptor.value!;
			return {
				...descriptor,
				value: function (...args: any[]) {
					const returns = original.bind(this)(...args);
					console.log(
						`[${
							// @ts-ignore
							this.debugID ||
							target.name ||
							target.constructor.name
						} ${new Date().toLocaleTimeString()}].${method}(${args.join(
							', '
						)}): ${returns}`
					);
					return returns;
				}
			};
		};
	}
}
