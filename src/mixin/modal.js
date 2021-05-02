import {mapMutations} from 'vuex';

const modal = {
    methods:{
        ...mapMutations(['showModal','closeModal']),
    }
}

export default modal;