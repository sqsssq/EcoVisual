# -*- coding: utf-8 -*-
# @Time    : 2020/2/8 14:52
# @Author  : SanZhi
# @File    : get_DBscan.py
# @Software: PyCharm
from sklearn.cluster import DBSCAN
import matplotlib.pyplot as plt
import pandas as pd
import os
import json
import math
import random


# 读文件
def read_json(add):
    with open(add, 'rt', encoding="utf-8") as f:
        cr = json.load(f)
    f.close()
    return cr


def read_csv(add):
    cr = pd.read_csv(add)
    return cr


# 写文件
def write_json(add, arr):
    with open(add, 'a', encoding='utf-8', newline='') as f:
        json.dump(arr, f)
    f.close()
    return


def getDBSCAN(data, epses, min):
    db = DBSCAN(eps=epses, min_samples=min).fit(data)
    return db


def Draw(XData, e, m):
    plt.figure(figsize=(10, 10))

    color_s = []
    for i in range(90):
        letters = '0123456789ABCDEF'
        rand_color = '#'
        for j in range(6):
            rand_color += letters[random.randint(0, 15)]
        color_s.append(rand_color)
    print(color_s)

    colors = ['black', 'yellow', 'salmon', 'cyan', 'teal', 'gold', 'gray', 'peru', 'mediumpurple', 'tomato',
              'royalblue', 'red', 'mediumblue', 'pink', 'yellowgreen', 'slateblue', 'purple', 'orangered', 'turquoise']
    markers = 'o'
    # print('Xdata = ', len(XData))
    db_data = getDBSCAN(XData, e, m)
    # print(db_data.labels_)
    db_list = db_data.labels_
    # print(len(db_list))
    print('len = ', max(db_list) + 1)
    for i, l in enumerate(db_data.labels_):
        plt.plot(XData[i][0], XData[i][1], color=color_s[l], marker=markers, ls='None', alpha=0.5)
        # plt.title('%s Position K-Means' % (len(XData)))
    plt.show()
    return db_list


def getDbscanData(tsneData):
    d_data = tsneData
    # print(d_data)
    s_data = []
    for i in d_data:
        # print(i)
        s_data.append([float(i['x']), float(i['y'])])
    # print(s_data)
    # for num in range(30, 40):
    l = Draw(s_data, 5, 10)
    # print(l)

    res = []

    for key, value in enumerate(d_data):
        res.append({
            'id': str(value['id']),
            'x': float(value['x']),
            'y': float(value['y']),
            'l': int(value['l']),
            'label': int(l[key])
        })
    print('Finish DBscan')
    return res


def main():
    d_data = read_json('D:\\EcoVisual\\vis\\data\\ts\\alldriving.json')
    print(d_data)
    s_data = []
    for i in d_data:
        # print(i)
        s_data.append([float(i['x']), float(i['y'])])
    # print(s_data)
    # for num in range(30, 40):
    l = Draw(s_data, 5, 10)
    # print(l)

    res = []

    for key, value in enumerate(d_data):
        res.append({
            'id': str(value['id']),
            'x': float(value['x']),
            'y': float(value['y']),
            'l': int(value['l']),
            'label': int(l[key])
        })
        
    # write_json('D:\\EcoVisual\\EuroVis\\data\\ts\\20200907db', res)

    # x_data = read_csv('D:\\Economic Behavior\\datad\\s.csv')
    # res = []
    # for num, name in enumerate(x_data['code']):
    #     r = {}
    #     r['code'] = name
    #     r['x'] = float(d_data[num][0])
    #     r['y'] = float(d_data[num][1])
    #     r['l'] = int(l[num])
    #     r['label'] = int(x_data['biao'][num])
    #     res.append(r)
    #
    # write_json('D:\\Economic Behavior\\datad\\xxxx.json', res)


# if __name__ == '__main__':
#     main()
