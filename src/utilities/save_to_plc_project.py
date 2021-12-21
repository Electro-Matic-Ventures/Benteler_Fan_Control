import os
from distutils import dir_util
from datetime import datetime as dt
import argparse

def getDestinationPath(relative_path, version):

    # resolve destination path
    file_list = []
    _path = relative_path + '\\plc_project\\'
    for _file in os.listdir(_path):
        try:
            file_list.append(int(_file[-3:]))
        except :
            continue
    _path += version
    _path += '_{}\\Web'.format(f'{max(file_list):03d}')

    return _path

def save(version):    

    # pring status: time started
    print('\n')
    print('Started operation at {}'.format(dt.now()))

    # relative path
    relative_path = os.getcwd()

    # resolve source path
    source_path = relative_path + '\\src\\Web'

    # resolve destination path
    destination_path = getDestinationPath(relative_path, version)

    # perform save
    if os.path.isdir(source_path):
        print('Source path found...')
        if os.path.isdir(destination_path):
            print('Destination path found...')
            dir_util.copy_tree(source_path,destination_path)
            print('Copied From: {}'.format(source_path))
            print('Saved To: {}'.format(destination_path))
            return True
        else:
            print('Destination path not found.')
            return False
    else:
        print('\n')
        print('Source path not found.')
        return False

parser = argparse.ArgumentParser()
parser.add_argument("-v", help = "current version in format [SO#]_[release]. eg: '1870065_002' for SO# 1870065 and release 002. the script automatically saves to the hightes build number.")
args = parser.parse_args()
save(args.v)
