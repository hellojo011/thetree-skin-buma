<template>
    <bDropdown right-dropdown :icon="faUserSecret" :label="$t('skin_buma:anonymous')">
		<settingModalLink :class="bulma('navbar-item')">
		    <b>{{ $store.state.session.account.name }}</b>
		</settingModalLink>
        <settingModalLink :class="bulma('navbar-item')">
            <span :class="bulma('icon')"> <FontAwesomeIcon :icon="faWrench" /> </span>&nbsp; {{ $t('skin_buma:skin_settings') }}
        </settingModalLink>
        <template v-if="uuid">
            <nuxtLink :to="contribution_link(uuid)" :class="bulma('navbar-item')">
                <span :class="bulma('icon')"> <FontAwesomeIcon :icon="faFileAlt" /> </span>&nbsp; {{ $t('skin.my_contribution_document') }}
            </nuxtLink>
            <nuxtLink :to="contribution_link_discuss(uuid)" :class="bulma('navbar-item')">
                <span :class="bulma('icon')"> <FontAwesomeIcon :icon="faFileContract" /> </span>&nbsp; {{ $t('skin.my_contribution_discuss') }}
            </nuxtLink>
            <nuxtLink :to="contribution_link_edit_request(uuid)" :class="bulma('navbar-item')">
                <span :class="bulma('icon')"> <FontAwesomeIcon :icon="faFileSignature" /> </span>&nbsp; {{ $t('skin.my_contribution_edit_request') }}
            </nuxtLink>
        </template>
        <div :class="bulma('navbar-divider')"></div>
        <nuxtLink :to="{ path: '/member/login', query: { redirect: $route.fullPath } }" :class="bulma('navbar-item')">
            <span :class="bulma('icon')"> <FontAwesomeIcon :icon="faSignInAlt" /> </span>&nbsp; {{ $t('skin.login') }}
        </nuxtLink>
    </bDropdown>
</template>

<script>
import common from '~/mixins/common';
import bulma from '../../src/bulma';
import bDropdown from '../bulma/b-dropdown.vue';
import settingModalLink from './settingModalLink.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faWrench, faFileAlt, faFileContract, faFileSignature, faSignInAlt, faUserSecret } from '@fortawesome/free-solid-svg-icons';

export default {
    created() {
        this.faWrench = faWrench;
        this.faFileAlt = faFileAlt;
        this.faFileContract = faFileContract;
        this.faFileSignature = faFileSignature;
        this.faSignInAlt = faSignInAlt;
        this.faUserSecret = faUserSecret;
    },
    mixins: [common],
    components: {
        bDropdown,
        settingModalLink,
        FontAwesomeIcon
    },
    methods: {
        bulma
    },
    computed: {
        name() {
            return this.$store.state.session.account.name;
        },
        uuid() {
            return this.$store.state.session.account.uuid;
        }
    }
};
</script>
