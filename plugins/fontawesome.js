// plugins/fontawesome.js
import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

library.add(faPencilAlt);

Vue.component('font-awesome-icon', FontAwesomeIcon);
