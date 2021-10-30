# flask: https://flask.palletsprojects.com/en/2.0.x/quickstart/#
from flask import Flask, jsonify, send_file, request, make_response
import sys
import base64
import psycopg2
from urllib.parse import quote
import time
import random
import slimon
model = slimon.Model()
from Search import search
app = Flask(__name__)

conn = psycopg2.connect(database="trademark1", user="tm_root", password="roottm_9823a", host="trueint.lu.im.ntu.edu.tw", port="5433")
cur = conn.cursor()
cur.execute("SELECT caseno FROM trademark fetch first 1000 rows only")
caseno_1000 = cur.fetchall()
caseno_1000 = [x[0] for x in caseno_1000]
conn.close()

# def fetchdata(ID):
#     conn = psycopg2.connect(database="trademark1", user="tm_root", password="roottm_9823a", host="trueint.lu.im.ntu.edu.tw", port="5433")
#     cur = conn.cursor()
#     cur.execute("SELECT doc,trademark_name,sdate,edate FROM trademark WHERE caseno = %s"%ID)
#     main = cur.fetchall()
#     cur.execute("SELECT bchinese FROM rca WHERE caseno = %s"%ID)
#     rca = cur.fetchall()
#     cur.execute("SELECT class FROM rcc WHERE caseno = %s"%ID)
#     rcc = cur.fetchall()
#     cur.execute("SELECT achinese,aenglish,address FROM rco WHERE caseno = %s"%ID)
#     rco = cur.fetchall()
#     cur.execute("SELECT filename FROM rcp WHERE caseno = %s"%ID)
#     rcp = cur.fetchall()
#     conn.close()

#     [doc,trademark_name,sdate,edate] = main[0]
#     [bchinese] = rca[0]
#     [class_] = rcc[0]
#     [achinese,aenglish,address] = rco[0]
#     [filename] = rcp[0]   

#     # print("doc: ", doc, file=sys.stdout)
#     # print("filename: ", filename, file=sys.stdout)
#     Path = '/service/trademark/raw_register_data/' + doc + "/" + filename
#     # print("Path: ", Path, file=sys.stdout)
#     res = make_response(send_file(Path, mimetype="image/jpeg"))
#     res.headers['trademark_name'] = quote(trademark_name)
#     res.headers['sdate'] = sdate
#     res.headers['edate'] = edate
#     res.headers['bchinese'] = quote(bchinese)
#     res.headers['class_'] = class_
#     res.headers['achinese'] = quote(achinese)
#     res.headers['aenglish'] = aenglish
#     res.headers['address'] = quote(address)

#     # os.chdir('/service/trademark/raw_register_data')
#     # img = mpimg.imread(Path)
#     # imgplot = plt.imshow(img)
#     # plt.show()
#     return res

# @app.route('/function1', methods=["GET"])
# def function1():
#     return jsonify({"Hello":"World"})

# @app.route('/function2', methods=["GET"])
# def function2():
#     # print(request.args["caseno"], file=sys.stdout)
#     res = fetchdata(request.args["caseno"])
#     return res
#     # return send_file("./rabbit.jpeg", mimetype="image/jpeg")
@app.route('/function3', methods=['POST'])
def function3():
    startTime = time.time()
    # print(request.method, file=sys.stdout)   
    print(request.form['name'], file=sys.stdout)   
    photo = request.form["file_attachment"]
    # print(type(photo), file=sys.stdout) # <class 'str'>
    with open("/home/dragons/flask/backend/{}.png".format(request.form['name']), "wb") as f:
        img = base64.decodebytes(photo.encode('ascii'))
        f.write(img)    
    EndTime = time.time()
    print("Spent Time(function3): {}s".format(EndTime - startTime), file=sys.stdout)   
    return jsonify({"status":1})

import io
from base64 import encodebytes
from PIL import Image   

# def fetchdata2(ID):
#     conn = psycopg2.connect(database="trademark1", user="tm_root", password="roottm_9823a", host="trueint.lu.im.ntu.edu.tw", port="5433")
#     cur = conn.cursor()
#     cur.execute("SELECT doc,trademark_name,sdate,edate FROM trademark WHERE caseno = %s"%ID)
#     main = cur.fetchall()
#     cur.execute("SELECT bchinese FROM rca WHERE caseno = %s"%ID)
#     rca = cur.fetchall()
#     cur.execute("SELECT class FROM rcc WHERE caseno = %s"%ID)
#     rcc = cur.fetchall()
#     cur.execute("SELECT achinese,aenglish,address FROM rco WHERE caseno = %s"%ID)
#     rco = cur.fetchall()
#     cur.execute("SELECT filename FROM rcp WHERE caseno = %s"%ID)
#     rcp = cur.fetchall()
#     conn.close()

