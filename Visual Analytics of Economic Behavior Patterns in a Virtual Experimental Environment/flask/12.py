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
    #data2=freqItem.genFreqItemSets()
    data_selected=data1
    
    #print(data1)
    with open("jingshouyi.csv", "rt", encoding="utf-8") as vsvfile:
       reader = csv.reader(vsvfile)
       rows = [row for row in reader]
    
    #########################################净收益，保存在V1
    data=[]
    for i in range(len(data1)):
        alist=data1[i][0]
        num=0
        he=0
        for j in range(len(rows)):
            #print(alist)
            blist=rows[j]
            for g in range(len(blist)):
                blist[g]=float(blist[g])
            if set(alist)<=set(blist):
                num=num+1
                he=he+blist[12]-blist[11]
        #print(num)
        #print(alist)        
        #print(he/num)
        data.append(he/num)

    v1=[]
    for i in range(len(data)):
        a1=data[i]
        v=[]
        for j in range(len(data)):
            b1=abs(a1-data[j])
            v.append(b1)
        v1.append(v)
    print(len(v1))
    ############################################输出
    f = codecs.open('the first.csv','w','gbk')
    writer = csv.writer(f)
    for i in v1:
        writer.writerow(i)

    f.close()
    
    ###########################################交集除以并集，保存在V2
    c=[]
    for k in range(len(data_selected)):
        data_selected[k]=list(data_selected[k])
        if len(data_selected[k][0])<13:
            for i in range(len(data_selected[k][0]),13):
                data_selected[k][0].insert(i,-1)
                
        if data_selected[k][0][0]!=1 and data_selected[k][0][0]!=2 and data_selected[k][0][0]!=-1:
            data_selected[k][0].insert(0,-1)
            
        if data_selected[k][0][1]!=3 and data_selected[k][0][1]!=4 and data_selected[k][0][1]!=5 and data_selected[k][0][1]!=-1:
            data_selected[k][0].insert(1,-1)
            
        if data_selected[k][0][2]!=6 and data_selected[k][0][2]!=7 and data_selected[k][0][2]!=8 and data_selected[k][0][2]!=-1:
            data_selected[k][0].insert(2,-1)
            
        if data_selected[k][0][3]!=9 and data_selected[k][0][3]!=10 and data_selected[k][0][3]!=-1:
            data_selected[k][0].insert(3,-1)
            
        if data_selected[k][0][4]!=11 and data_selected[k][0][4]!=12 and data_selected[k][0][4]!=-1:
            data_selected[k][0].insert(4,-1)
            
        if data_selected[k][0][5]!=13 and data_selected[k][0][5]!=14 and data_selected[k][0][5]!=-1:
            data_selected[k][0].insert(5,-1)
            
        if data_selected[k][0][6]!=15 and data_selected[k][0][6]!=16 and data_selected[k][0][6]!=-1:
            data_selected[k][0].insert(6,-1)
            
        if data_selected[k][0][7]!=17 and data_selected[k][0][7]!=18 and data_selected[k][0][7]!=19 and data_selected[k][0][7]!=20 and data_selected[k][0][7]!=-1:
            data_selected[k][0].insert(7,-1)
            
        if data_selected[k][0][8]!=21 and data_selected[k][0][8]!=22 and data_selected[k][0][8]!=-1:
            data_selected[k][0].insert(8,-1)
            
        if data_selected[k][0][9]!=23 and data_selected[k][0][9]!=24 and data_selected[k][0][9]!=25 and data_selected[k][0][9]!=26 and data_selected[k][0][9]!=-1:
            data_selected[k][0].insert(9,-1)
            
        if data_selected[k][0][10]!=27 and data_selected[k][0][10]!=28 and data_selected[k][0][10]!=-1:
            data_selected[k][0].insert(10,-1)
            
        if data_selected[k][0][11]!=29 and data_selected[k][0][11]!=30 and data_selected[k][0][11]!=31 and data_selected[k][0][11]!=32 and data_selected[k][0][11]!=33 and data_selected[k][0][11]!=34 and data_selected[k][0][11]!=35 and data_selected[k][0][11]!=-1:
            data_selected[k][0].insert(11,-1)
            
        data_selected[k][0][12]=-1
        if len(data_selected[k][0])>=13:
            b=[]
            for p in range(13):
                b.append(data_selected[k][0][p])
            c.append(b)

    v2=[]
    for i in range(len(c)):
        alist=c[i]
        v1=[]
        for j in range(len(c)):
            blist=c[j]
            data1=list(set(alist) & set(blist))
            data2=list(set(alist+blist))
            v1.append(len(data1)/len(data2))    
        v2.append(v1)
    print(len(v2))
    ############################################输出
    f = codecs.open('the second.csv','w','gbk')
    writer = csv.writer(f)
    for i in v2:
        writer.writerow(i)
        
    f.close()
