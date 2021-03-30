'''
Author: your name
Date: 2021-03-15 22:22:19
LastEditTime: 2021-03-28 16:16:34
LastEditors: Please set LastEditors
Description: In User Settings Edit
FilePath: \getDoc\FileProcess.py
'''
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
    namespacex = [
        'work', 'health_invest', 'repay', 'loan', 'invest', 'venture',
        'insurance', 'lottery', 'impact', 'health_impact', 'preference',
        'patience'
    ]
    name_select = [
        1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0
    ]
    predata = []
    namespace = []
    for i in range(len(data[data.keys()[0]])):
        round = int(data["subsession.round_number"][i])
        # 限制条件
        # if round < 1 or round > 10:
        #     continue
        print(round)
        list_data = []
        # for k, v in enumerate(data.keys()[2:-1]):
        #     name = list(data.iloc()[i])[2:-1]
        #     list_data.append(v + str(name[k]))
        for k, v in enumerate(namespacex):
            # print(data[v + '_profit_type'])
            # d = str(data[v + '_type'][i])
            if name_select[k] == 0:
                continue
            # d = str(data['cash_before_' + v + '_type'][i]) + v + str(
            #     data[v + '_type'][i]) + str(data[v + '_profit_type'][i])
            # d = v + str(data[v + '_type'][i])
            list_data.append(str(data['cash_before_' + v + '_type'][i]))
            list_data.append(v + str(data[v + '_type'][i]))
            list_data.append(str(data[v + '_profit_type'][i]))
            # list_data.append(d)
        predata.append(list_data)
        l = {'id': list(data.iloc()[i])[0], 'l': list(data.iloc()[i])[1]}
        namespace.append(l.copy())
    print(predata)

    print('Finish PreProcess')
    return predata, namespace


preprocess(r'use5.csv')