<template>
    <div class="buma">
        <div class="top-anchor"></div>
        <navbar />
        <mobileSearchNavbar />
        <wikiHero />
        <section :class="bulma('section')">
            <div :class="bulma('container')">
                <bNotification v-if="$store.state.config['wiki.sitenotice']" color="is-warning">
                    <span v-html="$store.state.config['wiki.sitenotice']"></span>
                </bNotification>

                <bNotification v-if="hasUnreadUserDiscussion" :class="bulma('is-link')">
                    <nuxtLink :to="doc_action_link(user_doc($store.state.session.account.name), 'discuss')">사용자 토론</nuxtLink>이 있습니다.
                    확인해주세요.
                </bNotification>

                <div class="wiki-article" @dblclick="doBehaviorWhenDblClick">
                    <nuxt />

                    <skinLicense v-if="$store.state.page.viewName === 'license'"></skinLicense>
                </div>
            </div>
        </section>
        <bumaFooter />
        <jumpButtons />
    </div>
</template>

<style>
@import './css/bulma.min.css';
@import './css/layout.min.css';
@import './css/name-gradient.css';
@import './css/userDocumentProfile.css';
@import './css/interwiki.css';
</style>

<script>
import common from '~/mixins/common';
import bulma from './src/bulma';
import navbar from './components/navbar';
import mobileSearchNavbar from './components/navbar/mobileSearchNavbar.vue';
import wikiHero from './components/wikiHero';
import bNotification from './components/bulma/b-notification.vue';
import jumpButtons from './components/jumpButtons.vue';
import skinLicense from './components/skinLicense.vue';
import bumaFooter from './components/footer.vue';
import initEasterEgg from './easter-egg';
import initKonamiEasterEgg from './konami-egg';

export default {
    mixins: [common],
    components: {
        navbar,
        mobileSearchNavbar,
        wikiHero,
        bNotification,
        jumpButtons,
        skinLicense,
        bumaFooter
    },
    loadingBarColor(isDark) {
        return isDark ? 'white' : 'black';
    },
    computed: {
        hasUnreadUserDiscussion() {
            return (
                this.$store.state.session.user_document_discuss &&
                this.$store.state.localConfig['wiki.hide_user_document_discuss'] !== this.$store.state.session.user_document_discuss
            );
        }
    },
    watch: {
        '$store.state.currentTheme'(newValue) {
            this.changeTheme(newValue);
        },
		'$store.state.viewData.userProfile'(val) {
			if (val) {
				this.showProfileImage();
			}
        },
        '$store.state.page.data.document.title'(val) {
            const title = val?.trim().toLowerCase()
            if (title !== 'do a barrel roll') {}
			else {doABarrelRoll();}
        }
    },
    methods: {
        changeTheme(theme) {
            document.documentElement.dataset.theme = theme;
        },
        doBehaviorWhenDblClick() {
            if (!this.$store.state.page.data.document) return;

            const action = this.$store.state.localConfig['buma.behaviorWhenDblClick'];
            switch (action) {
                case 'edit':
                case 'history':
                    const link = this.doc_action_link(this.$store.state.page.data.document, action);
                    this.$router.push(link);
                    break;
                case 'doNothing':
                case 'skinDefault':
                default:
                    break;
            }
        },
        showProfileImage() {
			this.$nextTick(() => {
			    if(this.$store.state['viewData'].userProfile) {
                    const existUserProfile = document.querySelector('.user-profile-table');
                    if(existUserProfile) existUserProfile.remove();
                    const content = document.querySelector('.wiki-content')
                    let date = new Date(this.$store.state['viewData'].userProfile.createdAt).toLocaleDateString();
                    let profileHtml = `<div class="wiki-paragraph">
                          <table class="user-profile-table">
                              <tr>
                                  <td colspan=2 class="avatar-cell">
                                      <img src="${this.$store.state['viewData'].userProfile.gravatarUrl}" alt="Avatar" class="avatar">
                                  </td>
                              </tr>
                              <tr>
                                  <td><strong class="clone-trigger">사용자명</strong></td>
                                  <td>${this.$store.state['viewData'].userProfile.username}</td>
                              </tr>
                              <tr>
                                  <td><strong>가입일</strong></td>
                                  <td>${date}</td>
                              </tr>
							  <tr>
							      <td><strong>권한</strong></td>
								  <td>${this.$store.state['viewData'].userProfile.userPerm}</td>
							  </tr>
                              <tr>
                                  <td><strong>ACL Group</strong></td>
                                  <td>${this.$store.state['viewData'].userProfile.aclGroups}</td>
                              </tr>
                          </table>
                      </div>`;
                content.insertAdjacentHTML(
                    'afterbegin',
                    profileHtml
                    );
				bindCloneTrigger();
				}
			})
        },
        bulma
    },
    mounted() {
        this.changeTheme(this.$store.state.currentTheme);
		this.showProfileImage();
		if (typeof window !== 'undefined') {
			initEasterEgg()
		};
		initKonamiEasterEgg();
    }
};
</script>
