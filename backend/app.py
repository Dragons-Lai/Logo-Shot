# flask: https://flask.palletsprojects.com/en/2.0.x/quickstart/#
from flask import Flask, jsonify, send_file, request
import sys
import base64
app = Flask(__name__)

@app.route('/function1', methods=["GET"])
def function1():
    return jsonify({"Hello":"World"})

@app.route('/function2', methods=["GET"])
def function2():
    return send_file("./rabbit.jpeg", mimetype="image/jpeg")
@app.route('/function3', methods=['POST'])
def function3():
    print(request.method, file=sys.stdout)   
    print(request.form['name'], file=sys.stdout)   
    # f = request.form['file_attachment']
    photo = request.form["file_attachment"]
    with open("imageToSave.png", "wb") as fh:
        img = base64.decodebytes(photo.encode('ascii'))
        fh.write(img)    
    return jsonify({"status":1})



if __name__ == "__main__":
    app.run(host='0.0.0.0', port=81, debug=True)