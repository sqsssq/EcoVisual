# coding=utf-8
import xlwings as xw
import itertools
from hashtree import HashTree, sameNodes  ######################导入hashtree.py文件
from functools import reduce
import xlrd as xd
import pandas as pd


def read_csv(add):
    cr = pd.read_csv(add)
    return cr



class FreqItem(object):
    def __init__(self, transactions, sup_theta, suq_len):
        self.transactions = [sorted(t) for t in [x for x in transactions if x]]
        self.sup_theta = sup_theta
        self.suq_len = suq_len
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

        # a = input("请输入包含的决策行为最小个数：")  ##############################设置决策行为的个数
        a = self.suq_len
        b = int(a)

        rest = []
        for pair in res:
            pairs = list(pair[0])
            nums = {}
            num = []
            for cnt in range(1, 14):
                nums[cnt] = -1
            # print(pairs[0])
            if len(pairs) > b - 1:
                for i in range(len(pairs)):
                    if pairs[i] == 1.0:
                        pairs[i] = "初始财富为负或者0"  ###########################把数字转成汉字输出
                        nums[1] = 0
                    if pairs[i] == 2.0:
                        pairs[i] = "初始财富为正"
                        nums[1] = 1
                    if pairs[i] == 3.0:
                        pairs[i] = "工作能力低"
                        nums[2] = 0
                    if pairs[i] == 4.0:
                        pairs[i] = "工作能力中等"
                        nums[2] = 1
                    if pairs[i] == 5.0:
                        pairs[i] = "工作能力高"
                        nums[2] = 3
                    if pairs[i] == 6.0:
                        pairs[i] = "健康保险0"
                        nums[3] = 0
                    if pairs[i] == 7.0:
                        pairs[i] = "健康保险1"
                        nums[3] = 1
                    if pairs[i] == 8.0:
                        pairs[i] = "健康保险2"
                        nums[3] = 2
                    if pairs[i] == 9.0:
                        pairs[i] = "不买财产保险"
                        nums[4] = 0
                    if pairs[i] == 10.0:
                        pairs[i] = "买财产保险"
                        nums[4] = 1
                    if pairs[i] == 11.0:
                        pairs[i] = "不借贷"
                        nums[5] = 0
                    if pairs[i] == 12.0:
                        pairs[i] = "借贷"
                        nums[5] = 1
                    if pairs[i] == 13.0:
                        pairs[i] = "不投资"
                        nums[6] = 0
                    if pairs[i] == 14.0:
                        pairs[i] = "投资"
                        nums[6] = 1
                    if pairs[i] == 15.0:
                        pairs[i] = "不风险投资"
                        nums[7] = 0
                    if pairs[i] == 16.0:
                        pairs[i] = "风险投资"
                        nums[7] = 1
                    if pairs[i] == 17.0:
                        pairs[i] = "负面冲击0"
                        nums[8] = 0
                    if pairs[i] == 18.0:
                        pairs[i] = "负面冲击1"
                        nums[8] = 1
                    if pairs[i] == 19.0:
                        pairs[i] = "负面冲击2"
                        nums[8] = 2
                    if pairs[i] == 20.0:
                        pairs[i] = "负面冲击3"
                        nums[8] = 3
                    if pairs[i] == 21.0:
                        pairs[i] = "彩票不中奖"
                        nums[9] = 0
                    if pairs[i] == 22.0:
                        pairs[i] = "彩票中奖"
                        nums[9] = 1
                    if pairs[i] == 23.0:
                        pairs[i] = "生病0"
                        nums[10] = 0
                    if pairs[i] == 24.0:
                        pairs[i] = "生病1"
                        nums[10] = 1
                    if pairs[i] == 25.0:
                        pairs[i] = "生病2"
                        nums[10] = 2
                    if pairs[i] == 26.0:
                        pairs[i] = "生病3"
                        nums[10] = 3
                    if pairs[i] == 27.0:
                        pairs[i] = "不失业"
                        nums[11] = 0
                    if pairs[i] == 28.0:
                        pairs[i] = "失业"
                        nums[11] = 1
                    if pairs[i] == 29.0:
                        pairs[i] = "风险偏好0"
                        nums[13] = 0
                    if pairs[i] == 30.0:
                        pairs[i] = "风险偏好1"
                        nums[13] = 1
                    if pairs[i] == 31.0:
                        pairs[i] = "风险偏好2"
                        nums[13] = 2
                    if pairs[i] == 32.0:
                        pairs[i] = "风险偏好3"
                        nums[13] = 3
                    if pairs[i] == 33.0:
                        pairs[i] = "风险偏好4"
                        nums[13] = 4
                    if pairs[i] == 34.0:
                        pairs[i] = "风险偏好5"
                        nums[13] = 5
                    if pairs[i] == 35.0:
                        pairs[i] = "风险偏好6"
                        nums[13] = 6
                rest.append((pairs, pair[1][-1], nums))
        return rest


def main(suq_theta, suq_len):
    data = xd.open_workbook('spm数据集(wuchushicaifu).xlsx')  # 打开excel表所在路径
    sheet = data.sheet_by_name('Sheet1')  # 读取数据，以excel表名来打开
    d = []
    for r in range(sheet.nrows):  # 将表中数据按行逐步添加到列表中，最后转换为list结构
        data1 = []
        for c in range(sheet.ncols):
            data1.append(sheet.cell_value(r, c))
        d.append(list(data1))

    transactions = d
    # print(d)
    freqItem = FreqItem(transactions, sup_theta=suq_theta, suq_len=suq_len)  #########################设置阈值

    data = freqItem.genFreqItemSets()
    data_selected = []  ##############################去重
    for index1, d1 in enumerate(data):
        for index2, d2 in enumerate(data):
            if set(d1[0]) < set(d2[0]) and index1 != index2:
                break
        else:
            data_selected.append(d1)
    fpm = []
    for d in data_selected:
        fpm.append(d[2])

    dataD = read_csv(r'D:/EcoVisual/g/EcoVisual/EuroVis/data/box_calc_rank.csv')
    ans = []
    print(len(dataD['1']))
    for i in range(len(dataD['1'])):
        mx = 0
        ma = {}
        for j in range(len(fpm)):
            nk = 0
            for k in range(1, 14):
                if fpm[j][k] == dataD[str(k)][i]:
                    nk += 1
            if mx < nk:
                mx = nk
        ma[0] = mx
        vcnt = 1
        for j in range(len(fpm)):
            nk = 0
            for k in range(1, 14):
                if fpm[j][k] == dataD[str(k)][i]:
                    nk += 1
            if mx == nk:
                ma[vcnt] = j
                vcnt += 1
        while vcnt <= len(fpm):
            ma[vcnt] = ""
            vcnt += 1
        ans.append(ma)
    # print(ans)
    # for i in dataList:
    #     print(i)
    # print(data_selected[3])
    # with open('test.txt', 'w', encoding='utf-8') as f:  #############################输出到text.txt文件
    #     for i in range(len(data_selected)):
    #         f.write(str(data_selected[i]) + '\n')

    return fpm, ans


# if __name__ == '__main__':
#     main(1200, 7)
