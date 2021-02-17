importScripts('https://cdn.ampproject.org/sw/amp-sw.js');
AMP_SW.init({
    assetCachingOptions: [{
            regexp: /\.(png|jpg|mp3|ogg|css|js)/,
            cachingStrategy: 'CACHE_FIRST'
        }],
    offlinePageOptions: {
        url: '/offline.html',
        assets: ['/img/bot.jpg']
    }
});
