const games = [
    {
        name: 'Tic Tac Toe',
        id: 'tictactoe',
        desc: 'Tic Tac Toe has six skill levels. Win them all.',
        sub: '',
        levels: 6
    },
    {
        name: 'Sudoku 4x4',
        id: 'sudokukid',
        desc: 'The hardest Sudoku 4x4 has only four clues.',
        sub: '',
        levels: 9
    },
    {
        name: 'Misere Tic Tac Toe',
        id: 'tictactoe',
        desc: 'Lose Tic Tac Toe to win Misere.',
        sub: 'lose',
        levels: 6
    },
    {
        name: 'Sudoku',
        id: 'sudoku',
        desc: 'Fill in the next logical number.',
        sub: '',
        levels: 100
    },
    {
        name: 'Super Tic Tac Toe',
        id: 'supertictactoe',
        desc: 'Win all levels up to HARD strategy.',
        sub: '',
        levels: 3
    },
    {
        name: 'Chess',
        id: 'chess',
        desc: 'White (you) to mate in two moves.',
        sub: '',
        levels: 18
    }
];

function resetProgress() {
    for (var i = 0; i < games.length; i++) {
        //var game = games[i];
        var game = games[i];
        var sub = '';
        if (game.sub) {
            sub = game.sub;
        }
        window.localStorage.removeItem(game.id + sub + 'levelNo', 0);
    }
    window.localStorage.removeItem('sudoku' + 'levels');
    location.reload();
}

function getLevel(game) {
    var gameName = game.id;
    var sub = '';
    if (game.sub) {
        sub = game.sub;
    }
    var levelName = gameName + sub + 'levelNo';
    var level = window.localStorage.getItem(levelName) || 0;
    return level;
}

var selectedGame = null;
function selectGame(id) {
    var buttons = document.getElementsByClassName('problem');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].children[0].src = 'icon/prob-button.png';
    }
    document.getElementById('problem-' + id).children[0].src = 'icon/prob-button-sel.png';

    if (selectedGame) {
        var eGame = document.getElementById(selectedGame);
        eGame.style.display = 'none';
    }
    selectedGame = id;
    //console.log(selectedGame)
    var eGame = document.getElementById(selectedGame);
    eGame.style.display = 'block';

    window.localStorage.setItem('current-game', id);
}

function createGame(name, id, level, levels, sub, desc) {
    var img;

    var problem = document.createElement('div');
    problem.onclick = function (e) {
        selectGame(id + sub);
    };
    problem.id = 'problem-' + id + sub;
    problem.className = 'problem';
    img = document.createElement('img');
    //<a href="#"><img src="icon/star.png" alt="list item 1" /></a>
    problem.appendChild(img);
    img.className = 'button';
    img.src = 'icon/prob-button.png';
    img = document.createElement('img');
    problem.appendChild(img);
    img.className = 'star';
    if (level < levels) {
        img.src = 'icon/prob-star.png';
    } else {
        img.src = 'icon/prob-star-sel.png';
    }

    eProblems.appendChild(problem);

    var d = document.createElement('div');
    d.id = id + sub;
    d.className = 'game';

    var title = document.createElement('div');
    title.className = 'title';
    title.appendChild(document.createTextNode(name));
    d.appendChild(title);

    var game = document.createElement('div');
    game.className = 'game-container';
    d.appendChild(game);

    var problem = document.createElement('div');
    problem.className = 'cell prob';
    game.appendChild(problem);

    var icon = document.createElement('div');
    icon.className = 'cell icon';
    game.appendChild(icon);

    var play = document.createElement('div');
    play.className = 'cell play';
    game.appendChild(play);

    var div;

    div = document.createElement('div');
    div.className = 'prob-title';
    div.appendChild(document.createTextNode('PROBLEM'));
    problem.appendChild(div);

    div = document.createElement('div');
    problem.appendChild(div);
    div.className = 'prob-desc';
    div.appendChild(document.createTextNode(desc));

    var param = '';
    if (sub.length) {
        param = '?type=' + sub;
    }
    var href = id + '/index.html' + param;

    var a = document.createElement('a');
    icon.appendChild(a);
    a.href = href;

    img = document.createElement('img');
    a.appendChild(img);
    var src = 'icon/' + id + sub;
    img.src = src + ".png";

    a = document.createElement('a');
    play.appendChild(a);
    a.href = href;

    div = document.createElement('div');
    a.appendChild(div);
    div.className = 'play-title';
    div.appendChild(document.createTextNode('PLAY'));

    var progress = document.createElement('div');
    play.appendChild(progress);
    progress.className = 'level';
    progress.appendChild(document.createTextNode(level + ' / ' + levels));

    /*
     
     var progress = document.createElement('div');
     a.appendChild(progress);
     progress.className = 'level';
     progress.appendChild(document.createTextNode(level + ' / ' + levels));
     */
    /*img = document.createElement('img');
     img.className = 'play';
     a.appendChild(img);
     img.src = 'icon/play.png';*/
    /*var play = document.createElement('div');
     play.className = 'play';
     a.appendChild(play);
     play.appendChild(document.createTextNode('PLAY'));
     */
    /*
     var a = document.createElement('a');
     d.appendChild(a);
     var param = '';
     if (sub) {
     param = '?type=' + sub;
     } else {
     sub = '';
     }
     a.href = id + '/game.html' + param;
     
     var b = document.createElement('div');
     a.appendChild(b);
     b.className = 'container';*/
    /*
     var t = document.createElement('img');
     //t.sizes = '(min-width: 1600px) 80vw, 100vw';
     var src = 'icon/' + id + sub;
     t.src = src + ".png";
     //t.srcset = src + ' 80w, ' + src + '-H 1600w';
     b.appendChild(t);*/
    //t.className = 'game-title';
    //t.appendChild(document.createTextNode(name));
    //console.log(t.src)
    /*
     var s = document.createElement('div');
     //s.className = 'game-progress';
     s.className = 'tag';
     b.appendChild(s);
     
     var pr = document.createElement('div');
     pr.className = 'level';
     s.appendChild(pr);
     var star = document.createElement('img');
     star.className = 'star';
     //level = 18
     if (level === 0) {
     star.src = 'icon/' + 'star-gray.png';
     } else if (level < levels) {
     star.src = 'icon/' + 'star-2.png';
     } else {
     star.src = 'icon/' + 'star.png';
     }
     
     pr.appendChild(star);
     
     var lev = document.createElement('div');
     lev.className = 'centered';
     if (level > 0 && level < levels) {
     lev.appendChild(document.createTextNode(level));
     }
     //level.innerHTML = level;
     pr.appendChild(lev);
     */
    /*var c = document.createElement('span');
     
     var l = document.createElement('div');
     l.className = 'game-level';
     s.appendChild(l);
     
     l.appendChild(c);
     //c.appendChild(document.createTextNode(level));
     //l.appendChild(document.createTextNode(' / '));*/
    /*    var m = document.createElement('div');
     m.appendChild(document.createTextNode(levels));
     s.appendChild(m);*/

    return d;
}

