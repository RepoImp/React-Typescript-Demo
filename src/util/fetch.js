import axios from "axios";

export async function fetchJSON(url, method = "GET", data = undefined) {
  const params = {
    method,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  };
  if (data) {
    params.body = data ? JSON.stringify(data) : undefined;
  }
  return await fetch(url, params);
}

export async function uploadFile(url, name, params, token) {  
  const formData = new FormData();
  formData.append("file", params.file);
  formData.append("customer", params.customer);
  formData.append("remark", params.remark);
  params.isGMTUpload && formData.append("ftpDestinationPath", params.ftpDestinationPath);
  formData.append("isGMTUpload", params.isGMTUpload);
  return await axios.post(`/api/${url}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      'Accept': "*/*",
      'Authorization': `Basic ${token}`,
    },
  });
}

export async function downloadFile(id) {
  const token = localStorage.getItem("token")
  return await axios.post(`/api/ftp/getfile/${id}`,null, {
    headers: {
      'Authorization': `Basic ${token}`,
    },
  });
}

export async function fetchBlob(url) {
  return new Promise(async (resolve, reject) => {
    const blob = await (
      await fetch(`/api/${url}`, { credentials: "include" })
    ).blob();
    const reader = new FileReader();
    reader.onload = function () {
      resolve(this.result);
    };
    reader.readAsDataURL(blob);
  });
}
