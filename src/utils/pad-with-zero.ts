export function padWithZero<T extends number | string, U extends number>(
    number: T,
    width: U
): string {
    return number.toString().padStart(width, '0');
}