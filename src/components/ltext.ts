<script lang="ts">
// import { computed } from 'vue'
import { pick } from 'lodash-es'
import { transformToComponentProps, textDefaultProps, textStylePropNames } from '../defaultProps'

const defaultProps = transformToComponentProps(textDefaultProps)
console.log(defaultProps);
export default {
  name: '',
  components: {
  },
  props: {
    tag: { type: String, default: 'div'},
    ... defaultProps
  },
  data () {
    return {
    }
  },
  computed: {
    styleProps() {
      return pick(this.props, textStylePropNames)
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="less">
</style>