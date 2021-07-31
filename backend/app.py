# flask: https://flask.palletsprojects.com/en/2.0.x/quickstart/#
from flask import Flask, jsonify, send_file, request
import sys
import base64
import psycopg2
app = Flask(__name__)

def showimage(ID):
    conn = psycopg2.connect(database="trademark1", user="tm_root", password="roottm_9823a", host="trueint.lu.im.ntu.edu.tw", port="5433")
    cur = conn.cursor()
    
    cur.execute("SELECT doc FROM trademark WHERE caseno = %s"%ID)
    doc = cur.fetchall()
    Path = doc[0][0] + "/"
    
    cur.execute("SELECT Filename FROM rcp WHERE caseno = %s"%ID)
    name = cur.fetchall()
    Path += name[0][0]

    conn.close()
    print("Path: ", Path, file=sys.stdout) 
    # os.chdir('/service/trademark/raw_register_data')
    BigPath = '/service/trademark/raw_register_data/' + Path
    print("BigPath: ", BigPath, file=sys.stdout) 
    # img = mpimg.imread(Path)
    # imgplot = plt.imshow(img)
    # plt.show()

    return BigPath




@app.route('/function1', methods=["GET"])
def function1():
    return jsonify({"Hello":"World"})

@app.route('/function2', methods=["GET"])
def function2():
    BigPath = showimage("104029740")
    return send_file(BigPath, mimetype="image/jpeg")
    # return send_file("./rabbit.jpeg", mimetype="image/jpeg")
@app.route('/function3', methods=['POST'])
def function3():
    # print(request.method, file=sys.stdout)   
    print(request.form['name'], file=sys.stdout)   
    # f = request.form['file_attachment']
    photo = request.form["file_attachment"]
    with open("/home/dragons/flask/backend/imageToSave.png", "wb") as fh:
        img = base64.decodebytes(photo.encode('ascii'))
        fh.write(img)    
    return jsonify({"status":1})



if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8081, debug=True)