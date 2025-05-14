<script setup lang="ts">
import { useColorMode } from "@vueuse/core";
import { Button } from "../components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../components/ui/dropdown-menu"
import { Sun, Moon } from "lucide-vue-next";

const mode = useColorMode()
</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button variant="outline" size="icon">
                <Sun v-if="mode === 'light'" />
                <Moon v-if="mode === 'dark'" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuItem @click="mode = 'light'">
                <Sun class="mr-2" />
                Claro
            </DropdownMenuItem>
            <DropdownMenuItem @click="mode = 'dark'">
                <Moon class="mr-2" />
                Escuro
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
</template>