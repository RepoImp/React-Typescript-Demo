export function createGmtTableListData(
  _id: string,
  user: string,
  bucketStatus: string,
  bucketUrl: string,
  ftpUrl: string,
  createdAt: string,
  customer: string,
  remark: string,
  bucketFailedReson: string,
  ftpDestinationPath: string,
  srcFileName: string,
  storage: any
) {
  return {
    _id,
    user,
    bucketStatus,
    bucketUrl,
    ftpUrl,
    createdAt,
    customer,
    remark,
    bucketFailedReson,
    ftpDestinationPath,
    srcFileName,
    storage
  };
}

export function createCustomerTableListData(
  _id: string,
  name: string,
  companyId: string,
  contactName: string,
  contactNumber: string,
  phone: string,
  email: string,
  file_type: string,
  ftp_path: string,
  ftp_password: string,
  ftp_server: string,
  ftp_user: string,
  gmt_code: string,
  primaryContactPhone: string,
  primaryContactName: String

) {
  return {
    _id,
    name,
    companyId,
    contactName,
    contactNumber,
    phone,
    email,
    file_type,
    ftp_path,
    ftp_password,
    ftp_server,
    ftp_user,
    gmt_code,
    primaryContactPhone,
    primaryContactName
  };
}

export function createDashboardModelTableList(
  _id: string,
  storage_type: string,
  location: string,
  path: string,
  fileName: string,
  error : string
) {
  return {
    _id,
    storage_type,
    location,
    path,
    fileName,
    error
  };
}
