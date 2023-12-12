import { useEffect, useState } from 'react';
import { Image, Text, View } from '@tarojs/components';
import { getStorageSync, previewImage } from '@tarojs/taro';
import style from './ImageItem.module.css';
import { getUserFromDB, API_HOST, signUp } from '../../../../utils/db';
import { requestAwait } from '../../../../utils/await';
import likeIcon from '../../../icon/like.png';
import likeFill from '../../../icon/like_fill.png';
import globalData from '../../../../utils/globalData';

interface Props {
  image: Image;
}

function ImageItem({ image}: Props) {
  console.log("土拍你");
  console.log(image);
  const [userName, setUserName] = useState(globalData.userInfo.name);


  return (
    <View className={style.card}>
      <Image
        src={image.imageUrl}
        mode="widthFix"
        style={{
          width: '100%',
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px',
        }}
        onClick={() => {
          previewImage({
            urls: [image.imageUrl],
            showmenu: true,
            current: image.imageUrl,
          });
        }}
      />
      <View className={style.bottom}>
        <View className={style.info}>
          <Text className={style.userName}>{userName}</Text>
          <Text
            className={style.catInfo}
          >{`${image.campus}/${image.catName}`}</Text>
        </View>
      </View>
    </View>
  );
}

export default ImageItem;
