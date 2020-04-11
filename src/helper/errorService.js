exports.ErrorService = {
    anyError(message, code) { return { message, code } },
    // Unknow
    somethingWentWrong(message) {
        return { code: 500, message: message ? message : 'Có lỗi xảy ra' };
    },
    // Auth
    unauthorized: { code: 401, message: 'Chưa xác thực' },
    badToken: { code: 401, status: '-1', message: 'Không có quyền truy cập' },
    tokenExpired: { code: 401, status: '-2', message: 'Mã truy cập đã hết hạn' },
    permissionDeny: { code: 405, status: '-3', message: 'Không đủ quyền để truy cập' },
    // Request
    requestDataInvalid(message) {
        return { code: 403, status: '-4', message: 'Dữ liệu gửi lên không hợp lệ: ' + message };
    },
    // External Request
    externalRequestFailed(message) {
        return { code: 500, status: '-5', message: 'Có lỗi xảy ra: ' };
    },
    // Mongo
    mgRecoredNotFound: { code: 404, status: '-7', message: 'Không tìm thấy dữ liệu yêu cầu' },
    mgQueryFailed(message) {
        return {
            code: 403, status: '-8', message: message || 'Truy vấn không thành công'
        };
    },
    userError(message) {
        return { code: 403, status: '-9', message };
    },
    loginFaild() {
        return { code: 403, message: "Login faild" }
    },
    dataEmpty() {
        return { code: 403, message: "data Empty!" }
    }
}