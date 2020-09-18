import json
from gensim.models.doc2vec import Doc2Vec, TaggedDocument
import numpy as np


def readData(url):
    with open(url, 'r') as f:
        # data=json.load(f)
        data = f.readlines()
        # print(data)
        data = json.loads(data[0].replace('\'', '\"'))
    return data


def read_json(add):
    with open(add, 'rt', encoding="utf-8") as f:
        cr = json.load(f)
    f.close()
    return cr


def write_json(add, arr):
    with open(add, 'a', encoding='utf-8', newline='') as f:
        json.dump(arr, f)
    f.close()
    return


def do_doc2vec(data, url):
    documents = []
    id = []
    index = 0
    for i in data:
        id.append(index)
        print(TaggedDocument(i, [index]))
        documents.append(TaggedDocument(i, [index]))
        index += 1
    model = Doc2Vec(documents,
                    dm=1,
                    vector_size=100,
                    window=8,
                    min_count=1,
                    workers=4,
                    epochs=400)
    model.train(documents, total_examples=model.corpus_count, epochs=400)
    model.save('doc2vec.model')
    # corpus = model.docvecs
    # for i in corpus:
    #     print(i)
    # np.savetxt(url,np.asarray(corpus))
    # fw = open(url, 'w', encoding="utf-8")
    # fw.write(str(len(documents)) + " 100 \n")
    # for i in range(len(documents)):
    #     if i % 100 == 0:
    #         print(i)
    #     model = Doc2Vec.load('doc2vec.model')
    #     fw.write(
    #         str(id[i]) + " " +
    #         str(model.infer_vector(data[i])).replace('\n', "") + "\n")
    # fw.close()
    ls = []
    for i in range(len(documents)):
        if i % 100 == 0:
            print(i)
        model = Doc2Vec.load('doc2vec.model')
        ls.append(list(map(float, model.infer_vector(data[i]))))
    # print(ls)
    write_json(url, ls)


if __name__ == "__main__":
    # for i in range(1, 2):
    i = 'alldriving'
    url = "D:\\EcoVisual\\Doc2Vec\\" + i + ".json"
    saveuUrl = "D:\\EcoVisual\\Doc2Vec\\dx\\" + i + ".json"
    data = read_json(url)
    print("Read" + str(i) + "Finish")
    do_doc2vec(data, saveuUrl)

