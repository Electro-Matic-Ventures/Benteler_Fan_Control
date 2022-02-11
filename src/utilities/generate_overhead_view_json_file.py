import json
import copy

library_size = 50

# ":="Stations".me[0].faults.color:"

_template = ['":="Stations".me[0].faults.color:"']

_list = []
for _i in range(library_size):
    _station_dict = {
        "color": f'":="Stations".me[{_i}].faults.color:"',
        "id": f'":="Stations".me[{_i}].interface.id:"'
    }
    _list.append(_station_dict)

_dict = {"colors": _list}
_output = json.dumps(_dict, separators=(',', ': '), sort_keys=True, indent=4)
_output = _output.replace('\\', '')
_output = _output.replace('""', '"')

with open(f'./Web/tags/OverheadViewTags.json', 'w') as _f:
    _f.write('<!-- AWP_In_Variable Name = \'"Stations"\' -->\n\n')
    _f.write(_output)