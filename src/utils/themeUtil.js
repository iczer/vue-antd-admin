import client from 'webpack-theme-color-replacer/client'
import generate from '@ant-design/colors/lib/generate'

export default {
  primaryColor: '#1890ff',
  changeThemeColor (newColor) {
    let lastColor = this.lastColor || this.primaryColor
    let options = {
      cssUrl: '/css/theme-colors.css',
      oldColors: generate(lastColor),
      newColors: generate(newColor)
    }
    let promise = client.changer.changeColor(options)
    this.lastColor = lastColor
    return promise
  }
}
