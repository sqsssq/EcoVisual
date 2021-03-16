# coding=utf-8
import xlwings as xw 
import itertools
from hashtree import HashTree, sameNodes######################导入hashtree.py文件
from functools import reduce
import xlrd as xd
import csv
import codecs
import math
import pandas as pd
 
class FreqItem(object):
    def __init__(self, transactions, sup_theta):
        self.transactions = [sorted(t) for t in [x for x in transactions if x]]
        self.sup_theta = sup_theta
        self.freqset = []
 
    def filterCandidates(self, cand):
        """
        Build a HashTree with candidates cand, then count support of these candidates to filter out
        all those that have support not lower than sup_theta / 建立候选集哈希树，过滤掉sup不低于sup_theta的候选项
        """
        hashtree = HashTree(cand)
        hashtree.count(self.transactions)
        return hashtree.getNodes(self.sup_theta)
 
    def freqOneSet(self):
        """
        Generate frequent 1-item sets
        """
        one_item_cand = set()
        for t in self.transactions:
            for w in t:
                one_item_cand.add(w)
        return sorted(self.filterCandidates([[i] for i in one_item_cand]), key=lambda i: i[0].name)
 
    def genNextCand(self, preItems):
        """
        Generate next candidates by dynamic programming
        Find range [i, j) such that items in this range have same prefix
        e.g., [1,2,3,4] and [1,2,3,5] have same prefix, so they should be in one same range
        Then, generate 2-combinations of these ranges as result
        """
        res = []
        i, j = 0, 0
        while i < len(preItems):
            if j < len(preItems) and sameNodes(preItems[j][:-1], preItems[i][:-1]):
                j += 1
            else:
                res += [pair[0] + [pair[1][-1]] for pair in itertools.combinations(preItems[i:j], 2)]
                i = j
        return [[i.name for i in items] for items in res]
 
    def genFreqItemSets(self):
        """
        @return Frequent item sets with their frequency
        """
        if self.freqset: return self.freqset
        cur = self.freqOneSet()
        freqKSet = []
        while cur:
            freqKSet.append(cur)
            cur = self.filterCandidates(self.genNextCand(cur))
        self.freqset = reduce(lambda res, x: res + x, freqKSet, [])
        name_freq_pairs = [[(i.name, i.val) for i in items] for items in self.freqset[::-1]]
        res = [list(zip(*items)) for items in name_freq_pairs]

        a=input("请输入包含的决策行为最小个数：")##############################设置决策行为的个数
        b=int(a)
        
        rest = []
        for pair in res:
            pairs=list(pair[0])
            #print(pairs[0])
            if len(pairs)>b-1:
                rest.append((pairs, pair[1][-1]))
        return list(rest)
 
if __name__ == '__main__':
    data =xd.open_workbook ('spm数据集(wuchushicaifu).xlsx') #打开excel表所在路径
    sheet = data.sheet_by_name('Sheet1')  #读取数据，以excel表名来打开
    d = []
    for r in range(sheet.nrows): #将表中数据按行逐步添加到列表中，最后转换为list结构
        data1 = []
        for c in range(sheet.ncols):
            data1.append(sheet.cell_value(r,c))
        d.append(list(data1))

    transactions = d
    freqItem = FreqItem(transactions, sup_theta=1300)#########################设置阈值

    
    data1=list(freqItem.genFreqItemSets())
    #print(data1)
    with open("fourth.csv", "rt", encoding="utf-8") as vsvfile:
       reader = csv.reader(vsvfile)
       rows = [row for row in reader]
    #print(data1)
    #print(rows)
    v=[]
    for i in range(len(data1)):
        alist=data1[i][0]
        v1=[]
        for j in range(len(data1)):
            blist=data1[j][0]
            count=0
            for k in range(len(rows)):
                clist=rows[k]
                for g in range(len(clist)):
                    if g!=0:
                        clist[g]=float(clist[g])
                if k%20==0:
                    flag=0
                if set(alist)<=set(clist) and set(blist)<=set(clist) and flag==0:
                    count=count+1
                    flag=1
            #print(count/304)
            v1.append(count/304)
        v.append(v1)
    print(len(v))
    #存起来    
    f = codecs.open('fourthJIEGUO.csv','w','gbk')
    writer = csv.writer(f)
    for i in v:
        writer.writerow(i)
        
    f.close() 