#     [doc,trademark_name,sdate,edate] = main[0]
#     [bchinese] = rca[0]
#     [class_] = rcc[0]
#     [achinese,aenglish,address] = rco[0]
#     [filename] = rcp[0]   

#     result = dict()
#     result["Path"] = '/service/trademark/raw_register_data/' + doc + "/" + filename
#     # print("Path: ", result["Path"], file=sys.stdout)
#     result["metadata"] = {
#         'caseno': ID, 
#         'trademark_name': trademark_name,
#         'sdate': sdate,
#         'edate': edate,
#         'bchinese': bchinese,
#         'class_': class_,
#         'achinese': achinese,
#         'aenglish': aenglish,
#         'address': address
#     }
#     # print("metadata: ", result["metadata"], file=sys.stdout) 
#     return result


# trademark
trademark_columns = ["doc", "caseno", "registerno", "trademark_name", "trademark_design", "filing_date", "censor", "priority_date", "sdate", "edate", "word_description", "mark_type", "memo", "wavpath", "servicemark"]
# rca(agent)
rca_columns = ["caseno", "bchinese"]
# rcc(class)
rcc_columns = ["caseno", "enforcement_rules", "class", "goods_denomination"]
# rco(owner)
rco_columns = ["caseno", "achinese", "aenglish", "address"]
# rcp(picture)
rcp_columns = ["caseno", "filename", "displayname", "path"]

def sql_command(cur, colnames, tablename, caseno):
    colnames = ",".join(colnames)
    cur.execute(
        "SELECT {} \
        FROM {} \
        WHERE caseno = {}".format(colnames, tablename, caseno))    
    return cur.fetchall()

def fetchdata3(ID):
    conn = psycopg2.connect(database="trademark1", user="tm_root", password="roottm_9823a", host="trueint.lu.im.ntu.edu.tw", port="5433")
    cur = conn.cursor()
    main = sql_command(cur, trademark_columns, "trademark", str(ID))
    rca = sql_command(cur, rca_columns, "rca", str(ID))
    rcc = sql_command(cur, rcc_columns, "rcc", str(ID))
    rco = sql_command(cur, rco_columns, "rco", str(ID))
    rcp = sql_command(cur, rcp_columns, "rcp", str(ID))
    conn.close()
#     print("main: ", main)
#     print("rca: ", rca)
#     print("rcc: ", rcc)
#     print("rco: ", rco)
#     print("rcp: ", rcp)    
    
    metadata = dict()
    data_list = [main, rca, rcc, rco, rcp]
    columns_list = [trademark_columns, rca_columns, rcc_columns, rco_columns, rcp_columns]
    for data, columns in zip(data_list, columns_list):
        for i in range(len(columns)):
            metadata[columns[i]] = "/".join([str(d[i]) for d in data])
#             print(metadata[columns[i]])
    metadata["caseno"] = str(ID)

    result = dict()
    result["Path"] = '/service/trademark/raw_register_data/' + metadata['doc'] + "/" + metadata['filename']
    # print("Path: ", result["Path"], file=sys.stdout)
    result["metadata"] = metadata
    # print("metadata: ", result["metadata"], file=sys.stdout) 
    return result

@app.route('/function4', methods=['GET'])
def function4():
    startTime = time.time()
    result_list = []
    caseno_list = search("一蘭",10,[True,True,True])
    # caseno_list = random.sample(caseno_1000, 10)
    caseno_list = [105005116, 105064934, 105064461, 109045224, 100042498, 107081265, 107015025, 101053974, 107033226, 104056056]
    caseno_list = model.single_img_retrieve("/home/dragons/flask/backend/1635595524630.png")[:20]
    for caseno in caseno_list:
        result_list.append(fetchdata3(caseno))
    base64Image_list = []
    metadata_list = []
    for r in result_list:
        pil_img = Image.open(r["Path"], mode='r') # reads the PIL image
        byte_arr = io.BytesIO()
        pil_img.save(byte_arr, format='PNG') # convert the PIL image to byte array
        encoded_img = encodebytes(byte_arr.getvalue()).decode('ascii') # encode as base64        
        base64Image_list.append(encoded_img)
        metadata_list.append(r["metadata"])
    EndTime = time.time()
    print("Time Spent(function4): {}s".format(EndTime - startTime), file=sys.stdout)           
    return jsonify({
        'base64Images': base64Image_list,
        'metadatas': metadata_list
    })

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8081, debug=True)