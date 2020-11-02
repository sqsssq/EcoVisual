# -*- coding: utf-8 -*-
# @Time    : 2020/2/8 11:53
# @Author  : SanZhi
# @File    : get_tSNE.py
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


# TSNE降维
def getTSNE(data):
    ts = TSNE(n_components=2)
    ts_data = ts.fit_transform(data)
    return ts_data


def getTsneData(predata, namespace):
    predata = np.array(predata)
    predata.astype('float32')
    tf = getTSNE(predata)
    res = []
    for i in tf:
        res.append([float(i[0]), float(i[1])])
    result = []
    for i in range(len(tf)):
        r = {
            'id': str(namespace[i]['id']),
            'x': float(tf[i][0]),
            'y': float(tf[i][1]),
            'l': int(namespace[i]['l']),
        }
        result.append(r)
    print('Finish Tsne')
    return result


def main():
    d_data = read_csv('data.csv')
    print(len(d_data['code']))
    print(d_data['code'][0])

    r = []
    data = {}
    for i in range(1, 21):
        data[i] = []
    for num in range(6080):
        l = []
        for i in range(0, 11):
            l.append(float(d_data[str(i)][num]))
        # print(l)
        r.append(l)
    r = np.array(r)
    print(r)
    tf = getTSNE(r)
    print(tf)
    res = []
    for i in tf:
        print(i)
        res.append([float(i[0]), float(i[1])])
    # write_json('D:\\Economic Behavior\\datad\\tsne_2.json', res)
    result = []
    for i in range(len(tf)):
        r = {
            'id': str(d_data['code'][i]),
            'x': float(tf[i][0]),
            'y': float(tf[i][1]),
            'l': int(d_data['biao'][i]),
            'val': float(d_data['val'][i]),
            'start': float(d_data['start'][i]),
            'end': float(d_data['end'][i])
        }
        result.append(r)
    write_json('D:\\Economic Behavior\\datad\\tsne_f_.json', result)


# if __name__ == '__main__':
#     main()
