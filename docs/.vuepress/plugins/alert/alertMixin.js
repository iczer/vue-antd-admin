import Alert from './Alert'

const AlertMixin = {
  install(Vue) {
    Vue.mixin({
      methods: {
        $alert(message, duration = 2000) {
          let Constructor= Vue.extend(Alert)
          let alert = new Constructor()
          alert.$slots.default = message
          alert.$props.alert = this.$page.alert
          alert.$mount()
          document.body.appendChild(alert.$el)

          const appendHeight = alert.$el.offsetHeight + 16
          this.$page.alert.top += appendHeight

          setTimeout(() => {
            this.$page.alert.top -= appendHeight
            this.triggerRemoveAlert(appendHeight)
            setTimeout(() => {
              alert.$destroy()
              alert.$el.remove()
            }, 100)
          }, duration)
        },
        triggerRemoveAlert(height) {
          const event = new CustomEvent('alert_remove', {
            detail: {height}
          })
          window.dispatchEvent(event)
        }
      }
    })
  }
}

export default AlertMixin
