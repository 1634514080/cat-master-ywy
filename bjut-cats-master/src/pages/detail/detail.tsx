import { useLoad, useShareAppMessage, useShareTimeline,navigateTo,request,showToast } from '@tarojs/taro';
import { AtModal,AtFab,AtCurtain,AtDivider,AtList,AtListItem  } from 'taro-ui';
import { useRef, useState } from 'react';
import { Image, Map, Text, View } from '@tarojs/components';
import { removeDay } from '../../../utils/date';
import style from './detail.module.css';
import questionIcon from '../../icon/question.png';
import { API_HOST } from '../../../utils/db';
const defaultImg =
  'https://imgbed.codingkelvin.fun/uPic/placeholder345734852.jpg';

function Detail() {
  const api_host='http://10.26.52.26:8080'
  const [cat, setCat] = useState<Cat>({} as Cat);
  const [showStateMsg, setShowStateMsg] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [name, setName] = useState('sym'); // 用户名
    const [content, setContent] = useState('111'); // 评论内容
    const newComment={name,content};
    const [comments, setComments] = useState([newComment]); // 所有评论
  const newcat = useRef<Cat>({} as Cat);
  useShareAppMessage(() => {
    return {
      title: `月亮湖猫屋-${cat.name}`,
      path: `/pages/detail/detail?model=${encodeURIComponent(
        JSON.stringify(cat)
      )}`,
      imageUrl: `${cat.image}`,
    };
  });

  useShareTimeline(() => {
    return {
      title: `月亮湖猫屋-${cat.name}`,
      path: `/pages/detail/detail?model=${encodeURIComponent(
        JSON.stringify(cat)
      )}`,
      imageUrl: `${cat.image}`,
    };
  });

  useLoad((options) => {
    setCat(JSON.parse(decodeURIComponent(options.model)));
    const nextcat=JSON.parse(decodeURIComponent(options.model));
    setCat(nextcat);
    newcat.current = nextcat;
    console.log(newcat);
  });

  // useLoad(() => {
  //   console.log('Index Page loaded.');
  //   request({
  //     url: `${API_HOST}/api/comments?id=${cat.name}`,
  //     method: 'GET',
  //     success: (res) => {
  //       setComments(res)
  //     },
  //     fail: (res) => {
  //       showToast({
  //         title: res.errMsg,
  //         icon: 'error',
  //       });
  //     },
  //   });
  // });
  const handleNavigate = (options) =>{
    navigateTo({
      url: `../write/write?id=${newcat.current.id}`,
    });
  }
  const handleNavigatetophoto =()=>{
    navigateTo({
      url: `../photo/photo`,
    });
  }

  const handleFeed =()=>{

  }

  return (
    <View className="content">
      <AtModal
        className= {style.menu}
        isOpened={showStateMsg}
        title="在校状态说明"
        confirmText="知道啦"
        onClose={() => setShowStateMsg(false)}
        onCancel={() => setShowStateMsg(false)}
        onConfirm={() => setShowStateMsg(false)}
        content={
          '• 在校: 健康生活在学校中\n• 毕业: 已经找到家啦\n• 休学: 长时间失踪\n• 喵星: 猫猫回到了自己的世界'
        }
      >
      </AtModal>
      <AtCurtain isOpened={showMenu} onClose={()=>setShowMenu(false)}>
        <View className={style.menu}>
          <AtFab onClick={handleNavigate}> 
          <Text className='at-fab__icon at-icon at-icon-edit'></Text>
        </AtFab>
        <AtFab onClick={handleNavigatetophoto}>
          <Text className='at-fab__icon at-icon at-icon-camera'></Text>
        </AtFab>
        <AtFab onClick={handleFeed}>
          <Text className='at-fab__icon at-icon at-icon-heart'></Text>
        </AtFab>
        </View>
      </AtCurtain>
      <View className={style.box}>
        {cat.image ? (
          <Image className={style.img} src={cat.image} />
        ) : (
          <Image className={style.img} src={defaultImg} />
        )}
        <Text className={style.name}>{cat.name}</Text>
        <View className={style.info}>
          <View className={style.row}>
            <View className={style.item}>
              <Text className={style.top}>性别</Text>
              <Text className={style.bottom}>{cat.gender}</Text>
            </View>
            <View className={style.item}>
              <Text className={style.top}>毛色</Text>
              <Text className={style.bottom}>{cat.color}</Text>
            </View>
          </View>
          <View className={style.row}>
            <View className={style.item}>
              <Text className={style.top}>毛长</Text>
              <Text className={style.bottom}>{cat.hair}</Text>
            </View>
            <View className={style.item}>
              <Text className={style.top}>绝育情况</Text>
              <Text className={style.bottom}>{cat.neutered}</Text>
            </View>
          </View>
          <View className={style.row}>
            <View className={style.item}>
              <Text className={style.top}>校区</Text>
              <Text className={style.bottom}>{cat.campus}</Text>
            </View>
            <View className={style.item} onClick={() => setShowStateMsg(true)}>
              <View className={style.topWithIcon}>
                <Text className={style.top}>状态</Text>
                <Image src={questionIcon} className={style.question} />
              </View>
              <Text className={style.bottom}>{cat.state}</Text>
            </View>
          </View>
          <View className={style.row}>
            {cat.birthday && (
              <View className={style.item}>
                <Text className={style.top}>出生日期</Text>
                <Text className={style.bottom}>{removeDay(cat.birthday)}</Text>
              </View>
            )}
            {cat.adoptionDay && (
              <View className={style.item}>
                <Text className={style.top}>送养日期</Text>
                <Text className={style.bottom}>
                  {removeDay(cat.adoptionDay)}
                </Text>
              </View>
            )}
          </View>
          {cat.description && (
            <View className={style.row}>
              <View className={style.item}>
                <Text className={style.top}>描述</Text>
                <Text className={style.bottom}>
                  {cat.description.replace(/\\n/g, '\n')}
                </Text>
              </View>
            </View>
          )}
          {cat.longitude != null &&
            cat.latitude != null &&
            cat.position != null && (
              <View className={style.row}>
                <View className={style.item}>
                  <Text className={style.top}>位置</Text>
                  <Text className={style.bottom}>{cat.position}</Text>
                  <Map
                    longitude={cat.longitude}
                    latitude={cat.latitude}
                    scale={14}
                    enableSatellite
                    markers={[
                      {
                        longitude: cat.longitude,
                        latitude: cat.latitude,
                        iconPath: '',
                        id: 0,
                        width: 10,
                        height: 20,
                      },
                    ]}
                    className={style.map}
                  />
                </View>
              </View>
            )}
        </View>
        {/* <AtDivider  fontColor="#bbb" />
    <AtList>
        {comments.map((comment, index) => (
          <AtListItem
            key={index}
            title={comment.name}
            note={comment.content}
          />
        ))}
      </AtList> */}
      </View>
    
      <AtFab className={style.fab} onClick= {() => setShowMenu(true)}>
        <Text className="at-fab__icon at-icon at-icon-add"></Text>
      </AtFab>
    </View>
  );
}

export default Detail;
