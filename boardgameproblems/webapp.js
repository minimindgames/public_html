// webapp resources are common to all "scenes" so load is polling instead of callback,
// and if you have multiple "scenes" then use scene specific timer instead of setTimeout
// to stop timer when scene closed

var isApp;
var isBanner = false;
if (typeof Android === 'undefined') {
    isApp = false;
    var Android = {
        loaded: false,
        loadAd: function (element) {
            if (!isApp || location.href.indexOf('localhost') !== -1) {
                if (this.loaded) {
                    return true;
                }
                if (!this.loading) {
                    setTimeout(function () {
                        this.loaded = true;
                    }.bind(this), 1000);
                }
                this.loading = true;
            }
            return false;
        },
        showAd: function () {
            if (!isApp || location.href.indexOf('localhost') !== -1) {
                /*setTimeout(function () {
                 webapp_ad.showed(true);
                 }.bind(this), 2000);*/
                showBanner();
                return true;
            }
            return false;
        },
        showGuide: function (modal) {
        }
    };
} else {
    isApp = true;
}

var webapp_ad = (function () {
    var _element;
    var _timeout;
    function enable(enabled) {
        if (_element) {
            _element.disabled = !enabled;
        }
    }
    return {
        close: function () {
            _element = null;
            clearTimeout(_timeout);
        },
        load: function (element) {
            if (element) {
                _element = element;
                enable(false);
            }
            if (Android.loadAd()) {
                enable(true);
            } else {
                _timeout = setTimeout(function () {
                    this.load();
                }.bind(this), 1000);
            }
        },
        show: function (cb, ctx) {
            //console.log('Ad show ', cb, ctx);
            enable(false);
            if (!Android.showAd()) {
                this.load(); // someone took ad so reload
            } else {
                this.cb = cb;
                this.ctx = ctx;
            }
            // Android calls showed() when ad viewed
        },
        showed: function (success) {
            //console.log('Ad shown ', success, this.cb);
            if (this.cb) {
                this.cb(success);
            }
            if (success) {
                //document.getElementById("ad-reward").style.display = "block";
                //document.getElementById("ad-failure").style.display = "none";
                // this.load(); if want to show more ads
            } else {
                //document.getElementById("ad-failure").style.display = "block";
                this.load();
            }
        },
        showGuide: function (modal) {
            if (modal) {
                hideBack();
                Android.showGuide(modal);
            } else {
                if (document.getElementById('canvas')) {
                    document.getElementById('canvas').style.display = 'block';
                    document.getElementById('canvas').style.visibility = 'visible';
                }
                var elems = document.getElementsByClassName('popup');
                for (var i = 0; i < elems.length; i++) {
                    elems[i].style.display = 'none';
                }
            }
        }
    };
})();

function startFullScreen() {
    backToGame();
}

function showGame() {
    var elem = document.getElementById('canvas');
    elem.style.display = 'block';
    elem.style.visibility = 'visible';
}

function hideGame() {
    var elem = document.getElementById('canvas');
    //elem.style.display = 'none';
    elem.style.visibility = 'hidden';
}

function adBanner() {
    var body = document.getElementsByTagName('body')[0];

    var banner = document.createElement('div');
    body.appendChild(banner);
    banner.id = 'banner';
    banner.className = 'popup';

    var back = document.createElement('div');
    banner.appendChild(back);
    back.href = '#';
    back.onclick = function (e) {
        backToGame();
    };
    back.className = 'back';
    back.innerHTML = 'BACK';

    var container = document.createElement('div');
    banner.appendChild(container);
    container.className = 'popup-container';
    container.style.height = "100%";

    var content = document.createElement('div');
    container.appendChild(content);
    content.className = 'popup-content';

    var a = document.createElement('a');
    content.appendChild(a);
    a.target = '_blank';
    a.href = 'https://play.google.com/store/apps/details?id=com.minimindgames.boardgameproblems';

    var img = document.createElement('img');
    a.appendChild(img);
    img.className = 'banner-image';
    img.src = '/banner.png';
}

function backToGame() {
    Android.showGuide(null);
    showGame();
    var elems = document.getElementsByClassName('popup');
    for (var i = 0; i < elems.length; i++) {
        elems[i].style.display = 'none';
    }
    if (isBanner) {
        isBanner = false;
        setTimeout(function () {
            webapp_ad.showed(true);
        }.bind(this), 200);
    }
}

function showBanner() {
    isBanner = true;
    hideGame();
    var elem = document.getElementById('banner');
    elem.style.display = 'block';
}

function hideBack() {
    var urlSearchParams = new URLSearchParams(window.location.search);
    var url = new URL(window.location);
//console.log(url)
    var isApp = urlSearchParams.has('app');
    if (url.protocol === 'file:') {
        isApp = true;
    }
    if (url.host.indexOf('localhost') !== -1) {
        //isApp = true;
    }

    if (isApp) {
        var elems = document.getElementsByClassName('back');
        //console.log(elems)
        for (var i = 0; i < elems.length; i++) {
            elems[i].style.display = 'none';
        }
    }
}

window.addEventListener('unload', function (event) {
    webapp_ad.close();
});

adBanner();
createGame();
