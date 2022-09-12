export default {
    install(Vue, options = {}) {
        Vue.directive('view-lazy', {
            bind(el) {
                el.setAttribute('data-view', 'false');//设置标志
            },
            //指令所在的元素被插入页面时
            inserted(el, bind) {
                //IntersectionObserver支持两个参数：callback是当被监听元素的可见性变化时，触发的回调函数 
                const observer = new IntersectionObserver(function (change) {//该方法是异步自动监听,消耗性能较小
                    const loadingImg = options.loading || '';
                    if (change[0].intersectionRatio > 0 && el.dataset.view === 'false') {
                        el.dataset.view = 'true';
                        //判断元素标签名是不是img
                        if (el.tagName.toLowerCase() === 'img') {
                                el.src = bind.value //下载成功后将成功图片赋给目标obj目标对象
                            observer.unobserve(el);//移除该元素的监听  //处理图片下载函数  use: v-view-lazy='imgage_src'
                        }
                    } else if (change[0].intersectionRatio <= 0 && el.dataset.view === 'false') {
                        el.src = loadingImg;
                    }
                });
                observer.observe(el);//开始监听该元素
            },
        })
    }
}