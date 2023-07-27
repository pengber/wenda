import re


def get_title_from_title(s):
    try:
        if '&' not in s:
            matches = re.search(r'\[(.+)\]', s)
            return matches.group(1) if matches else s
        else:
            str_list = re.search(r'\[(.+)\]', s).group(1).split('&')
            title = str_list[0]             #+ str_list[-1], 后缀
            return title
    except:
        return s

def get_link_from_title(s):
    try:
        if '&' in s:
            # 因为 Linux 文件名不能有 /，而链接中有 /，所以需要在文件名存储时将 / 替换为 !，在前端显示时再替换回来
            raw_title = re.search(r'\[(.+)\]', s).group(1)
            raw_link = re.search(r'\&(.+)\&', raw_title)
            real_link = raw_link.group(1).replace("!", "/").replace("~", ":") if raw_link else None
            return real_link
        else:
            return None
    except:
        return s


# 示例用法
string = "[系统应用系统日志规范&http~!!www.baidu.com&.txt](/txt/系统应用系统日志规范&http~!!www.baidu.com&.txt)"
md_title_link = '['+get_title_from_title(string)+']('+get_link_from_title(string)+')'
# print(md_title_link)

title="系统应用系统日志规范&http~!!www.baidu.com&.txt"
print(get_title_from_title(title))