<template>
    <nav :class="bulma('nav navbar')" role="navigation" aria-label="main navigation">
        <logo :is-navbar-active="isNavbarActive" :toggle-navbar-burger="toggleNavbarBurger" />
        <div :class="bulma({ 'navbar-menu': true, 'is-active': isNavbarActive })" id="mainNavbar" data-testid="main-navbar">
            <div :class="bulma('navbar-start')">
                <nuxtLink to="/RecentChanges" :class="bulma('navbar-item')">
                    <span :class="bulma('icon')"> <FontAwesomeIcon :icon="faBinoculars" /> </span>&nbsp; {{ $t('skin.recent_changes') }}
                </nuxtLink>
                <nuxtLink to="/RecentDiscuss" :class="bulma('navbar-item')">
                    <span :class="bulma('icon')"> <FontAwesomeIcon :icon="faComments" /> </span>&nbsp; {{ $t('skin.recent_discuss') }}
                </nuxtLink>
                <bDropdown :icon="faCogs" :label="$t('skin.special_tab')">
				    <a :class="bulma('navbar-item')" href="https://board.furpark.kr" target="_blank"><span :class="bulma('icon')"><FontAwesomeIcon :icon="faHouse" /></span>&nbsp; Furpark Shelter</a>
                    <nuxtLink :class="bulma('navbar-item')" :to="menu.href" v-for="menu in toolMenus" :key="menu.href">
                        <span :class="bulma('icon')"><FontAwesomeIcon :icon="menu.icon" /></span>
                        &nbsp;{{ menu.text }}
                    </nuxtLink>
                </bDropdown>
            </div>
            <div :class="bulma('navbar-end')">
                <div :class="bulma('navbar-item is-hidden-touch')">
                    <searchForm />
                </div>
                <loggedInUserMenu v-if="isLoggedIn" />
                <anonymousUserMenu v-else />
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import bulma from '../../src/bulma';
import logo from './logo.vue';
import bDropdown from '../bulma/b-dropdown.vue';
import searchForm from '../searchForm.vue';
import loggedInUserMenu from './loggedInUserMenu.vue';
import anonymousUserMenu from './anonymousUserMenu.vue';
import fixedToolMenus from './fixedToolMenus';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBinoculars, faComments, faCogs, faHouse } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

let isNavbarActive = ref(false);
const toggleNavbarBurger = () => (isNavbarActive.value = !isNavbarActive.value);
const store = useStore();

const toolMenus = computed(() =>
    fixedToolMenus().concat(
        (store.state.session.menus ?? []).map((i) => ({
            icon: faHeart,
            text: i.t,
            href: i.l
        }))
    )
);
const isLoggedIn = computed(() => store.state.session.account.type === 1);
</script>
