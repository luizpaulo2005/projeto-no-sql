<script setup lang="ts">
import TrocarTema from '@/components/TrocarTema.vue';
import { Button } from './ui/button';
</script>

<template>
    <header class="border rounded-md p-3 flex items-center justify-between bg-card">
        <div class="flex items-center gap-2">
           <Button variant="link">
             <a href="/" class="text-xl font-semibold">Eventify</a>
           </Button>
            <a href="/eventos">Eventos</a>
        </div>
        <div class="flex items-center gap-2">
            <TrocarTema />
            <Button>
                Fazer login
            </Button>
        </div>
    </header>
</template>