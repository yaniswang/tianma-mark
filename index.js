/**
 * Tianma - Pipe - Mark
 * Copyright(c) 2010 ~ 2012 Alibaba.com, Inc.
 * MIT Licensed
 */

var fs = require('fs'),
    CONTENT_TYPES = [
        'text/javascript',
        'application/x-javascript',
        'application/javascript',
    ];

module.exports = function (config) {

    config = config || {};

    var mode = config.mode,
        iconPath = __dirname + '/' + ( mode ? mode : 'dev' ) + '.ico';

    return function (req, res) {
        var oldReq = req;

        oldReq(function (err) {
            var contentType = res.head('content-type');
            if (err) {
                res(err);
            } else {
                if (fs.existsSync(iconPath)) {
                    var urlIco = 'data:image/ico;base64,' + fs.readFileSync(iconPath).toString('base64');

                    if (/(ae|aelite|atom\-\w+)\.js/i.test(req.path) &&
                        res.status() === 200 &&
                        CONTENT_TYPES.some(function (value) {
                            return contentType.indexOf(value) !== -1;
                        })) {
                        res.data('\r\n(function(doc,win){if(win.bSetIcon!==true){' +
                            'win.bSetIcon=true;try{var links=doc.getElementsByTagName("link"),' +
                            'head=doc.getElementsByTagName("head")[0];for(var i=0,l=links.length;i<l;i++)' +
                            '{if(/^(icon|shortcut icon)$/i.test(links[i].getAttribute("rel")))' +
                            '{head.removeChild(links[i]);break}}var icon=document.createElement("link");' +
                            'icon.type="image/x-icon";icon.rel="icon";icon.href="' + urlIco + '";' +
                            'head.appendChild(icon)}catch(e){}}})(document,window);\r\n'
                            + res.toString());
                    }
                }
                res();
            }
        });
    }
};