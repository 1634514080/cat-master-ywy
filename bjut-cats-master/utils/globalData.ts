const data = {};

export function setGlobal(key, value) {
  data[key] = value;
}

export function getGlobal(key) {
  return data[key];
}
interface GlobalData {
  userInfo: {
    id:number,
    name:string
  };
}

const globalData: GlobalData = {
  userInfo: {
    id: 0,
    name:""
  },
};

export default globalData;
