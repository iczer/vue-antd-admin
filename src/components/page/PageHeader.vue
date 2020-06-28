<template>
  <div class="page-header">
    <div :class="['page-header-wide', layout]">
      <div class="breadcrumb">
        <a-breadcrumb>
          <a-breadcrumb-item :key="item.path" v-for="(item, index) in breadcrumb">
            <span v-if="index === 0"><a href="#/dashboard/workplace">{{$t('home.name')}}</a></span>
            <span v-else>{{$t(item.path.substring(1).replace(new RegExp('/', 'g'), '.') + '.name')}}</span>
          </a-breadcrumb-item>
        </a-breadcrumb>
      </div>
      <div class="detail">
        <div class="main">
          <div class="row">
            <h1 v-if="title" class="title">{{title}}</h1>
            <div class="action"><slot name="action"></slot></div>
          </div>
          <div class="row">
            <div v-if="this.$slots.content" class="content">
              <div v-if="avatar" class="avatar"><a-avatar :src="avatar" :size="72" /></div>
              <slot name="content"></slot>
            </div>
            <div v-if="this.$slots.extra" class="extra"><slot name="extra"></slot></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageHeader',
  props: {
    title: {
      type: String,
      required: false
    },
    breadcrumb: {
      type: Array,
      required: false
    },
    logo: {
      type: String,
      required: false
    },
    avatar: {
      type: String,
      required: false
    },
    i18n: Object
  },
  created() {
    let i18n = this.i18n
    Object.keys(i18n).forEach(key => {
      this.$i18n.mergeLocaleMessage(key, i18n[key])
    })
  },
  computed: {
    layout () {
      return this.$store.state.setting.layout
    }
  }
}
</script>

<style lang="less" scoped>
  .page-header{
    background: #fff;
    padding: 16px 24px;
    border-bottom: 1px solid #e8e8e8;
    .page-header-wide{
      &.head{
        margin: auto;
        max-width: 1400px;
      }
      &.side{
      }
      .breadcrumb{
        margin-bottom: 20px;
      }
      .detail{
        display: flex;
        .row {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }
        .avatar {
          margin:0 24px 0 0;
        }
        .main{
          width: 100%;
          .title{
            font-size: 20px;
            color: rgba(0,0,0,.85);
            margin-bottom: 16px;
          }
          .content{
            display: flex;
            flex-wrap: wrap;
          }
          .extra{
            display: flex;
          }
        }
      }
    }
  }
</style>
