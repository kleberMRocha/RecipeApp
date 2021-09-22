<template>
  <div class="notification-body" ref="notification">
    <font-awesome-icon :icon="
      notificationsInfos.isFav 
        ? ['fa', 'heart'] 
        : ['fa', 'heart-broken']" 
    />
    <div>
      <u> {{ notificationsInfos.meal ? notificationsInfos.meal.strMeal : '' }}</u>  has been
      {{ notificationsInfos.isFav ? 'added' : 'removed' }} to favorites!
    </div>
  </div>
</template>

<script>
import {mapState} from '../vuex/nameSpaceNotification';

export default {
  name: 'Notification',
  data() {
  return {
      isVisible: false,
  };
},
  watch: {
    notificationsInfos() {
      if(this.isVisible) return;
      this.$refs.notification.classList = ['notification-body'];
      this.$refs.notification.style.display = 'flex';
      this.isVisible = true;
      setTimeout(() => {
             this.$refs.notification.classList = ['outAnimation'];
             this.isVisible = false;
      }, 5000);
     
    },
  },
  computed: {
    ...mapState({
      notificationsInfos: state => state.notificationsInfos
    })
  },
  mounted() {
    this.$refs.notification.style.display = 'none';
  },
};
</script>

<style scoped>
@keyframes entrance {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes out {
  from {
    right: 0;
  }

  to {
    right: -99999px;
  }
}

.notification-body {
  padding: 8px;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: entrance ease-in-out .5s;
  z-index: 9999;
  max-width: 300px;
  width: 300px;
  height: 90px;
  top: 0;
  right: 0;
  margin: 16px;
  border-radius: 8px;
  background: white;
  box-shadow: 60px black;
}

.outAnimation {
  padding: 8px;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: out 50s;
  z-index: 9999;
  max-width: 300px;
  width: 300px;
  height: 90px;
  top: 0;
  right: 0;
  margin: 16px;
  border-radius: 8px;
  background: white;
  box-shadow: 60px black;
}

.notification-body svg {
  color: tomato;
  font-size: 30px;
  margin: 0 8px;
}

.outAnimation svg {
  color: tomato;
  font-size: 30px;
  margin: 0 8px;
}
</style>
