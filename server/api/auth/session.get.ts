export default defineEventHandler((event) => {
    const session = getCookie(event, 'iron_vault_session');

    // Return simple boolean flag to the frontend client
    return {
        authenticated: session === 'authenticated'
    };
});