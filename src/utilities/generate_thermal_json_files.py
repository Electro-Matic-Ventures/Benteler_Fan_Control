import json
import copy

library_size = 50

# "start": {
#     "temperature": ":="Stations".me[7].schedules.thermal.start.temperature:",
#     "speed": ":="Stations".me[7].schedules.thermal.start.speed:"
# },
# "max": {
#     "temperature": ":="Stations".me[7].schedules.thermal.max.temperature:",
#     "speed": ":="Stations".me[7].schedules.thermal.max.speed:"
# },
# "station_index": 7

_template = [
    {
        "start": {                                                                                                                                                                           
            "temperature": '":="Stations".me[[INDEX]].schedules.thermal.start.temperature:"',
            "speed": '":="Stations".me[[INDEX]].schedules.thermal.start.speed:"'
        }
    },
    {"max": {
        "temperature": '":="Stations".me[[INDEX]].schedules.thermal.max.temperature:"',
        "speed": '":="Stations".me[[INDEX]].schedules.thermal.max.speed:"'
    }},
    {"station_index": '[INDEX]'}
]

def replaceInDict(data, flag, new_value):
    if type(data) is dict:
        for _key in data.keys():
            if type(data[_key]) is dict:
                replaceInDict(data[_key], flag, new_value)
            if type(data[_key]) is not dict:
                data[_key] = data[_key].replace(flag, new_value)

for _i in range(library_size):
    _list = {}
    if _i == 7: next
    _pairs = copy.deepcopy(_template)
    for _pair in _pairs:
        replaceInDict(_pair, '[INDEX]', str(_i))
        _list.update(_pair)
    _output = json.dumps(_list, separators=(',', ': '), sort_keys=True, indent=4)
    _output = _output.replace('\\', '')
    _output = _output.replace('""', '"')

    with open(f'./Web/tags/Station{_i}ThermalTags.json', 'w') as _f:
        _f.write('<!-- AWP_In_Variable Name = \'"Stations"\' -->\n\n')
        _f.write(_output)