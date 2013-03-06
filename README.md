tianma-mark
================

天马的mark管道，用来为开发和测试环境进行标注，以显式的识别开发环境。

在开发过程中，经常需要通过修改hosts，在本地开发环境和线上环境进行切换。但是在切换的过程中，往往没有办法直观的识别出当前是访问开发环境还是线上环境。

由于测试没有充分覆盖，很容易造成线上故障。

功能
================

1. 利用favicon显式的标注当前在使用开发环境
2. 利用参数自定义图标

安装
================

利用npm安装到全局

	npm install tianma-mark -g

使用
================

1, 打开天马的配置文件config.js

2, 在静态mount的结尾添加：require('tianma-mark')()，例：

    .mount('/', [
        pipe.static({ root: style_root }),
        pipe.proxy({
            'http://110.75.216.150/$1': /(?:(?:style|img)\.(?:alibaba|aliexpress)\.com|aliimg\.com)\/(.*)/
        }),
        require('tianma-mark')()
    ])
    
3，假如本机已经绑定了style域名，此时打开http://www.alibaba.com/，即可看到站点的图标已经被替换成开发标识。

License
================

tianma-mark is released under the MIT license:

> The MIT License
>
> Copyright (c) 2012 Yanis Wang \<yanis.wang@gmail.com\>
>
> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to deal
> in the Software without restriction, including without limitation the rights
> to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the Software is
> furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in
> all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
> THE SOFTWARE.

Thanks
================

* Nodejs: [http://nodejs.org/](http://nodejs.org/)
* GitHub: [https://github.com/](https://github.com/)