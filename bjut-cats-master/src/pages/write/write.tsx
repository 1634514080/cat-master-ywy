import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtInput, AtButton, AtList, AtListItem } from 'taro-ui';
import {useState} from 'react';
import style from './write.module.css';
function write() {
  const [name, setName] = useState('sym'); // 用户名
  const [content, setContent] = useState(''); // 评论内容
  const [comments, setComments] = useState([]); // 所有评论

  // 处理用户名输入变化
  const handleNameChange=(value)=> {
    setName(value);
  }

  // 处理评论内容输入变化
  const handleContentChange=(value)=> {
    setContent(value);
  }

  // 提交评论
  const handleSubmit=() =>{
    if (!content) {
      return; // 如果用户名或评论内容为空，则不提交评论
    }
    const newComment = { name, content };
    setComments([...comments, newComment]); // 将新评论添加到评论列表中
    setName(''); // 清空用户名输入框
    setContent(''); // 清空评论内容输入框
  }

  return (
    <View className={style.content}>
      {/* 用户名输入框 */}
      <View className={style.input}>
        
        {/* 评论内容输入框 */}
        <AtInput
          name="content"
          title="评论内容"
          type="text"
          placeholder="请输入您的评论内容"
          value={content}
          onChange={handleContentChange}
        />

        {/* 提交按钮 */}
        <AtButton type="primary" onClick={handleSubmit}>提交评论</AtButton>
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