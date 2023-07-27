// ==UserScript==
// @name         知识库
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  利用知识库回答问题
// @author       lyyyyy
// @match        http://127.0.0.1:17860/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=0.1
// @run-at document-idle
// @grant        none
// ==/UserScript==

//辅助函数
//在pdf和txt文件名中存储链接,形如title&http~!!www.baidu.com&.pdf格式,~是因为windows文件名不能有:,!是因为linux文件名不能有/
//返回http://www.baidu.com
get_link_form_name= (s) => {
    try {
        if(s.includes("&")) {
            //replace_symbol = "!"        //因为linux文件名不能有/,而连接有/, 所以需要在文件名存储的时候把/替换成!,在前端显示的时候替换回来
            raw_title = s.match('\\[(.+)\\]')[1]
            raw_link = raw_title.match('\\&(.+)\\&') == null ? null: raw_title.match('\\&(.+)\\&')[1]
            real_link = raw_link.replace(/!/g,"/").replace(/~/g,":")
            return real_link
        }else{
            return null
        }
    } catch {
        return s
    }
}
//返回文件名
//title.txt格式和title&link&.txt格式, 都返回title.txt
get_title_form_md = (s) => {
    try {
        
        if(!s.includes("&")){
            return s.match('\\[(.+)\\]')[1]
        }else{
            str_list = s.match('\\[(.+)\\]')[1].split("&")
            title = str_list[0] + str_list[str_list.length-1]
            return title
        }
    } catch {
        return s
    }
}
//
//返回路径
//如果形如title&http~!!www.baidu.com&.pdf,则返回链接使得前端点击可以跳转
//如果形如title.pdf, 则返回/txt/title.pdf
get_url_form_md = (s) => {
    try {
        link = get_link_form_name(s)
        if(link == null) {
            return s.match('\\((.+)\\)')[1]
        }else{
            return link
        }
        
    } catch {
        return s
    }
}

title = "[系统应用系统日志规范.txt](/txt/系统应用系统日志规范.txt)"
title_with_link = "[系统应用系统日志规范&http~!!www.baidu.com&.txt](/txt/系统应用系统日志规范&http~!!www.baidu.com&.txt)"
console.log(get_title_form_md(title))
console.log(get_url_form_md(title))
console.log("\n")

console.log(get_title_form_md(title_with_link))
console.log(get_url_form_md(title_with_link))
// console.log(get_link_form_name(title_with_link))