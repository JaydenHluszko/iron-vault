export default defineNuxtRouteMiddleware(async (to) => {
    // Prevent infinite loops when trying to access the login page itself
    if (to.path === '/login') return;

    // Ping our session API route
    const { data } = await useFetch<{ authenticated: boolean }>('/api/auth/session');

    // If the bouncer says no, boot them straight back to the login wall
    if (!data.value?.authenticated) {
        return navigateTo('/login');
    }
});