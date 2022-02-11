import json
import copy

library_size = 50

# "command_speed": ":="Stations".me[7].web_interface.manual.command_speed:",
# "run": ":="Stations".me[7].web_interface.manual.toggle:",
# "mode": ":="Stations".me[7].web_interface.manual.mode:",
# "station_index": 7

_template = [
    {"command_speed": '":="Stations".me[[INDEX]].web_interface.manual.command_speed:"'},
    {"run": '":="Stations".me[[INDEX]].web_interface.manual.toggle:"'},
    {"mode": '":="Stations".me[[INDEX]].web_interface.manual.mode:"'},
    {"station_index": '[INDEX]'}
]


for _i in range(library_size):
    _list = {}
    if _i == 7: next
    _pairs = copy.deepcopy(_template)
    for _pair in _pairs:
        _key = [*_pair][0]
        _pair[_key] = _pair[_key].replace('[INDEX]', str(_i))
        _list.update(_pair)
    _output = json.dumps(_list, separators=(',', ': '), sort_keys=True, indent=4)
    _output = _output.replace('\\', '')
    _output = _output.replace('""', '"')

    with open(f'./Web/tags/Station{_i}ManualTags.json', 'w') as _f:
        _f.write('<!-- AWP_In_Variable Name = \'"Stations"\' -->\n\n')
        _f.write(_output)