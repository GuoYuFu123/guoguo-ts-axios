import { defineComponent } from 'vue';

export default defineComponent({
    name: 'a',
  setup() {
    return () => (<div>
        <router-view></router-view>
    </div>);
  },
});
