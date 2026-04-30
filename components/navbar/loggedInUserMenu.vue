<template>
    <bDropdown right-dropdown :icon="faUser" :label="name">
        <settingModalLink :class="bulma('navbar-item')">
            <span :class="bulma('icon')"> <FontAwesomeIcon :icon="faWrench" /> </span>&nbsp; {{ $t('skin_buma:skin_settings') }}
        </settingModalLink>
        <template v-for="(submenus, i) in menus">
            <nuxt-link :to="submenu.href" :class="bulma('navbar-item')" v-for="submenu in submenus">
                <span :class="bulma('icon')">
                    <FontAwesomeIcon :icon="submenu.icon" />
                </span>
                &nbsp;{{ submenu.text }}
            </nuxt-link>
            <div :class="bulma('navbar-divider')" v-if="i !== menus.length - 1"></div>
        </template>
    </bDropdown>
</template>

<script>
import common from '~/mixins/common';
import bulma from '../../src/bulma';
import bDropdown from '../bulma/b-dropdown.vue';
import settingModalLink from './settingModalLink.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUserCircle, faStickyNote } from '@fortawesome/free-regular-svg-icons';
import { faFileAlt, faFileContract, faFileSignature, faBookmark, faSignOutAlt, faUser, faWrench, faPenClip } from '@fortawesome/free-solid-svg-icons';
import i18next from 'i18next'

export default {
    mixins: [common],
    created() {
        this.faUser = faUser;
        this.faWrench = faWrench;
    },
    components: {
        bDropdown,
        FontAwesomeIcon,
        settingModalLink
    },
    methods: {
        bulma
    },
    computed: {
        name() {
            return this.$store.state.session.account.name;
        },
        menus() {
            const name = this.$store.state.session.account.name;
            const uuid = this.$store.state.session.account.uuid;
			const t = i18next.t.bind(i18next)
            return [
                [
                    {
                        href: '/member/mypage',
                        icon: faUserCircle,
                        text: t('titles.mypage')
                    },
                    {
                        href: this.doc_action_link(this.user_doc(name), 'w'),
                        icon: faStickyNote,
                        text: t('skin.my_user_doc')
                    },
					{
						href: this.doc_action_link(this.user_doc(name), 'w') + encodeURI("/연습장"),
						icon: faPenClip,
						text: t('skin_buma:mySandbox')
					}
                ],
                [
                    {
                        href: this.contribution_link(uuid),
                        icon: faFileAlt,
                        text: t('skin.my_contribution_document')
                    },
                    {
                        href: this.contribution_link_discuss(uuid),
                        icon: faFileContract,
                        text: t('skin.my_contribution_discuss')
                    },
                    {
                        href: this.contribution_link_edit_request(uuid),
                        icon: faFileSignature,
                        text: t('skin.my_contribution_edit_request')
                    },
                    {
                        href: '/member/starred_documents',
                        icon: faBookmark,
                        text: t('skin.my_stars')
                    }
                ],
                [
                    {
                        href: { path: '/member/logout', query: { redirect: this.$route.fullPath } },
                        icon: faSignOutAlt,
                        text: t('skin.logout')
                    }
                ]
            ];
        }
    }
};
</script>
