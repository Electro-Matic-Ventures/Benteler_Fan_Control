import json
import copy

library_size = 50

#     "station_id": ":="Stations".me[7].id:",
#     "state": ":="Stations".me[7].drive.feedback.state:",
#     "speed": ":="Stations".me[7].drive.feedback.speed.me.processed:",
#     "current": ":="Stations".me[7].drive.feedback.current.me.processed:",
#     "temperature": ":="Stations".me[7].drive.sensors.thermal.me.processed:",
#     "faults": ":="Stations".me[7].drive.feedback.faults:",
#     "station_index": 7

_template = [
    {"station_id": '":="Stations".me[[INDEX]].id:"'},
    {"state": '":="Stations".me[[INDEX]].drive.feedback.state:"'},
    {"speed": '":="Stations".me[[INDEX]].drive.feedback.speed.me.processed:"'},
    {"current": '":="Stations".me[[INDEX]].drive.feedback.current.me.processed:"'},
    {"temperature": '":="Stations".me[[INDEX]].drive.sensors.thermal.me.processed:"'},
    {"faults": '":="Stations".me[[INDEX]].drive.feedback.faults:"'},
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

    with open(f'./Web/tags/Station{_i}StatusTags.json', 'w') as _f:
        _f.write('<!-- AWP_In_Variable Name = \'"Stations"\' -->\n\n')
        _f.write(_output)