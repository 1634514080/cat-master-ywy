import { View, Text,Camera } from '@tarojs/components'
import {AtFab} from 'taro-ui'
import style from "./photo.module.css"
function photo () {
    const getPic=()=>{
        const ctx = wx.createCameraContext()
        ctx.takePhoto({
          quality: 'high',
          success: (res) => {
            console.log(res.tempImagePath)
            this.setData({
              src: res.tempImagePath
            })
          }
        })
      }
  return (
    <View className={style.content}>
      <Camera  className={style.pic}></Camera>
      <AtFab onClick={getPic} >
        <Text className='at-fab__icon at-icon ' ></Text>
      </AtFab>

      <image src='{{src}}' style='height: {{wh}}px; width: 100%; display: block;'></image>  
    </View>
  
  )
}
export default photo;