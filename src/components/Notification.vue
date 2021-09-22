<template>
  <div class="notification-body" ref="notification">
    <font-awesome-icon icon="heart" />
    {{ infos.meal ? infos.meal.strMeal : '' }} has been
    {{ infos.isFav ? 'added' : 'removed' }} to favorites!
  </div>
</template>

<script>
export default {
  name: 'Notification',
  props: {
    infos: {
      type: Object,
    },
  },
  watch: {
    infos() {
      this.$refs.notification.style.display = 'flex';
      this.$refs.notification.classList = 'outAnimation';

      setTimeout(() => {
        this.$refs.notification.style.display = 'none';
        this.$refs.notification.classList = 'notification-body';
      }, 15000);
    },
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
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: entrance ease-in-out 1s;
  z-index: 9999;
  max-width: 300px;
  width: 300px;
  height: 90px;
  bottom: 0;
  right: 0;
  margin: auto 16px 16px 16px;
  border-radius: 8px;
  background: white;
  box-shadow: 60px black;
}

.outAnimation {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: out 15s ease-in-out 2s;
  z-index: 9999;
  max-width: 300px;
  width: 300px;
  height: 90px;
  bottom: 0;
  right: 0;
  margin: auto 16px 16px 16px;
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
