# -*- coding: utf-8 -*-
# @Time    : 2021/1/19 14:32
# @Author  : SanZhi
# @File    : app.py.py
# @Software: PyCharm

from flask import Flask, jsonify, request
from flask_cors import *
import fpm
import normlize

app = Flask(__name__)
CORS(app, supports_credentials=True)


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == "POST":
        post_data = request.values
        # print(post_data['data'])
        fpmd, fpmType = fpm.main(int(post_data['frequency']), int(post_data['length']))
        return jsonify({
            # 'frequency': post_data['frequency'],
            # 'length': post_data['length']
            'fpm': fpmd,
            'fpmType': fpmType
        })
    return 1


@app.route('/xA', methods=["GET", "POST"])
def x():
    if request.method == "POST":
        post_data = request.values
        print(post_data['a'], ' ', post_data['b'], ' ', post_data['c'])
        ans = normlize.testIn(float(post_data['a']), float(post_data["b"]), float(post_data["c"]))
        return jsonify({
            'data': ans
        })


if __name__ == '__main__':
    app.run()
