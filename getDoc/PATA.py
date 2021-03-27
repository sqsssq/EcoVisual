import json
import csv
import numpy as np
import pandas as pd


# 读文件
def read_json(add):
    with open(add, 'rt', encoding="utf-8") as f:
        cr = json.load(f)
    f.close()
    return cr


# 写文件
def write_json(add, arr):
    with open(add, 'a', encoding='utf-8', newline='') as f:
        json.dump(arr, f)
    f.close()
    return


def read_csv(add):
    cr = pd.read_csv(add)
    return cr

data = 