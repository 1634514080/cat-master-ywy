import { View, Text,Camera } from '@tarojs/components'
import { useRef } from 'react';
import {AtFab} from 'taro-ui'
import globalData from '../../../utils/globalData';
import style from "./photo.module.css"
function photo () {
  const photo=useRef('');
    const getPic=()=>{
        const ctx = wx.createCameraContext()
        ctx.takePhoto({
          quality: 'high',
          success: (res) => {
            console.log(res.tempImagePath)
            photo.current=res.tempImagePath;
            updataphoto(res.tempImagePath);
          }
        })
      PostPhoto()
      }
    function PostPhoto(id){
      wx.uploadFile({
        url:'http://10.26.52.26:8080/forum/posting',
        filePath:photo.current,
        name:'image',
        header:{
          'content-Type':'multipart-formdata'
        },
        formData:{
          // 'id':globalData.userInfo.id,
          // "catid":2
          'postid':id
        },
        success:(res)=>{
          console.log("lllllllll");
          console.log(res);
        },
        fail:(res)=>{
          console.log(res)
        }
      })
    }
    function updataphoto(url){
      wx.request({
        url:'http://10.26.52.26:8080/forum/write',
        method:'POST',
        data:{
          userid:globalData.userInfo.id,
          catid:2,
          content:"",
          imageurl:url,
        },
        success:(res)=>{
          console.log("帖子创建成功");
          PostPhoto(res.data.data);
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