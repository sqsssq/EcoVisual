# -*- coding: utf-8 -*-
# @Time    : 2020/10/26 9:10
# @Author  : SanZhi
# @File    : FileProcess.py
# @Software: PyCharm
from sklearn.manifold import TSNE
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


def preprocess(url):
    data = read_csv(url)
    # print(list(data.iloc()[0]))
    # for x, v in enumerate(list(data.iloc()[0])[1:-1]):
    #     print(x, v)
    # print(list(data.iloc()[0])[-1])
    predata = []
    namespace = []
    for i in range(len(data['code'])):
        list_data = []
        for k, v in enumerate(data.keys()[2:-1]):
            name = list(data.iloc()[i])[2:-1]
            list_data.append(v + str(name[k]))
        predata.append(list_data)
        l = {
            'id': list(data.iloc()[i])[0],
            'l': list(data.iloc()[i])[-1]
        }
        namespace.append(l.copy())

    print('Finish PreProcess')
    return predata, namespace
