# -*- coding: utf-8 -*-
# @Time    : 2020/10/26 9:30
# @Author  : SanZhi
# @File    : index.py
# @Software: PyCharm
import FileProcess
import getdoc2vec
import get_tSNE
import get_DBscan

predata, namespace = FileProcess.preprocess(r'use5.csv')
DocData = getdoc2vec.do_doc2vec(predata)
TsneData = get_tSNE.getTsneData(DocData, namespace)
# FileProcess.write_json('1-20alltsne.json', TsneData)
# FileProcess.write_json('1-20peopleList.json', namespace)
DBscanData = get_DBscan.getDbscanData(TsneData)
FileProcess.write_json('1-20top7.json', DBscanData)
