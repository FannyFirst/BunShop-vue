import service from "./axios";

const urls = {
    userList: "/user",
    userLogin: "/user/login",
    bunsList: "/buns/",
    orderList: "/order",
    buy: "/buy/",
    buyingList: "/buy/buying"
  },
  requestPromise = async ({url, params = undefined, method = "GET", data = undefined}) =>
    service({
      url,
      method,
      params,
      data
    })


export default requestPromise

export function userList() {
  return requestPromise({url: urls.userList})
}

export function orderList() {
  return requestPromise({url: urls.orderList})
}

export function userOrder(uid) {
  return requestPromise({url: urls.orderList + "/" + uid})

}

export function bunsList() {
  return requestPromise({url: urls.bunsList})
}

export function addBuns(params) {
  return requestPromise({url: urls.bunsList, params, method: "POST"})
}

export function delBuns(id) {
  return requestPromise({url: urls.bunsList + id, method: "DELETE"})
}

export function userLogin(id) {
  return requestPromise({url: urls.userLogin, params: {id}, method: "POST"})
}

export function buy(cart = [{id: -1, num: 0}], uid, totalPrice) {
  return requestPromise({url: urls.buy, data: {cart, uid, totalPrice}, method: "POST"})
}

export function buyReady(id) {
  return requestPromise({url: urls.buy, params: {id}})
}

export function buyingList() {
  return requestPromise({url: urls.buyingList})
}

export function buyingCheck(uid) {
  return requestPromise({url: urls.buyingList + '/' + uid})
}

export function buyingConfirm(id) {
  return requestPromise({url: urls.buyingList, params: {id}, method: "POST"})
}