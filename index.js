/**
 * Tianma - Pipe - Mark
 * Copyright(c) 2010 ~ 2012 Alibaba.com, Inc.
 * MIT Licensed
 */

var pegasus = require('pegasus');
var fs = require('fs');

/**
 * Pipe function factory.
 * @param config {Object}
 */
var mark = pegasus.createPipe({
    /**
     * Initializer.
     * @param config {Object}
     */
    _initialize: function (config) {
        var mode = config.mode;
        this.iconPath = __dirname + '/'+ ( mode ? mode : 'dev' ) + '.ico';
    },

    /**
     * Check whether to process current request.
     * @param request {Object}
     * @param response {Object}
     * @return {boolean}
     */
    match: function (request, response) {
        return /\/(ae|aelite|atom\-\w+)\.js(\?|$)/i.test(request.path) && response.status() === 200 && response.head('content-type') === 'application/javascript'
    },

    /**
     * Pipe function entrance.
     * @param request {Object}
     * @param response {Object}
     */
    main: function (request, response) {
        var iconPath = this.iconPath;
        if(fs.existsSync(iconPath)){
            var source = response.body();
            var urlIco = 'data:image/ico;base64,' + fs.readFileSync(iconPath).toString('base64');
            response
                .clear()
                .write('\r\n(function(doc,win){if(win.bSetIcon!==true){win.bSetIcon=true;try{var links=doc.getElementsByTagName("link"),head=doc.getElementsByTagName("head")[0];for(var i=0,l=links.length;i<l;i++){if(/^(icon|shortcut icon)$/i.test(links[i].getAttribute("rel"))){head.removeChild(links[i]);break}}var icon=document.createElement("link");icon.type="image/x-icon";icon.rel="icon";icon.href="'+urlIco+'";head.appendChild(icon)}catch(e){}}})(document,window);\r\n' + source);
        }
        
        this.next();
    }
});

module.exports = mark;
