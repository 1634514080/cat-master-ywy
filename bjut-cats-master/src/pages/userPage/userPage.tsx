import Taro, {request, useLoad} from '@tarojs/taro';
import { View, Text,Image,Input,Button } from '@tarojs/components';
import { AtDivider, AtList, AtListItem, AtAvatar,AtInput } from 'taro-ui';
import style from './userPage.module.css';
import { useRef, useState } from 'react';
import globalData from '../../../utils/globalData';
function userPage() {
  const [na,setNa]=useState("");
  const [listData,setListData]=useState([{textMessage:'123',image:'https://tse2-mm.cn.bing.net/th/id/OIP-C._fFNjoGIOP_jtm7PMKECWAHaJv?rs=1&pid=ImgDetMain'},]);
    
  const [login,setLogin]=useState({show: false,
          avatar: 'https://pic1.zhimg.com/50/v2-6afa72220d29f045c15217aa6b275808_hd.jpg?source=1940ef5c',
        });
  const [background,setbackground]=useState({
          show:false,
          avatar:'https://pic3.zhimg.com/v2-570a66bc2703484a62b98fff1b68043a_r.jpg',
        });
  // const [userInfo,setUserInfo]=useState ({
  //         avatar: '',
  //         customerId: '',
  //         depositNum: '',
  //         mobile: '',
  //         nickName: '未登录',
  //         waterNum: '',
  //         openid:'',
  //         jwt:'',
  //         code:''
  //       })
  const openid = useRef('');
  const gender = useRef('');
  const emails = useRef('');
  const phone = useRef('');
  const token = useRef('');
  const name = useRef('未登录');
  const jwt = useRef('');
  const Avartar = useRef('https://pic1.zhimg.com/50/v2-6afa72220d29f045c15217aa6b275808_hd.jpg?source=1940ef5c')
  const [aurl,setAurl]=useState('');
    // const[openid,setOpenid] = useState('');
    
    // const [name, setName] = useState('sym'); // 用户名
    const [content, setContent] = useState('111'); // 评论内容
    const nname=name.current;
    const [comments, setComments] = useState([]); // 所有评论
    useLoad(() => {
      request({
        url: `http://10.26.52.26:8080/catinfo/detail`,
        method: 'GET',
        data:{
          id:2
        },
        success: (res) => {
          console.log(res.data);
        },
        fail: (res) => {
        },
      });
    });
  


const Login=(e)=>{
  wx.login({
    success:(res)=>{
        console.log("code: " + res.code);
        wx.request({
            url:'http://10.26.52.26:8080/login',
            method:'GET',
            data:{
                code : res.code
            },
            success:(res)=>{
              // console.log(res.data);
              openid.current = res.data.data.id;
              // setOpenid(res.data.data.id);
              jwt.current = res.data.data.jwt; 
              getUserInfo();
              request({
                url: `http://10.26.52.26:8080/socialinfo/tweet`,
                method: 'GET',
                data:{
                  id:""
                },
                success: (res) => {
                  console.log(res.data.data);
                  res.data.data.map((e)=>{
                    const nname=name.current;
                    const content=e.content;
                    const newComment={nname,content};
                    setComments([...comments,newComment]);
                  })
                  console.log(comments);
                },
                fail: (res) => {
                },
              });
            }
        })
    }
})

}
function getUserInfo(){
  wx.request({
    url:'http://10.26.52.26:8080/user/info',
    method:'GET',
    data:{
      id:openid.current,
    },
    success:(res)=>{
      // console.log(res.data)
      console.log(openid.current);
      console.log(res.data.data);
      openid.current = res.data.data.id;
      globalData.userInfo.id = res.data.data.id;
      name.current = res.data.data.username;
      globalData.userInfo.name=res.data.data.username;
      setNa(res.data.data.username);
      gender.current = res.data.data.gender;
      emails.current = res.data.data.emails;
      phone.current = res.data.data.phone;
      token.current = res.data.data.token;
      Avartar.current = res.data.data.imageurl;
      setAurl(res.data.data.imageurl.replace('/api','http://10.26.52.26:8080'));
      // setOpenid(res.data.data.id)
      // setNickname(res.data.data.username)
      // setGender(res.data.data.gender)
      // setEmails(res.data.data.emails)
      // setPhone(res.data.data.phone)
      // setToken(res.data.data.token)
    }
  })
}

function PostUserInfo(){
  wx.request({
    url:'http://10.26.52.26:8080/user/setinfo',
    method:'POST',
    data:{
      id:openid.current,
      username:name.current,
      gender:gender.current,
      phone:phone.current,
      token:token.current,
      emails:emails.current
    },
    success:(res)=>{
      console.log(res);
    }
  })
}

  //   // 登录监听
const chooseAvatar=(e) =>{
  setLogin({
            show: true,
            avatar: e.detail.avatarUrl,
          })
    Avartar.current = e.detail.avatarUrl;
    setAurl(Avartar.current);
    console.log(Avartar.current)
  wx.uploadFile({
    url:'http://10.26.52.26:8080/user/image',
    filePath:Avartar.current,
    name:'image',
    header:{
      'content-Type':'multipart-formdata'
    },
    formData:{
      'userid':openid.current
    },
    success:(res)=>{
      console.log(res);
    },
    fail:(res)=>{
      console.log(res)
    }
  })
    };
  // })

  return (
    <View>
      <Image className={style.background_image} src="https://img.zcool.cn/community/01c0905d15a5eba8012051cd86f6cf.jpg@3000w_1l_0o_100sh.jpg" />
      <View className={style.content}>
      {/* <View className={style.background}> */}
       <View className={style.head_box}>
       {/* <Button  plain className = {style.avatar} open-type='chooseAvatar' >       </Button> */}
       {/* <button open-type="chooseAvatar" className="avatar" >
      <image className="head-img" href="https://img.zcool.cn/community/01c0905d15a5eba8012051cd86f6cf.jpg@3000w_1l_0o_100sh.jpg" mode="widthFix"></image>
    </button> */}

<View style={{ position: 'relative', width: '200px', height: '50px' ,borderColor:"transparent"}}> 
<AtAvatar circle size="large" image={aurl} style={{ marginLeft:"10px", position: 'absolute', top: 0, left: '20px' }}></AtAvatar>
<Button className={style.avatar}style={{ backgroundColor: 'transparent',  color: '#000',position: 'absolute', border:'none', bottom: 0, right: 0,width:'200px',height:'50px' }}open-type="chooseAvatar" onChooseAvatar={chooseAvatar}>    </Button>  
 </View>


       
        {/* <AtAvatar className={style.avatar} openData:{} circle size="large"  image={login.avatar}></AtAvatar> */}
        {/* <button></button> */} 
        <Input type="nickname" className={style.name_input} name="nickname" value={na}  onInput = {(e)=>{
      name.current = e.detail.value;console.log(name.current);PostUserInfo();
    }} placeholder="昵称" />
        <Button onClick={Login} className={style.message}>登录</Button>
      </View>
    {/*</View> */}



    <View className={style.interaction}>
      <text className={style.title_interaction}>和小猫互动数据</text>
      <View >
          <text className={style.feeding}>14</text> <text className={style.ci1}>次</text>
          <text className={style.check}>23</text>    <text className={style.ci2}>次</text>
      </View>
      <View className={style.times}>
          <text className={style.times_feeding}>投喂次数</text>  
          <text className={style.times_check}>打卡次数</text>
      </View>
    </View>
    
    
    <AtDivider  fontColor="#bbb" />
    <AtDivider  fontColor="#bbb" />
    <AtList>
        {comments.map((comment, index) => (
          <AtListItem
            key={index}
            title={comment.nname}
            note={comment.content}
          />
        ))}
      </AtList>

    {/* <View className={style.post} style="display:flex;flex-direction: column;">
      <View className={style.user_post}>
        <Image className ={style.head_image_post} src={login.avatar} mode="widthFix"/>
        <Input type="nickname" className={style.name_input_post} name="nickname" value={userInfo.nickName} onClick={onInput} placeholder="昵称" />
      </View>
      
        <View className={style.item} wx:for="{{listData}}" wx:key="{index}" style="display:flex;flex-direction: column;"  >
          <text className={style.text_post}></text>
          <Image className={style.image_post} src="https://img.zcool.cn/community/01c0905d15a5eba8012051cd86f6cf.jpg@3000w_1l_0o_100sh.jpg" />
        </View> 
     */}

</View>

      {/* </View> */}
    </View>
    
  );
}

export default userPage;