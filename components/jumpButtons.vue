<template>
    <div v-if="$store.state.localConfig['buma.enableJumpButtons'] !== 'no'" class="jump-buttons">
        <ul>
            <li @click="goUp">
                <div class="jump-up" :class="bulma('icon')" title="위로 이동">
                    <FontAwesomeIcon :icon="faArrowUp" />
                </div>
            </li>
            <li @click="goDown">
                <div class="jump-down" :class="bulma('icon')" title="아래로 이동">
                    <FontAwesomeIcon :icon="faArrowDown" />
                </div>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.jump-buttons {
    position: fixed;
    bottom: 10px;
    right: 10px;
}

.jump-buttons ul {
    list-style-type: none;
}

.jump-buttons ul li {
    cursor: pointer;
    display: inline-block;
    background: #b73340;
    border: 1px solid #6a1e25;
    font-size: 30px;
    text-align: center;
    color: white;
    width: 50px;
    height: 45px;
}

.jump-buttons ul li:hover {
    background: #8b2731;
}

.jump-buttons ul li:first-child {
    border-radius: 5px 0px 0px 5px;
}

.jump-buttons ul li:last-child {
    border-radius: 0px 5px 5px 0px;
}
</style>

<script setup>
import bulma from '../src/bulma';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

const goUp = () => document.querySelector('.top-anchor').scrollIntoView({ behavior: 'smooth', block: 'start' });
const goDown = () => document.querySelector('footer').scrollIntoView({ behavior: 'smooth', block: 'end' });
</script>
