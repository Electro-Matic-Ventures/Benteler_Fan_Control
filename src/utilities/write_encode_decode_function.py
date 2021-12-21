flags = {
    'value': '[VALUE]',
    'name': '[NAME]'
}
type = {
    'color': [
        'black',
        'blue',
        'green',
        'mix_1',
        'mix_2',
        'mix_3',
        'mix_4',
        'red',
        'white',
        'yellow'
    ],
    'flash': [
        'off',
        'on'
    ],
    'horizontal_alignment': [
        'center',
        'left',
        'right'
    ],
    'line_control': [

    ],
    'scroll_speed': [
        'slowest',
        'slow',
        'normal',
        'fast',
        'fastest'
    ],
    'size_and_face': [
        'bold_5',
        'bold_11',
        'bold_14',
        'bold_15',
        'bold_16',
        'bold_22',
        'bold_30',
        'bold_32',
        'bold_40',
        'normal_5',
        'normal_7',
        'normal_9',
        'normal_11',
        'normal_14',
        'normal_15',
        'normal_16',
        'normal_22',
        'normal_24',
        'normal_30',
        'normal_32',
        'normal_40'
    ],
    'vertical_alignment': [
        'bottom_hold',
        'fill_hold',
        'middle_hold',
        'top_hold',
        'bottom_scroll',
        'fill_scroll',
        'middle_scroll',
        'top_scroll',
    ]
}

templates = [
        'if ' + flags['name'] + ' = #decoded.' + flags['value'] + ' then\n\t#_return := #encoded.' + flags['value'] + ';\n\tgoto RTRN;\nend_if;\n',
        'if ' + flags['name'] + ' = #encoded.' + flags['value'] + ' then\n\t#_return := #decoded.' + flags['value'] + ';\n\tgoto RTRN;\nend_if;\n'
    ]

_encoded = ''
for key in type:
    for i,t in enumerate(templates):
        _output = ''
        _o = ''
        for s in type[key]:
            _o = t.replace(flags['value'], s)
            _o = _o.replace(flags['name'], key)
            _output += _o
        _output +='RTRN:\n#FUNCTION := _return;'
        file_name = ''
        if i == 0:
            file_name += 'encode_'
        else:
            file_name += 'decode_'
        file_name += key + '.txt'
        f = open(file_name, "w")
        f.write(_output)
        f.close()
