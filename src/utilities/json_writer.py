import json

#"Messaging".web_meta.sign_formats[0].me.condition[0]

library_size = 16

# "color": ":="Library".selected[0].format.bottom_line.color:",
# "flash": ":="Library".selected[0].format.bottom_line.flash:",
# "horizontal_alignment": ":="Library".selected[0].format.bottom_line.horizontal_alignment:",
# "scroll_speed": ":="Library".selected[0].format.bottom_line.scroll_speed:",
# "size_and_face": ":="Library".selected[0].format.bottom_line.size_and_face:",
# "vertical_alignment": ":="Library".selected[0].format.bottom_line.vertical_alignment:"


# "bottom_line": ":="Library".selected[0].text.bottom_line:",
# "top_line": ":="Library".selected[0].text.top_line:"

format_elements = {
    'color': '":="Application_Data".web_meta.sign_formata.me[[INDEX]].[LINE_POSITION].color:"',
    'flash': '":="Application_Data".web_meta.sign_formata.me[[INDEX]].[LINE_POSITION].flash:"',
    'horizontal_alignment': '":="Application_Data".web_meta.sign_formata.me[[INDEX]].[LINE_POSITION].horizontal_alignment:"',
    'scroll_speed': '":="Application_Data".web_meta.sign_formata.me[[INDEX]].[LINE_POSITION].scroll_speed:"',
    'size_and_face': '":="Application_Data".web_meta.sign_formata.me[[INDEX]].[LINE_POSITION].size_and_face:"',
    'vertical_alignment': '":="Application_Data".web_meta.sign_formata.me[[INDEX]].[LINE_POSITION].vertical_alignment:"'       
}


line_positions = [
    'bottom_line',
    'top_line'
]

_list = []
for i in range(library_size):
    _w = {}
    _x = {}
    _z = {}
    for line_position in line_positions:
        _y = {}
        for format_element in format_elements:
            _y[format_element] = format_elements[format_element].replace('[INDEX]', str(i)).replace('[LINE_POSITION]', line_position)
        _x[line_position] = _y
    _list.append(_x)


output = json.dumps(_list, separators=(',', ': '), sort_keys=True, indent=4)

f=open('output.txt','w')
f.write(output)
f.close()