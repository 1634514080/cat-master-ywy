import Taro, {request} from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtAvatar, AtList, AtListItem, AtButton } from 'taro-ui';
import style from './userPage.module.css';
import { request } from '@tarojs/taro';

function userPage() {
  // 模拟用户数据
  const userInfo = {
    avatar: 'https://example.com/avatar.jpg',
    name: '张三',
    gender: '男',
    age: 25,
    email: 'zhangsan@example.com',
    phone: '13812345678'
  };
  const app = getApp();
  const Page=({
    /**
     * 页面的初始数据
     */
    data: {
      listData:[
        {textMessage:'123',image:'https://tse2-mm.cn.bing.net/th/id/OIP-C._fFNjoGIOP_jtm7PMKECWAHaJv?rs=1&pid=ImgDetMain'},
      ],
  
      login: {
        show: false,
        avatar: 'https://pic.baike.soso.com/ugc/baikepic2/5127/20220315162046-1672105481_png_445_475_301539.jpg/0',
      },
      background:{
        show:false,
        avatar:'https://pic3.zhimg.com/v2-570a66bc2703484a62b98fff1b68043a_r.jpg',
      },
      userInfo: {
        avatar: '',
        customerId: '',
        depositNum: '',
        mobile: '',
        nickName: '',
        waterNum: ''
      }
      
    },
    onLoad(options) {
      this.getUserInfo()
    },
    // 最终提交保存
    async tapSave() {
      await this.uploadFile()
      console.log(this.data.userInfo);
      // return
  //     const res = await request(
  //   URL='/customerInfo/update', 
  //   method='PUT', 
  //   success:{
  //       "avatar": this.data.userInfo.avatar,
  //       "nickName": this.data.userInfo.nickName,
  //     })
  //     console.log('res', res);
  //     if (res.success) {
  //       wx.showToast({
  //         title: '保存成功',
  //         icon: 'none'
  //       })
  //       wx.switchTab({ url: '/pages/usercenter/index' });
  //     }
  //   },
    // 输入昵称
    const onInput=(e)=> {
      const { value } = e.detail
      console.log('输入昵称', value);
      this.setData({
        ['userInfo.nickName']: value
      })
    },
  
    // 登录监听
    const chooseAvatar=(e)=> {
      this.setData({
        login: {
          show: true,
          avatar: e.detail.avatarUrl,
        }
      })
    },
  
  

  
  });
  
  // // 修改头像
  // function changeAvatar() {
  //   Taro.showToast({ title: '修改头像功能待开发', icon: 'none' });
  // }

  // // 修改个人信息
  // function editProfile() {
  //   Taro.showToast({ title: '修改个人信息功能待开发', icon: 'none' });
  // }

  return (
    <View>
      <View className={style.container}>
    <View className={style.background}>
      <image className="background-image" href="https://img.zcool.cn/community/01c0905d15a5eba8012051cd86f6cf.jpg@3000w_1l_0o_100sh.jpg" />
      <View className={style.head_box}>
        <button open-type="chooseAvatar" className={style.avatar} bindchooseavatar="chooseAvatar">
        <image className={style.head_img} href="{{login.avatar}}" mode="widthFix"></image>
        </button>
        <input type="nickname" className={style.name_input} name="nickname" value="{{userInfo.nickName||''}}" onClick={onInput} placeholder="昵称" />
        <button className={style.message}>编辑个人信息</button>
      </View>
    </View>



    <View className={style.interaction}>
      <text className={style.title-interaction}>和小猫互动数据</text>
      <View className={style.number}>
          <text className={style.feeding}>14</text> <text className={style.ci1}>次</text>
          <text className={style.check}>23</text>    <text className={style.ci2}>次</text>
      </View>
      <View className={style.times}>
          <text className={style.times-feeding}>投喂次数</text>  
          <text className={style.times-check}>打卡次数</text>
      </View>
    </View>



    <View className={style.post} style="display:flex;flex-direction: column;">
      <View className={style.user-post}>
        <image className ={style.head-image-post} src="{{login.avatar}}" mode="widthFix"/>
        <input type="nickname" className={style.name-input-post} name="nickname" value="{{userInfo.nickName||''}}" bindchange="onInput" placeholder="昵称" />
      </View>
      
        <View className={style.item} wx:for="{{listData}}" wx:key="{index}" style="display:flex;flex-direction: column;"  >
          <text className={style.text-post}>{{item.textMessage}}</text>
          <image className={style.image-post} src="{{item.image}}" />
        </View>
    </View>


    </View>
    </View>
    
  );
}

export default userPage;