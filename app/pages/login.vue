<template>
    <UHeader title="Iron Vault" />
    <div class="card flex justify-center">
        <UContainer>
            <UCard>
                <template #header>
                    Access the Iron Vault
                </template>
                <UInput placeholder="Password" v-model="password" type="password" />
                <UButton label="Login" @click="handleLogin" />
                <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
            </UCard>
        </UContainer>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'

    // Define layout and bypass the global route guard logic for this page
    definePageMeta({
        middleware: []
    })

    const password = ref('');
    const loading = ref(false);
    const errorMessage = ref('');

    async function handleLogin() {
        if (!password.value) return;
        loading.value = true;
        errorMessage.value = '';

        try {
            const response = await $fetch('/api/auth/login', {
                method: 'POST',
                body: {
                    password: password.value
                }
            });
            if (response.success) {
                await navigateTo('/');
            } else {
                errorMessage.value = response.message;
            }
        } catch (error: any) {
            errorMessage.value = error.data?.message || 'Access Denied. Check master vault key.'
        } finally {
            loading.value = false;
        }
    }
</script>
