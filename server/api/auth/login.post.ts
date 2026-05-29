export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const config = useRuntimeConfig();

    // Validate request structure
    if (!body || !body.password) {
        throw createError({ statusCode: 400, message: 'Password is required' });
    }

    // Compare against your .env secret
    if (body.password !== process.env.VAULT_PASSWORD) {
        throw createError({ statusCode: 401, message: 'Invalid master vault key' });
    }

    // Set a highly secure, HTTP-only session cookie
    setCookie(event, 'iron_vault_session', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // Cookie lives for 7 days
    });

    return { success: true, message: 'Vault unlocked successfully' };
});