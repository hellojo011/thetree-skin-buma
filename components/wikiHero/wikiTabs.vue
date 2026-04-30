<template>
    <ul>
        <template v-for="menu in menus">
            <li v-if="menu.starTab" class="star-tab" :class="{ starred: menu.starred }">
                <nuxtLink :to="menu.starred ? menu.unstarLink : menu.starLink">
                    <span :class="bulma('icon')">
                        <FontAwesomeIcon :icon="faStar" />
                    </span>
                    <span class="wiki-article-menu-text"> {{ menu.starred ? $t('skin_buma:unstarred') : $t('skin_buma:starred') }} (</span
                    ><span class="star-count">{{ menu.starCount }}</span
                    ><span class="wiki-article-menu-text">)</span>
                </nuxtLink>
            </li>
            <li v-else :class="bulma({ 'is-active': menu.active }, true)">
                <nuxtLink :to="menu.href">
                    <span :class="bulma('icon')">
                        <FontAwesomeIcon :icon="menu.icon" />
                    </span>
                    <span class="wiki-article-menu-text"> {{ menu.text }}</span>
                </nuxtLink>
            </li>
        </template>
    </ul>
</template>

<script>
import common from '~/mixins/common';
import bulma from '../../src/bulma';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faComments } from '@fortawesome/free-regular-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faRandom } from '@fortawesome/free-solid-svg-icons';
import { faHistory } from '@fortawesome/free-solid-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import i18next from 'i18next'
const t = i18next.t.bind(i18next)

export default {
    mixins: [common],
    methods: {
        bulma
    },
    created() {
        this.faStar = faStar;
    },
    components: {
        FontAwesomeIcon
    },
    computed: {
        menus() {
            const viewName = this.$store.state.page.viewName;
            const document = this.$store.state.page?.data?.document;
            let menus = [
                {
                    active: ['wiki', 'notfound'].includes(viewName),
                    href: this.doc_action_link(document, 'w'),
                    icon: faEye,
                    text: i18next.t('acl.types.0')
                },
                {
                    active: ['edit', 'edit_request', 'edit_edit_request'].includes(viewName),
                    href: this.doc_action_link(document, 'edit'),
                    icon: faEdit,
                    text: i18next.t('title_description.edit')
                },
                {
                    active: ['thread', 'thread_list', 'thread_list_clone'].includes(viewName),
                    href: this.doc_action_link(document, 'discuss'),
                    icon: faComments,
                    text: i18next.t('title_description.thread')
                },
                {
                    active: viewName === 'move',
                    href: this.doc_action_link(document, 'move'),
                    icon: faArrowRight,
                    text: i18next.t('title_description.move')
                },
                {
                    active: viewName === 'delete',
                    href: this.doc_action_link(document, 'delete'),
                    icon: faTrashAlt,
                    text: i18next.t('title_description.delete')
                },
                {
                    active: viewName === 'backlink',
                    href: this.doc_action_link(document, 'backlink'),
                    icon: faRandom,
                    text: i18next.t('title_description.backlinks')
                },
                {
                    active: viewName === 'history',
                    href: this.doc_action_link(document, 'history'),
                    icon: faHistory,
                    text: i18next.t('title_description.history')
                },
                {
                    active: viewName === 'acl',
                    href: this.doc_action_link(document, 'acl'),
                    icon: faKey,
                    text: 'ACL'
                }
            ];

            if (viewName === 'wiki')
                menus.push({
                    starTab: true,
                    starred: this.$store.state.page.data.starred,
                    starCount: this.$store.state.page.data.star_count,
                    starLink: this.doc_action_link(document, 'member/star'),
                    unstarLink: this.doc_action_link(document, 'member/unstar')
                });

            if (this.$store.state.page.data.user)
                menus.push({
                    active: false,
                    href: this.contribution_link(this.$store.state.page.data.user.uuid),
                    icon: faChartLine,
                    text: i18next.t('skin.contribution_link')
                });

            return menus;
        }
    }
};
</script>
