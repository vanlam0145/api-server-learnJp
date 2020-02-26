exports.error = {
    anyError(message, code) {return {message, code}},
    // Unknow
    somethingWentWrong(message) {
        return {code: 500, message: message ? message : 'Có lỗi xảy ra'};
    },
    // Auth
    unauthorized() {
        return {code: 401, message: 'Chưa xác thực'}
    },
    badToken() {
        return {code: 401, status: '-1', message: 'Không có quyền truy cập'};
    },
    tokenExpired() {
        return {code: 401, status: '-2', message: 'Mã truy cập đã hết hạn'};
    },
    permissionDeny() {
        return {code: 405, status: '-3', message: 'Không đủ quyền để truy cập'};
    },
    // Request
    requestDataInvalid(message) {
        return {code: 403, status: '-4', message: 'Dữ liệu gửi lên không hợp lệ: '};
    },
    // External Request
    externalRequestFailed(message) {
        return {code: 500, status: '-5', message: 'Có lỗi xảy ra: '};
    },
    // Mongo
    mgRecoredNotFound() {
        return {code: 404, status: '-7', message: 'Không tìm thấy dữ liệu yêu cầu'};
    },
    mgQueryFailed(message) {
        return {
            code: 403, status: '-8', message: message || 'Truy vấn không thành công'
        };
    },
    userError(message) {
        return {code: 403, status: '-9', message};
    },
    anyError(message) {
        return {code: 500, message}
    }
}