var eGames = document.getElementById('games');
var eProblems = document.getElementById('problems');
for (var i = 0; i < games.length; i++) {
    var game = games[i];
    var eGame = createGame(game.name, game.id, getLevel(game), game.levels, game.sub, game.desc);
    eGames.appendChild(eGame);
}

var isApp;
var isBanner = false;
if (typeof Android === 'undefined') {
    isApp = false;
    var Android = {
        showGuide: function (modal) {
        }
    };
} else {
    isApp = true;
}

const webapp_ad = (function () {
    return {
        showGuide: function (modal) {
            if (modal) {
                hideBack();
                Android.showGuide(modal);
            } else {
                backToGame();
            }
        }
    };
})();

function optionShow(yes = true) {
    if (yes) {
        webapp_ad.showGuide(true);
        document.getElementById('option-dialog').style.display = 'block';
    } else {
        document.getElementById('option-dialog').style.display = 'none';
}
}

function infoShow(yes = true) {
    if (yes) {
        webapp_ad.showGuide(true);
        document.getElementById('info-dialog').style.display = 'block';
    } else {
        document.getElementById('info-dialog').style.display = 'none';
}
}

function optionSound(e, toggle) {
    /*if (!e) {
     e = document.getElementById('option-sound');
     toggle = true;
     }*/
    if (toggle) {
        hasAudio = (hasAudio === '0') ? '1' : '0';
        window.localStorage.setItem('option-sound', hasAudio);
    }
    if (hasAudio === '0') {
        e.src = 'icon/sound-off.png';
        document.getElementById('option-text').innerHTML = 'Sound OFF';
    } else {
        e.src = 'icon/sound-on.png';
        document.getElementById('option-text').innerHTML = 'Sound ON';
    }
}

function backToGame() {
    Android.showGuide(null);
    var elems = document.getElementsByClassName('popup');
    for (var i = 0; i < elems.length; i++) {
        elems[i].style.display = 'none';
    }
}

function queryResetProgress(show = true) {
    if (show) {
        document.getElementById('confirmResetProgress').style.display = 'block';
    } else {
        document.getElementById('confirmResetProgress').style.display = 'none';
}
}

var hasAudio = window.localStorage.getItem('option-sound') || '0';
optionSound(document.getElementById('option-sound'), false);

//window.localStorage.removeItem('current-game');
var currentGame = window.localStorage.getItem('current-game') || 'tictactoe';
selectGame(currentGame);

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

hideBack();

//optionShow();
setTimeout(function () {
    document.getElementById('loader').style.display = 'none';
}, 100);
