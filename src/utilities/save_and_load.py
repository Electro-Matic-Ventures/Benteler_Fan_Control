from load_to_plc import load_to_plc
from save_to_plc_project import save
import argparse


parser = argparse.ArgumentParser()
parser.add_argument("-v", help = "current version in format [SO#]_[release]. eg: '1870065_002' for SO# 1870065 and release 002. the script automatically saves to the hightes build number.")
args = parser.parse_args()

if(save(args.v)):
    load_to_plc()
else:
    print('Terminated due to missing directory.')