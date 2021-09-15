# flask: https://flask.palletsprojects.com/en/2.0.x/quickstart/#
from flask import Flask, jsonify, send_file, request, make_response
import sys
import base64
import psycopg2
from urllib.parse import quote
app = Flask(__name__)

def fetchdata(ID):
    conn = psycopg2.connect(database="trademark1", user="tm_root", password="roottm_9823a", host="trueint.lu.im.ntu.edu.tw", port="5433")
    cur = conn.cursor()
    cur.execute("SELECT doc,trademark_name,sdate,edate FROM trademark WHERE caseno = %s"%ID)
    main = cur.fetchall()
    cur.execute("SELECT bchinese FROM rca WHERE caseno = %s"%ID)
    rca = cur.fetchall()
    cur.execute("SELECT class FROM rcc WHERE caseno = %s"%ID)
    rcc = cur.fetchall()
    cur.execute("SELECT achinese,aenglish,address FROM rco WHERE caseno = %s"%ID)
    rco = cur.fetchall()
    cur.execute("SELECT filename FROM rcp WHERE caseno = %s"%ID)
    rcp = cur.fetchall()
    conn.close()

    [doc,trademark_name,sdate,edate] = main[0]
    [bchinese] = rca[0]
    [class_] = rcc[0]
    [achinese,aenglish,address] = rco[0]
    [filename] = rcp[0]   

    # print("doc: ", doc, file=sys.stdout)
    # print("filename: ", filename, file=sys.stdout)
    Path = '/service/trademark/raw_register_data/' + doc + "/" + filename
    # print("Path: ", Path, file=sys.stdout)
    res = make_response(send_file(Path, mimetype="image/jpeg"))
    res.headers['trademark_name'] = quote(trademark_name)
    res.headers['sdate'] = sdate
    res.headers['edate'] = edate
    res.headers['bchinese'] = quote(bchinese)
    res.headers['class_'] = class_
    res.headers['achinese'] = quote(achinese)
    res.headers['aenglish'] = aenglish
    res.headers['address'] = quote(address)

    # os.chdir('/service/trademark/raw_register_data')
    # img = mpimg.imread(Path)
    # imgplot = plt.imshow(img)
    # plt.show()

    return res

@app.route('/function1', methods=["GET"])
def function1():
    return jsonify({"Hello":"World"})

@app.route('/function2', methods=["GET"])
def function2():
    # print(request.args["caseno"], file=sys.stdout)
    res = fetchdata(request.args["caseno"])
    return res
    # return send_file("./rabbit.jpeg", mimetype="image/jpeg")
@app.route('/function3', methods=['POST'])
def function3():
    # print(request.method, file=sys.stdout)   
    print(request.form['name'], file=sys.stdout)   
    photo = request.form["file_attachment"]
    # print(type(photo), file=sys.stdout) # <class 'str'>
    with open("/home/dragons/flask/backend/{}.png".format(request.form['name']), "wb") as f:
        img = base64.decodebytes(photo.encode('ascii'))
        f.write(img)    
    return jsonify({"status":1})

import io
from base64 import encodebytes
from PIL import Image   

def fetchdata2(ID):
    conn = psycopg2.connect(database="trademark1", user="tm_root", password="roottm_9823a", host="trueint.lu.im.ntu.edu.tw", port="5433")
    cur = conn.cursor()
    cur.execute("SELECT doc,trademark_name,sdate,edate FROM trademark WHERE caseno = %s"%ID)
    main = cur.fetchall()
    cur.execute("SELECT bchinese FROM rca WHERE caseno = %s"%ID)
    rca = cur.fetchall()
    cur.execute("SELECT class FROM rcc WHERE caseno = %s"%ID)
    rcc = cur.fetchall()
    cur.execute("SELECT achinese,aenglish,address FROM rco WHERE caseno = %s"%ID)
    rco = cur.fetchall()
    cur.execute("SELECT filename FROM rcp WHERE caseno = %s"%ID)
    rcp = cur.fetchall()
    conn.close()

    [doc,trademark_name,sdate,edate] = main[0]
    [bchinese] = rca[0]
    [class_] = rcc[0]
    [achinese,aenglish,address] = rco[0]
    [filename] = rcp[0]   

    result = dict()
    result["Path"] = '/service/trademark/raw_register_data/' + doc + "/" + filename
    # print("Path: ", result["Path"], file=sys.stdout)
    result["metadata"] = {
        'caseno': ID, 
        'trademark_name': trademark_name,
        'sdate': sdate,
        'edate': edate,
        'bchinese': bchinese,
        'class_': class_,
        'achinese': achinese,
        'aenglish': aenglish,
        'address': address
    }
    # print("metadata: ", result["metadata"], file=sys.stdout)
    return result


@app.route('/function4', methods=['GET'])
def function4():
    result_list = []
    for caseno in ["106027779", "106027770", "106027771", "106027772", "106027773", "106027774", "106027775", "106027776", "106027777", "106027778"]:
        result_list.append(fetchdata2(caseno))
    base64Image_list = []
    metadata_list = []
    for r in result_list:
        pil_img = Image.open(r["Path"], mode='r') # reads the PIL image
        byte_arr = io.BytesIO()
        pil_img.save(byte_arr, format='PNG') # convert the PIL image to byte array
        encoded_img = encodebytes(byte_arr.getvalue()).decode('ascii') # encode as base64        
        base64Image_list.append(encoded_img)
        metadata_list.append(r["metadata"])
    return jsonify({
        'base64Images': base64Image_list,
        'metadatas': metadata_list
    })

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8081, debug=True)