<template>
    <div :class="bulma('navbar-brand')">
        <nuxtLink to="/" :class="bulma('navbar-item')">
			<img v-if="$store.state.currentTheme === 'dark'" :src="$store.state.config['skin.buma.logo_dark']" />
			<img v-else :src="$store.state.config['skin.buma.logo_light']"/>
		</nuxtLink>
        <a :class="bulma({ 'navbar-burger': true, 'is-active': isNavbarActive })"
            @click.prevent="toggleNavbarBurger"
            data-testid="navbar-activation-button-on-mobile"
        >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </a>
    </div>
</template>

<script setup>
import bulma from '../../src/bulma';

const { isNavbarActive, toggleNavbarBurger } = defineProps(['isNavbarActive', 'toggleNavbarBurger']);
</script>
