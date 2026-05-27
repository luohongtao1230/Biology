// Service Worker for Biology Quiz PWA
const CACHE_NAME = 'biology-quiz-v1';
const ASSETS_TO_CACHE = [
    './biology-quiz.html',
    './manifest.json',
    './image/biology.png',
    './image/panda.png',
    './image/panda%20mascot%20character%20waving.png',
    './image/panda%20mascot%20character%20giving.png',
    './image/panda%20mascot%20character%20sitting.png',
    './image/panda%20mascot%20character%20wearing.png',
    './image/panda%20mascot%20character,%20Light.png',
    './image/panda%20mascot%20character,%20Light2.png',
    './image/panda%20mascot%20character,%20Light3.png',
    './image/panda%20mascot%20character,%20Light4.png',
    './image/panda%20thinking.png',
    './image/panda%20thinking2.png',
    './image/panda%20thinking3.png',
    './image/panda%20thinking4.png',
    './image/happy%20panda.png',
    './image/happy%20panda1.png',
    './image/happy%20panda2.png',
    './image/happy%20panda3.png',
    './image/cry%20panda.png',
    './image/tired%20panda.png',
    './image/tired%20panda1.png',
    './image/tired%20panda2.png',
    './image/scientist%20panda.png',
    './image/scientist%20panda1.png',
    './image/scientist%20panda2.png',
    './image/scientist%20panda3.png',
    './image/coin.png',
    './image/coin1.png',
    './image/coin2.png',
    './image/coin3.png',
    './image/coin4.png'
];

// 安装事件 - 缓存所有资源
self.addEventListener('install', (event) => {
    console.log('[Service Worker] 安装中...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[Service Worker] 缓存文件中...');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => {
                console.log('[Service Worker] 安装完成');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('[Service Worker] 安装失败:', error);
            })
    );
});

// 激活事件 - 清理旧缓存
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] 激活中...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[Service Worker] 删除旧缓存:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('[Service Worker] 激活完成');
            return self.clients.claim();
        })
    );
});

// 请求拦截 - 优先从缓存读取，失败则从网络获取
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    console.log('[Service Worker] 从缓存返回:', event.request.url);
                    return cachedResponse;
                }

                console.log('[Service Worker] 从网络获取:', event.request.url);
                return fetch(event.request)
                    .then((networkResponse) => {
                        // 检查是否是有效的响应
                        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                            return networkResponse;
                        }

                        // 克隆响应并缓存
                        const responseToCache = networkResponse.clone();
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });

                        return networkResponse;
                    })
                    .catch((error) => {
                        console.error('[Service Worker] 获取失败:', error);
                        // 返回离线页面或错误信息
                        return caches.match('./biology-quiz.html');
                    });
            })
    );
});

// 消息处理
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
