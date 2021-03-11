# -*- coding: utf-8 -*-
# @Time    : 2021/2/2 16:49
# @Author  : SanZhi
# @File    : normlize.py
# @Software: PyCharm
from sklearn.preprocessing import MinMaxScaler
import numpy as pd
import csv
from sklearn.manifold import TSNE


def read_file(address):
    with open(address, "rt", encoding="utf-8") as csvfile:
        reader = csv.reader(csvfile)
        rows = [row for row in reader]
    return rows


def getTSNE(data):
    ts = TSNE(n_components=2)
    ts_data = ts.fit_transform(data)
    return ts_data


def scale(array):
    scalar = MinMaxScaler(feature_range=(0, 1))  # 加载函数
    a = pd.array(array)
    b = scalar.fit_transform(a)
    return b


def write_csv(add, arr):
    with open(add, 'a', encoding='utf-8', newline='') as f:
        writer = csv.writer(f)
        writer.writerows(arr)
    f.close()


def testIn(a, b, c):
    s1 = read_file('setSimilarity.csv')
    s2 = read_file('net profit1.csv')
    s3 = read_file('sim.csv')

    s1x = scale(s1)
    s2x = scale(s2)
    s3x = scale(s3)

    res = []

    print(s1x[0][1], ' ', s2x[0][1], ' ', s3x[0][1])

    for i in range(len(s1)):
        res.append([])
        for j in range(len(s1[i])):
            res[i].append(0)
            res[i][j] = s1x[i][j] * a + (1 - s2x[i][j]) * b + s3x[i][j] * c

    print(res[0][1])
    # write_csv('final2.csv', res)
    data = getTSNE(res)
    result = list(data)
    # print(result)
    ans = []
    for i in result:
        ans.append({
            'x': float(i[0]),
            'y': float(i[1])
        })
    # print(ans)
    return ans
# testIn(1, 1, 1)
