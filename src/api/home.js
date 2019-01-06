// 首页的API接口
import Yan from "yanjs";
import config from "../utils/config.js";


export default {
    // 获取重要消息
    getImportantInfo(data) {
        return new Promise((resolve, reject) => {
            Yan.$http({
                url: config.urlContent("/home/GetMyCouseByType"),
                data,
                success(res) {
                    resolve(res)
                },
                error(err) {
                    reject(err)
                }
            });
        })
    }
}