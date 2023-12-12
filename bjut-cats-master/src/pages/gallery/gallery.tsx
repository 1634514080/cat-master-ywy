import { useState } from 'react';
import { Text, View, GridView } from '@tarojs/components';
import {
  usePullDownRefresh,
  useShareAppMessage,
  useShareTimeline,
  getStorageSync,
  navigateTo,
  useDidShow,
  stopPullDownRefresh,
  useLoad,
  request
} from '@tarojs/taro';
import { AtFab,AtCurtain } from 'taro-ui';
import style from './gallery.module.css';
import { requestAwait } from '../../../utils/await';
import { API_HOST, signUp } from '../../../utils/db';
import ImageItem from './components/ImageItem';
import globalData from '../../../utils/globalData';

function Gallery() {
  const [images, setImages] = useState<Image[]>([]);
  // 记录用户点赞过的图片url
  const [likes, setLikes] = useState<string[]>([]);
  const [showMenu, setShowMenu] = useState(false);

  async function refreshImages() {
    // 图片排列顺序再想想
    const images1 = (await requestAwait(
      'GET',
      `${API_HOST}/api/images/精选`
    )) as {
      data: Image[];
    };
    const images2 = (await requestAwait(
      'GET',
      `${API_HOST}/api/images/通过`
    )) as {
      data: Image[];
    };
    const data = images1.data.concat(images2.data);
    setImages(data);
  }

  async function refreshLike() {
    const openId: string = getStorageSync('openId');
    const { data } = (await requestAwait(
      'GET',
      `${API_HOST}/api/likes?by=openId&value=${openId}`
    )) as any;
    setLikes(data.map((like) => like.imageUrl));
  }

  useDidShow(() => {
    refreshImages();
    refreshLike();
  });

  // usePullDownRefresh(async () => {
  //   await refreshImages();
  //   await refreshLike();
  //   stopPullDownRefresh();
  // });

  useShareAppMessage(() => {
    return { title: '月亮湖猫屋-相册' };
  });

  useShareTimeline(() => {
    return { title: '月亮湖猫屋-相册' };
  });

  const handleFabClick = async () => {
    // 从localStorage读openId，来判断是否已经登陆
    let openId: string = getStorageSync('openId');
    if (openId == '') {
      // 未登录或注册
      signUp(() => {
        navigateTo({ url: '../uploadImage/uploadImage' });
      });
    } else {
      // 已登陆，上传图片
      console.log('已登陆');
      navigateTo({ url: '../uploadImage/uploadImage' });
    }
  };
  const handleNavigatetophoto =()=>{
    navigateTo({
      url: `../photo/photo`,
    });
  }
  useLoad(() => {
    request({
      url: `http://10.26.52.26:8080/socialinfo/tweet`,
      method: 'GET',
      data:{
        id:globalData.userInfo.id,
      },
      success: (res) => {
        console.log("受到信息");
        console.log(res.data);
        res.data.data.filter((e) => e.imageurl != null).map((e)=>{
          const n=globalData.userInfo.name;
          const url = e.imageurl.replace("/api",'http://10.26.52.26:8080');
          const newImage={openId:globalData.userInfo.id,imageUrl:url,catName:"小白",campus:"本部",state:"通过"};
          setImages([...images,newImage]);
          
        })
      },
      fail: (res) => {
        console.log(res.errMsg);
      },
    });
  });
  return (
    <View className={style.content}>
      <AtCurtain isOpened={showMenu} onClose={()=>setShowMenu(false)}>
        <View className={style.menu}>
        <AtFab onClick={handleNavigatetophoto}>
          <Text className='at-fab__icon at-icon at-icon-camera'></Text>
        </AtFab>
        </View>
      </AtCurtain>
      <View className={style.imageList}>
        <GridView type="masonry" crossAxisGap={10} mainAxisGap={15}>
          {images.map((image) => (
            <ImageItem
              image={image}
              key={image.imageUrl}
            />
          ))}
        </GridView>
      </View>

      <AtFab className={style.fab} onClick= {() => setShowMenu(true)}>
        <Text className="at-fab__icon at-icon at-icon-add"></Text>
      </AtFab>
    </View>
  );
}

export default Gallery;
