var uuid = require('node-uuid');
var router = require('express').Router();

router.route('/')
    .get(function(req, res, next) {

        // 緯度、経度、範囲
        var lat = parseFloat(req.query.lat);
        var lon = parseFloat(req.query.lon);
        var scale = parseFloat(req.query.scale);

        // パラメータが渡されていない場合は400を返す
        if (!lat || !lon || !scale) {
            res.status(400).end();
            return;
        }

        // 座標と範囲を元に、適当なテストデータを返す
        var stores = {
            stores: _createRandomStores(lat, lon, scale)
        };
        res.json(stores);

        // テストデータを作成するメソッド
        // {
        //   stores: [
        //     {
        //       id: xxx,
        //       lat: xxx,
        //       lon: xxx,
        //       name: 'xxx',
        //       desc: 'xxx'
        //     },
        //     ...
        //   ]
        // }
        function _createRandomStores(lat, lon, scale) {

            // 20個作る
            var stores = [];
            for (var i = 0; i < 20; i++) {
                var store = {
                    id: uuid.v4().split('-').join(''),
                    lat: _randomPoint(lat, scale),
                    lon: _randomPoint(lon, scale),
                    name: _randomName(i),
                    desc: _randomDesc(i)
                };
                stores.push(store);
            }
            return stores;

            // 座標と範囲にしたがって適当な座標を返す
            function _randomPoint(point, scale) {
                return point + scale * (Math.random() * 2 - 1);
            }

            // 適当な店名を返す
            function _randomName(index) {
                var baseNames = [
                    'コンビニ',
                    'マクドナルド',
                    'イオン',
                    'ビックカメラ',
                    'パルコ'
                ];
                var baseName = baseNames[Math.floor(Math.random() * baseNames.length)];
                return baseName + index;
            }

            // 適当な説明文を返す
            function _randomDesc(index) {
                var baseDescs = [
                    '兎追いしかの山 小鮒釣りしかの川 夢は今もめぐりて 忘れがたき故郷',
                    '如何にいます父母 恙なしや友がき 雨に風につけても 思いいずる故郷',
                    'こころざしをはたして いつの日にか帰らん 山はあおき故郷 水は清き故郷'
                ];
                var baseDesc = baseDescs[Math.floor(Math.random() * baseDescs.length)];
                return baseDesc + index;
            }

        }
    });

module.exports = router;