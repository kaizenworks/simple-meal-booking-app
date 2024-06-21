import { compare, hashSync } from 'bcryptjs';

export function hashPassword(password: string) {
	const hashedPassword = hashSync(password, 12);
	return hashedPassword;
}

export async function isPasswordValid(
	password: string,
	hashedPassword: string
) {
	const isValid = await compare(password, hashedPassword);
	return isValid;
}