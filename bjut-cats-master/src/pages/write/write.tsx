import Taro, { useLoad,request } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtInput, AtButton, AtList, AtListItem } from 'taro-ui';
import {useRef, useState} from 'react';
import style from './write.module.css';
import globalData from '../../../utils/globalData';
import { isNull } from '@tarojs/shared';
function write() {
  const [name, setName] = useState(globalData.userInfo.name); // 用户名
  const [content, setContent] = useState(''); // 评论内容
  const [comments, setComments] = useState([]); // 所有评论
  const id=useRef(0);
  // 处理用户名输入变化
  const handleNameChange=(value)=> {
    setName(value);
  }

  // 处理评论内容输入变化
  const handleContentChange=(value)=> {
    setContent(value);
  }

  useLoad((opyions) => {
    console.log(opyions);
    id.current= parseInt(opyions.id);
    request({
      url: `http://10.26.52.26:8080/catinfo/tweet`,
      method: 'GET',
      data:{
        id:2
      },
      success: (res) => {
        console.log(res.data.data);
        res.data.data.map((e)=>{
          const name=globalData.userInfo.name;
          const content=e.content;
          const newComment={name,content};
          setComments([...comments,newComment]);
        })
      },
      fail: (res) => {
      },
    });
  });
  function PostCommentInfo(content){
    wx.request({
      url:'http://10.26.52.26:8080/forum/write',
      method:'POST',
      data:{
        userid:globalData.userInfo.id,
        catid:2,
        content:content,
        imageurl:"",
      },
      success:(res)=>{
        console.log(res);
      }
    })
  }

  // 提交评论
  const handleSubmit=() =>{
    if (!content) {
      return; // 如果用户名或评论内容为空，则不提交评论
    }
    PostCommentInfo(content);
    const newComment = { name, content };

    setComments([...comments, newComment]); // 将新评论添加到评论列表中
    setName(''); // 清空用户名输入框
    setContent(''); // 清空评论内容输入框
  }

  return (
    <View className={style.content}>
        {/* 用户名输入框 */}
        <View style={{ position: 'fixed', bottom: 0, width: '100%' }}>
           {/* 评论内容输入框 */}
          <AtInput
            name="content"
            type="text"
            placeholder="请输入您的评论内容"
            value={content}
            onChange={handleContentChange}
          >
            <Text  onClick={handleSubmit}>提交评论</Text>
          </AtInput>
        </View>

      {/* 评论列表 */}
      <AtList>
        {comments.map((comment, index) => (
          <AtListItem
            key={index}
            title={comment.name}
            note={comment.content}
          />
        ))}
      </AtList>
    </View>
  );
}

export default write;