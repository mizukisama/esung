{
    $or:
    [
        {
            username: email,
            type: { $lt: 2 }
        },
        {
            email: email,
            type: { $lt: 2 }
        }
    ]
}


var data =
    {
        orderCode: "201801132235365818904",
        address: "湖北省荆州市松滋市 新江口镇",
        post: "434200",
        receiver: "张睿",
        mobile: "13177049060",
        userMessage: "拍错了，要黑色的！！",
        createDate: "2018-01-12 03:27:30",
        payDate: "2018-01-12 03:27:57",
        deliveryDate: "2018-01-12 03:27:57",
        confirmDate: "2018-01-12 03:27:57",
        status: "waitPay"
    }

    [
    {
        "name": "Changhong/长虹 65S1安卓智能12核65英寸网络平板LED液晶电视机70",
        "promotePrice": 3824.159912109375,
        "count": 4,
        "ImgPath": "/images/productSingle/SXn2cR2nAyDXowdAPlofzu6O.jpg"
    },
    {
        "name": "乐洁士智能马桶高品质全自动遥控感应一体式智能坐便器座便器",
        "promotePrice": 500.15,
        "ImgPath": "/images/productSingle/SXn2cR2nAyDXowdAPlofzu6O.jpg",
        "count": 2
    }

    ]