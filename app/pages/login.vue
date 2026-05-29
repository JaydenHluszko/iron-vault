<template>
    <div class="card">
        <Menubar :model="items" />
    </div>
    <div class="card flex justify-center">
        
    </div>
</template>

<script setup>
    import { ref } from "vue";

    const items = ref([
        {
            label: 'Iron Vault',
        }
    ]);
</script>
