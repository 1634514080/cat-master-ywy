import {useLoad,request} from "@tarojs/taro"

export default function Index() {
  useLoad(() => {
    request({
      url: `${API_HOST}/catinfo/list`,
      method: 'GET',
      success: (res) => {
        console.log(res);
      },
      fail: (res) => {
        console.log("failed");
      },
    });
  });
  useLoad(() => {
    request({
      url: `${API_HOST}/catinfo/list`,
      method: 'GET',
      success: (res) => {
        console.log(res);
      },
      fail: (res) => {
        console.log("failed");
      },
    });
  });
  
}