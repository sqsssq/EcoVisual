# -*- coding: utf-8 -*-
# @Time    : 2021/2/1 19:25
# @Author  : SanZhi
# @File    : for_tsne.py
# @Software: PyCharm
# TSNE降维
from sklearn.manifold import TSNE
import json
import csv
import numpy as np
import pandas as pd
from gensim.models.doc2vec import Doc2Vec, TaggedDocument
from sklearn.manifold import TSNE
from sklearn.cluster import DBSCAN
import matplotlib.pyplot as plt
import random
import csv


def getTSNE(data):
    ts = TSNE(n_components=2)
    ts_data = ts.fit_transform(data)
    return ts_data


def write_csv(add, arr):
    with open(add, 'a', encoding='utf-8', newline='') as f:
        writer = csv.writer(f)
        writer.writerows(arr)
    f.close()


with open("net profit1.csv", "rt", encoding="utf-8") as csvfile:
    reader = csv.reader(csvfile)
    rows = [row for row in reader]
results = getTSNE(rows)
results = list(results)
print(results)
write_csv('s4.csv', results)