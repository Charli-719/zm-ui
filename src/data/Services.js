import querystring from "querystring";
import {message} from "antd";

export default function (projectId) {
  const headers = { "x_project_id": projectId || "171a870535b045baa9f0e6df72ce5c8e" };
  const post = function (url, data) {
    return fetch(url, {
      method: "POST",
      headers: headers,
      body: data,
      mode:'cors',
      cache: "no-cache",
      credentials: "same-origin"
    });
  };
  const get = function (url, params) {
    if (params) {
      url = url + "?" + querystring.stringify(params);
    }
    return fetch(url, {
      method: "GET",
      headers: headers,
      cache: "no-cache",
      credentials: "same-origin"
    });
  };
  const del = function (url, data) {
    return fetch(url, {
      method: "DELETE",
      headers: headers,
      body: data,
      cache: "no-cache",
      credentials: "same-origin"
    });
  };
  const put = function (url, data) {
    return fetch(url, {
      method: "PUT",
      headers: headers,
      body: data,
      cache: "no-cache",
      credentials: "same-origin"
    });
  };
  const json = function (data) {
    return new Blob([JSON.stringify(data)], { type: "application/json" });
  };

  return {
    post: post,
    get: get,
    delete: del,
    put: put,
    login(data) {
      return this.post("/admin/login", json(data)).then((res) => {
        if (res.ok) {
          return res.json();
        }
      });
    },
    logout() {
      return this.post("/admin/logout").then((res) => {
        if (res.ok) {
          return res.json();
        }else{

        }
      });
    },
  };
}
