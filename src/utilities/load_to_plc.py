import pyautogui as pag
from pandas import DataFrame
from datetime import datetime as dt
import numpy as np


def load_to_plc():
    
    moves = [
		{'x': 772, 'y': 433},
		{'x': 1281, 'y': 643},
		{'x': 900, 'y': 847},
		{'x': 1006, 'y': 553},
		{'x': 786, 'y': 442},
		{'x': 402, 'y': 57},
		{'x': 1260, 'y': 460},
		{'x': 1254, 'y': 495},
		{'x': 1198, 'y': 715},
		{'x': 1124, 'y': 726}
    ]

    wait = [
        0.25,
        0.25,
        0.25,
        5.0,
        0.25,
        3.0,
        2.0,
        0.25,
        3.0,
        0.25
    ]

    click_locations = [
        'PLC', 
        'PROPERTIES', 
        'GENERATE BLOCKS', 
        'CONFIRM WEB DB DELETION', 
        'PLC', 
        'DOWNLOAD BUTTON', 
        'STOP PLC LIST BOX', 
        'STOP PLC SELECTION', 
        'LOAD', 
        'FINISH'
    ]    
    
    for i,move in enumerate(moves): 
        manipulate_mouse(move, wait[i])
        label = write_labels(i, click_locations, move, wait)
        print(label)

    print('Moves list completed at ' + str(dt.now()))
    print('\n')
    return


def manipulate_mouse(move, wait):
    pag.moveTo(move['x'], move['y'], 0.0) 
    pag.click()    
    pag.PAUSE = wait


def write_labels(i, locations, move, wait):
    move_label = write_move_label(i)
    write_label = write_loc_label(locations[i], locations)
    time_label = str(write_time_label(wait[i]))
    label = move_label + write_label + time_label
    return label


def write_move_label(i):
    move_label = 'MOVE: {}'.format(str(i+1))
    if i < 9:
        move_label += '    '
    else:
        move_label += '   '
    return move_label


def write_loc_label(loc, labels):
    longest = get_longest_label(labels)
    _loc_spaces = ''
    for _ in range(longest - len(loc)):
        _loc_spaces += ' ' 
    _loc_spaces += '    '
    label = loc + _loc_spaces
    return label


def get_longest_label(labels):
    longest = 0
    for x in labels:
        if len(x) > longest:
            longest = len(x)
    return longest


def write_time_label(wait):
    return wait
